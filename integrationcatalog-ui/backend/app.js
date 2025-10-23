import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
import crypto from "crypto";

const app = express();

const additionalFilterKeys = [
  "brand",
  "region",
  "sourceSystem",
  "targetSystem",
  "context",
];

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/filter/menu/items", async (req, res) => {
  res.status(200).json(await getMenuItems("filter"));
});

app.get("/catalogue/items", async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = pageNumber * pageSize;
  const endIndex = (pageNumber + 1) * pageSize;
  const fileContent = await fs.readFile("./data/catalogue-items.json");
  let catalogueItems = JSON.parse(fileContent);
  catalogueItems = applyFilterPanelFilters(req.query, catalogueItems);
  catalogueItems = getAdditionalFilters(req.query, catalogueItems);
  if ("searchQuery" in req.query) {
    await applyAiFilter(req.query, catalogueItems);
  }
  const results = {
    totalItems: catalogueItems.length,
    items: catalogueItems.slice(startIndex, endIndex),
  };

  res.status(200).json(results);
});

app.get("/catalogue/menu/items", async (req, res) => {
  res.status(200).json(await getMenuItems("catalogue"));
});

app.post("/catalogue/item", async (req, res) => {
  const requestBody = req.body;
  const mergedData = await mergeWithContractData(requestBody);
  const existingFileContent = await fs.readFile("./data/catalogue-items.json");
  const existingData = JSON.parse(existingFileContent);
  const maxId = existingData.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );
  const newObject = { id: maxId + 1, ...mergedData };
  existingData.push(newObject);
  await fs.writeFile(
    "./data/catalogue-items.json",
    JSON.stringify(existingData)
  );
  res.status(200).json({ message: "Object created!!" });
});

app.put("/catalogue/item/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const existingFileContent = await fs.readFile("./data/catalogue-items.json");
  const existingData = JSON.parse(existingFileContent);
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    existingData[index] = { ...existingData[index], ...req.body };
  }
  await fs.writeFile(
    "./data/catalogue-items.json",
    JSON.stringify(existingData)
  );
  res.status(200).json({ message: "Object updated!!" });
});

app.delete("/catalogue/item/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const existingFileContent = await fs.readFile("./data/catalogue-items.json");
  const existingData = JSON.parse(existingFileContent);
  const index = existingData.findIndex((item) => item.id === id);
  if (index !== -1) {
    existingData.splice(index, 1);
  }
  await fs.writeFile(
    "./data/catalogue-items.json",
    JSON.stringify(existingData)
  );
  res.status(200).json({ message: "Object deleted!!" });
});

async function mergeWithContractData(requestBody) {
  const fileContent = await fs.readFile("./data/catalogue-contract.json");
  const contractItems = JSON.parse(fileContent);
  const mergedData = { ...contractItems };
  for (const key in requestBody) {
    if (requestBody[key] !== null && requestBody[key] !== undefined) {
      mergedData[key] = requestBody[key];
    }
  }
  return mergedData;
}
async function getMenuItems(category) {
  const fileContent = await fs.readFile("./data/menu-items.json");
  let menuItems = JSON.parse(fileContent);
  menuItems = menuItems.filter(
    (item) => item.type === category || item.type === "all"
  );
  const filteredItems = menuItems.reduce((acc, obj) => {
    const { type, ...others } = obj;
    const key = others.codeType;
    if (!acc[key]) {
      acc[key] = [];
    }
    const { codeType, ...rest } = others;
    acc[key].push(rest);
    return acc;
  }, {});

  return filteredItems;
}

function applyFilterPanelFilters(query, catalogueItems) {
  if ("filterPanelItem" in query) {
    let value = parseInt(query.value);
    value = isNaN(value) ? query.value : value;
    if (query.operator === "equals") {
      catalogueItems = catalogueItems.filter(
        (item) => item[query.filterPanelItem] === value
      );
    }
  }
  return catalogueItems;
}

function getAdditionalFilters(query, catalogueItems) {
  additionalFilterKeys.forEach((key, index) => {
    if (key in query) {
      switch (index) {
        case 0:
          query[key].split(",").forEach((value) => {
            catalogueItems = catalogueItems.filter(
              (item) => item.brand === "ALL" || item.brand.includes(value)
            );
          });
          break;
        case 1:
          query[key].split(",").forEach((value) => {
            if (value === "EU") {
              catalogueItems = catalogueItems.filter(
                (item) => item.regionEU === "Yes"
              );
            }
            if (value === "NA") {
              catalogueItems = catalogueItems.filter(
                (item) => item.regionNA === "Yes"
              );
            }
            if (value === "Asia") {
              catalogueItems = catalogueItems.filter(
                (item) => item.regionAsia === "Yes"
              );
            }
            if (value === "JP") {
              catalogueItems = catalogueItems.filter(
                (item) => item.regionJP === "Yes"
              );
            }
          });
          break;
        case 2:
          catalogueItems = catalogueItems.filter(
            (item) => item.source === query[key]
          );
          break;
        case 3:
          catalogueItems = catalogueItems.filter(
            (item) => item.target === query[key]
          );
          break;
        case 4:
          catalogueItems = catalogueItems.filter(
            (item) => item.context === query[key]
          );
          break;
      }
    }
  });
  return catalogueItems;
}

// Open AI implementation
app.post("/ai/data", async (req, res) => {
  const reqBody = req.body;
  const existingFileContent = await fs.readFile(
    "./data/search-prompt-data.json"
  );
  const existingData = JSON.parse(existingFileContent);
  existingData.textQueryData.push(...reqBody.textQueryData);
  existingData.params += reqBody.params;

  await fs.writeFile(
    "./data/search-prompt-data.json",
    JSON.stringify(existingData)
  );
  res.status(200).json({ message: "Prompt data built" });
});

async function applyAiFilter(query, catalogueItems) {
  const existingFileContent = await fs.readFile(
    "./data/search-prompt-data.json"
  );
  const existingData = JSON.parse(existingFileContent);
  const prompt = buildPrompt(existingData, query.searchQuery);
  const apiKey = await getOpenAIApiKey();
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${prompt}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const params = JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
}

app.get("/ai/data", async (req, res) => {
  res.status(200).json({ message: "Success" });
});

function buildPrompt(trainingData, searchQuery) {
  let prompt = ` Extract the following parameters as a form of query key value from the given text and format them as a JSON object:

  Valid keys for query are: ${trainingData.params}

  Examples:`;
  trainingData.textQueryData.map(
    (data) =>
      (prompt += `
    Text: ${data.example}
    Expected output: ${data.query}

    `)
  );

  prompt += `Text: ${searchQuery}
  Expected output: 
  `;
  return prompt;
}

async function getOpenAIApiKey() {
  const iv = "2f3df27952b16e477d8a9be5cf4c3290";
  const key =
    "f21609b2f498d02c7e0cb3171fcc855c7cb39c9bbe3faf7e4c460a6f88ef0c0b";
  const fileContent = await fs.readFile("./config/encryption-config.json");
  let config = JSON.parse(fileContent);
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(config.encryptedApiKey, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
}

// Section for open ai intergration

app.listen(3000);

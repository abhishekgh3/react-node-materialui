import bodyParser from "body-parser";
import express from "express";
import holidayCutoff from "./models/holidayCutoff.js";
import holidayDept from "./models/holidayDept.js";
import setup from "./models/setup.js";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/holidaycutoff/items", async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = pageNumber * pageSize;
  const endIndex = (pageNumber + 1) * pageSize;
  const filterParams =
    req.query.filterKey && req.query.filterValue
      ? { [req.query.filterKey]: req.query.filterValue }
      : {};
  console.log(filterParams);
  const holidayCutoffItems = await holidayCutoff.findAndCountAll({
    offset: startIndex,
    limit: endIndex,
    where: filterParams,
  });
  const setupItems = await setup.findAll();
  const selectListItems = setupItems.reduce((acc, obj) => {
    const { type, code, value } = obj;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push({ code, value });
    return acc;
  }, {});
  res.status(200).json({
    selectMenuItems: selectListItems,
    items: holidayCutoffItems.rows,
    totalItems: holidayCutoffItems.count,
  });
});

app.get("/holidaydept/items", async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = pageNumber * pageSize;
  const endIndex = (pageNumber + 1) * pageSize;
  const holidayDeptItems = await holidayDept.findAndCountAll({
    offset: startIndex,
    limit: endIndex,
  });
  res.status(200).json({
    items: holidayDeptItems.rows,
    totalItems: holidayDeptItems.count,
  });
});

app.get("/setup/items", async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = pageNumber * pageSize;
  const endIndex = (pageNumber + 1) * pageSize;
  const setupItems = await setup.findAndCountAll({
    offset: startIndex,
    limit: endIndex,
  });
  res.status(200).json({
    items: setupItems.rows,
    totalItems: setupItems.count,
  });
});

app.post("/holidaycutoff/item", async (req, res) => {
  const requestBody = req.body;
  let record;
  console.log(requestBody);
  try {
    record = await holidayCutoff.create(requestBody);
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(record);
});

app.put("/holidaycutoff/item/:id", async (req, res) => {
  let record;
  const requestBody = req.body;
  const id = parseInt(req.params.id);
  try {
    const updatedId = await holidayCutoff.update(requestBody, {
      where: { id },
    });
    if (updatedId && updatedId.length > 0) {
      record = await holidayCutoff.findByPk(id);
    }
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(record);
});

app.delete("/holidaycutoff/item/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await holidayCutoff.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ message: "Object deleted" });
});

app.listen(3000);

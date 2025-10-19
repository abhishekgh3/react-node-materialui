import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize({
  dialect: "oracle",
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE_NAME,
  logging: console.log,
  dialectOptions: {
    ssl: "AWS RDS",
    connectString: process.env.DB_CONNECTION_STRING,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

export default sequelize;

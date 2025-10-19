import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeObject.js";

const setup = sequelize.define(
  "T_HOLIDAY_SETUP",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID",
    },
    type: {
      type: DataTypes.STRING,
      field: "TYPE",
    },
    code: {
      type: DataTypes.STRING,
      field: "CODE",
    },
    value: {
      type: DataTypes.INTEGER,
      field: "VALUE",
    },
    typeRef: {
      type: DataTypes.INTEGER,
      field: "TYPEREF",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "CREATE_DT",
    updatedAt: "MODIFY_DT",
  }
);
export default setup;

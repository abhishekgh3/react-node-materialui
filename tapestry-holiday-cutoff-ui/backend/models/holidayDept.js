import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeObject.js";

const holidayDept = sequelize.define(
  "T_HOLIDAY_DEPT",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID",
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "BRAND",
    },
    dept: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "DEPARTMENT",
    },
    deptDesc: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "DEPARTMENT_DESC",
    },

    include: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "INCLUDE",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "CREATE_DT",
    updatedAt: "MODIFY_DT",
  }
);

export default holidayDept;

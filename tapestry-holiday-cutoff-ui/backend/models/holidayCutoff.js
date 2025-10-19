import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeObject.js";

const holidayCutoff = sequelize.define(
  "T_HOLIDAY_CUTOFF",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID",
    },
    config: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "CONFIG",
    },
    priority: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: "PRIORITY",
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "BRAND",
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "COUNTRY",
    },
    enterprise: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ENTERPRISE",
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "CHANNEL",
    },
    shipping: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "SHIPPING",
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "START_DT",
    },
    cutOffDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "CUTOFF_DT",
    },
    cutOffDateUTC: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "CUTOFF_DT_UTC",
    },
    promiseDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "PROMISE_DT",
    },
    compare: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "COMPARE",
    },
    active: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ACTIVE",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "CREATE_DT",
    updatedAt: "MODIFY_DT",
  }
);
export default holidayCutoff;

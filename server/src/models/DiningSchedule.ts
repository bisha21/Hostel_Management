import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../config/database.js";
import { daysOfWeek, mealTypes } from "../schemas/dining.schema.js";

export type Day = (typeof daysOfWeek)[number];
export type MealType = (typeof mealTypes)[number];

export class DiningSchedule extends Model<
  InferAttributes<DiningSchedule>,
  InferCreationAttributes<DiningSchedule>
> {
  declare id: CreationOptional<number>;
  declare day: Day;
  declare mealType: MealType;
  declare items: string[];
  declare startTime: string;
  declare endTime: string;
}

DiningSchedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    day: {
      type: DataTypes.ENUM(...daysOfWeek),
      allowNull: false,
    },
    mealType: {
      type: DataTypes.ENUM(...mealTypes),
      allowNull: false,
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
      get(this: DiningSchedule): string[] {
        const raw = this.getDataValue("items") as unknown as string | null;
        return raw ? (JSON.parse(raw) as string[]) : [];
      },
      set(this: DiningSchedule, value: string[]) {
        this.setDataValue("items", JSON.stringify(value) as unknown as string[]);
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DiningSchedule",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["day", "mealType"],
      },
    ],
  },
);

export default DiningSchedule;

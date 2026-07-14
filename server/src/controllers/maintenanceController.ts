import { Maintenance } from "../models/index.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handleFactoryController.js";

export const createMaintenance = createOne(Maintenance);
export const updateMaintenance = updateOne(Maintenance);
export const deleteMaintenance = deleteOne(Maintenance);
export const getMaintenance = getAll(Maintenance);
export const getMaintenanceById = getOne(Maintenance);

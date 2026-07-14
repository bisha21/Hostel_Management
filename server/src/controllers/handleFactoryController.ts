import type { NextFunction, Request, Response } from "express";
import type { Attributes, CreationAttributes, IncludeOptions, Model, ModelStatic, WhereOptions } from "sequelize";
import { NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";

export const deleteOne = <M extends Model>(model: ModelStatic<M>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const deletedCount = await model.destroy({ where: { id: req.params.id } as WhereOptions<M> });
    if (!deletedCount) {
      next(new NotFoundError(`No document found with ID ${req.params.id}`));
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
      message: `Item with ID ${req.params.id} was deleted successfully`,
    });
  });

export const updateOne = <M extends Model>(model: ModelStatic<M>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await model.findByPk(req.params.id);

    if (!doc) {
      next(new NotFoundError(`No document found with ID ${req.params.id}`));
      return;
    }

    doc.set(req.body as Partial<Attributes<M>>);
    await doc.save();

    res.status(200).json({
      status: "success",
      data: { data: doc },
      message: `Item with ID ${req.params.id} was updated successfully`,
    });
  });

export const createOne = <M extends Model>(model: ModelStatic<M>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const doc = await model.create(req.body as CreationAttributes<M>);
    res.status(201).json({
      status: "success",
      data: doc,
      message: "Item was created successfully",
    });
  });

export const getOne = <M extends Model>(model: ModelStatic<M>, includeOptions?: IncludeOptions[]) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await model.findOne({
      where: { id: req.params.id } as WhereOptions<M>,
      include: includeOptions,
    });

    if (!doc) {
      next(new NotFoundError(`No document found with ID ${req.params.id}`));
      return;
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getAll = <M extends Model>(model: ModelStatic<M>, filterOptions?: WhereOptions<M>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const filterCriteria: Record<string, unknown> = { ...filterOptions };

    Object.entries(req.query).forEach(([key, value]) => {
      if (value) {
        filterCriteria[key] = value;
      }
    });

    const { count, rows } = await model.findAndCountAll({
      where: filterCriteria as WhereOptions<M>,
    });

    res.status(200).json({
      status: "success",
      results: count,
      data: rows,
    });
  });

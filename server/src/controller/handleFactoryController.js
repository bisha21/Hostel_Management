import AppError from "../utlis/appError";
import asyncHandler from "../utlis/catchAsync";


export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.destroy({ where: { id: req.params.id } });
    if (!doc) {
      return next(new AppError(`No document found with ID ${req.params.id}`, 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
      message: `Item with ID ${req.params.id} was deleted successfully`,
    });
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true,
    });

    if (doc[0] === 0) {
      return next(new AppError(`No document found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc[1][0], // Sequelize returns an array of updated rows
      },
      message: `Item with ID ${req.params.id} was updated successfully`,
    });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
      message: `Item was created successfully`,
    });
  });

export const getOne = (Model, includeOptions) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findOne({
      where: { id: req.params.id },
      include: includeOptions, // For Sequelize associations if needed
    });

    if (!doc) {
      return next(new AppError(`No document found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const getAll = (Model, filterOptions) =>
  asyncHandler(async (req, res) => {
    const filter = req.params.tourId ? { where: { tourId: req.params.tourId } } : filterOptions || {};

    const limit = req.query.limit ? parseInt(req.query.limit) : 100; // Default limit
    const offset = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0; // Pagination

    const { count, rows } = await Model.findAndCountAll({
      ...filter,
      limit,
      offset,
      order: req.query.sort ? [[req.query.sort.split(',')[0], req.query.sort.split(',')[1] || 'ASC']] : [['createdAt', 'DESC']],
      attributes: req.query.fields ? req.query.fields.split(',') : undefined, // Select specific fields
    });

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: count,
      data: {
        data: rows,
      },
    });
  });

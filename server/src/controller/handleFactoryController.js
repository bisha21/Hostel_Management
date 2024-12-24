import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";


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
    const doc = await Model.findByPk(req.params.id); // or findOne({ where: { id: req.params.id } })

    if (!doc) {
      return next(new AppError(`No document found with ID ${req.params.id}`, 404));
    }

    // Note that we use `set` to update only the fields passed in the request body
    await doc.set(req.body);

    // Save the updated document
    await doc.save();

    // Return the updated document as the response
    res.status(200).json({
      status: "success",
      data: {
        data: doc, // The updated document
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
      const filterCriteria = { ...filterOptions }; // Use provided filter options
  
      // If there are query params for filtering, apply them
      if (req.query) {
        Object.keys(req.query).forEach((key) => {
          if (req.query[key]) {
            filterCriteria[key] = req.query[key]; // Apply query parameters as filters
          }
        });
      }
  
      // Query the database with filtering and pagination (if needed)
      const { count, rows } = await Model.findAndCountAll({
        where: filterCriteria,
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
  
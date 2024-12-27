import Student from "../model/StudentModel.js";
import { Visitor } from "../model/visitorModel.js";
import asyncHandler from "../utlis/catchAsync.js";

export const createVisitor = asyncHandler(async (req, res) => {
    const { name,type } = req.body;
    const studentId = req.params.studentId;    
    const visitor = await Visitor.create({
      name,
      studentId,
      type
    });
  
    res.status(201).json({
      status: "success",
      data: visitor,
    });
  });
// Get all visitors
export const getAllVisitors = asyncHandler(async (req, res) => {
  try {
    const visitors = await Visitor.findAll();

    res.status(200).json({
      status: "success",
      data: visitors,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Could not retrieve visitors",
      error: error.message,
    });
  }
});

// Get a single visitor by ID
export const getVisitorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const visitor = await Visitor.findByPk(id);

    if (!visitor) {
      return res.status(404).json({
        status: "fail",
        message: "Visitor not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: visitor,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Could not retrieve visitor",
      error: error.message,
    });
  }
});

// Update a visitor's exitTime
export const updateVisitor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const visitor = await Visitor.findByPk(id);

  if (!visitor) {
    return res.status(404).json({
      status: "fail",
      message: "Visitor not found",
    });
  }

  try {
    await visitor.update(req.body);
    res.status(200).json({
      status: "success",
      data: visitor,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Could not update visitor",
      error: error.message,
    });
  }
});

export const deleteVisitorById = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const visitor = await Visitor.findByPk(id);
    if(!visitor)
    {
        return res.status(404).json({
            status: "fail",
            message: "Visitor not found",
          });
    }
    await visitor.destroy();
    res.status(204).json({
        status: "success",
        data: null,
      });
})
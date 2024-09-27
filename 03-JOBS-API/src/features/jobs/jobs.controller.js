import { StatusCodes } from "http-status-codes";
import Job from "./jobs.model.js";

const create = async (res, req, next) => {
  try {
    const { company, position, status } = req.body;
    const job = await Job.create({
      company,
      position,
      status,
      createdBY: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBY: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId, createdBY: req.user.userId });

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Job non trouvé" });
    }

    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const { company, position, status } = req.body;

    const job = await Job.findOneAndUpdate(
      {
        _id: jobId,
        createdBY: req.user.userId,
      },
      {
        company,
        position,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Job non trouvé" });
    }

    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findOneAndDelete({
      _id: jobId,
      createdBY: req.user.userId,
    });

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Job non trouvé" });
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };

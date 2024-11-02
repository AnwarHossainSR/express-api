import mongoose from "mongoose";
import Movie from "./schemas/moviesSchema.js";

export const getAllMovies = async () => {
  const result = await Movie.find()
    .populate("producer", "-_id -role")
    .populate("director", "-_id -role")
    .populate("actors", "-_id -role");
  if (!result) {
    return null;
  }
  return result;
};

export const getSingleMovieById = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    console.log("invalid object id");
    return null;
  }
  const result = await Movie.findById(movieId)
    .populate("producer", "-_id -role")
    .populate("director", "-_id -role")
    .populate("actors", "-_id -role");
  if (!result) {
    return null;
  }
  return result;
};

export const createMovieByName = async (movieObj) => {
  const newMovie = new Movie(movieObj);
  await newMovie.save();
  return newMovie;
};

export const updateMovieById = async (movieId, movieObj) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    console.log("invalid object id");
    return null;
  }
  const result = await Movie.findByIdAndUpdate(movieId, movieObj, {
    new: true,
  });
  if (!result) {
    return null;
  }
  return result;
};

export const deleteMovieById = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    console.log("invalid object id");
    return null;
  }
  const result = await Movie.findByIdAndDelete(movieId);
  if (!result) {
    return false;
  }
  return true;
};

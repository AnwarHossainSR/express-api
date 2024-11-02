import mongoose from "mongoose";
import { MOVIE_GENRE } from "../../constants.js";

const moviesSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  movieDescription: {
    type: String,
    required: true,
  },
  movieDuration: {
    type: Number,
    required: true,
    min: 1,
  },
  movieRating: {
    type: Number,
    required: true,
    min: 0.0,
    max: 10.0,
  },
  genre: {
    type: String,
    required: true,
    enum: MOVIE_GENRE,
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participants",
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participants",
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participants",
    },
  ],
});

const Movie = mongoose.model("Movie", moviesSchema);

export default Movie;

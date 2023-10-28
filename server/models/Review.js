import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewTextBox: {
    type: String,
    validate: /^[A-Za-z0-9 ]*$/
  },
  reviewStars: {
    type: Number,
    min: 1,
    max: 5
  }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;

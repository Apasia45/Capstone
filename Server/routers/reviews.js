import { Router } from "express";
import Review from "../models/Review.js";

const router = Router();

//create review route
router.post("/", async (request, response) => {
  try {
    const newReview = new Review(request.body);

    const data = await newReview.save();

    response.json(data);
  } catch (error) {
    //output error to console for failure to send response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

//

const Review = require("../models/Review");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const { getSingleProduct } = require("./productController");

const createReview = async (req, res) => {
  const { product: reviewId } = req.body;
  const isValidProduct = await Product.findOne({ _id: reviewId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${reviewId}`);
  }

  const alreadySubmittedReview = await Review.findOne({
    product: reviewId,
    user: req.user.userId,
  });

  if (alreadySubmittedReview) {
    throw new CustomError.BadRequestError(
      "Already submitted review for this product"
    );
  }

  req.body.user = req.user.userId; //imposto l'id dello user che vuole scrivere la recensione.

  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
    //!il metodo populate ritorna per il campo product (reference ad un oggetto) il suo name, price e company (si occupa mongoose di fare delle query per recuperare questi dati) 
  const reviews = await Review.find({}).populate({ path: "product", select: "name price company" }).populate({ path: "user", select: "email" });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId }).populate({ path: "product", select: "name price company" });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${req.params.id}`);
  }

  checkPermissions(req.user, review.user);

  await review.deleteOne(); //remove è deprecato

  res.status(StatusCodes.OK).json({ msg: "Review removed" });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};


const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  if (!reviews) {
    throw new CustomError.NotFoundError(`No review for the product with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews
};

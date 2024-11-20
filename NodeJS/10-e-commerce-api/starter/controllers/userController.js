const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {createTokenUser, attachCookiesToResponse, checkPermissions} = require('../utils');

//!funzione chiamabile solo da un admin
const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password"); //non ritorno la password
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }
  //non voglio che uno utente che non sia admin possa vedere i dati di un altro user
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

//utile per i reload della pagina
const showCurrentUser = async (req, res) => {
  //il middleware authenticateUser ha settato req.user
  res.status(StatusCodes.OK).json({ user: req.user });
};

//* updateUser con User.save
const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide name and email");
  }

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  
  await user.save(); //! avendo fatto il save, viene fatto di nuovo l'hash della password, e di conseguenza se si ritenta il login si avrà invalid credentials (nonostante non la password non sia stata modificata)
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user });
};

//* updateUser con User.findOneAndUpdate (usare questo)
/*
const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide name and email");
  }
  
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    {
      new: true, //ritorno il job aggiornato
      runValidators: true, //i dati vengono convalidati prima di salvare le modifiche
    }
  );
  non serve il check che lo user esista perchè per fare questa operazione deve essersi autenticato e quindi esiste per forza

  avendo modificato informazioni come nome e email devo modificare anche il token
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user });
};*/




const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Please provide old and new password"
    );
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;
  await user.save(); //rimarrà crittografata perchè prima di salvare le modifiche verrà invocata la funzione presave dello schema user che fa l'hash della password
  res.status(StatusCodes.OK).json({ msg: "Password Updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

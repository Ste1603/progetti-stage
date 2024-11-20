const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //!il primo user a registrarsi viene settato ad admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  //Se è presente uno user con stessa mail viene sollevato errore con codice 11000 che viene gestito dall'error-handler
  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser }); // come passare {res: res, user: tokenUser} , sintassi abbreviata se hanno stesso nome
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

//se l'utente si trova a fare il login significa che il token è scaduto
const login = async (req, res) => {
  const { email, password } = req.body;a

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = { register, login, logout };

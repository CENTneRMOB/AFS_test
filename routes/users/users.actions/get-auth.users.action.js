const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const { NotFound, Unauthorized } = require("../../../constants/errors");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;
const { getOne } = require("../../../DB/sample-db/methods/user");
const { PasswordService } = require("../../../services/password.service");

/**
 * Эндпоинт авторизации пользователя
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getAuth(req, res) {
  logger.init("get user auth");
  const { login, password } = req.body;

  const user = await getOne(login);

  if (!user) {
    throw new NotFound("User not found");
  }

  const isPasswordValid = await PasswordService.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Unauthorized("Incorrect password");
  }

  const token = new JwtService(jwtConfig).encode(req.body).data;
  res.header("Authorization", `Bearer ${token}`);
  res.cookie("Authorization", `Bearer ${token}`, {
    httpOnly: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });

  res.status(OK).json({
    id: user.id,
    login,
  });
  logger.success();
}

module.exports = {
  getAuth,
};

const Router = require("express");
const CreateUserDTO = require("../DTO/create-user.dto");
const UserService = require("../service/index");
const jwt = require("jsonwebtoken");
const baseResponse = require("../../../utils/baseResponse");
const { INVALID_TOKEN_TYPE } = require("../../../utils/baseResponseStatus");

class UserController {
  userService;
  router;
  path = "/users";

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.init();
  }

  init() {
    this.router.post("/signup", this.register.bind(this));
    this.router.get("/signin", this.login.bind(this));
    this.router.get("/", this.showuser.bind(this));
    this.router.post("/:id", this.deleteUser.bind(this));
  }

  async register(req, res, next) {
    try {
      const createUserDTO = new CreateUserDTO(req.body);
      await this.userService.register(createUserDTO);

      const token = jwt.sign({ name: createUserDTO.name }, "your_secret_key");
      baseResponse({ message: "회원 가입 완료", tokenKey: token }, res);
    } catch (err) {
      baseResponse(err, res);
    }
  }
  async login(req, res, next) {
    try {
      const { name, password } = req.body;

      const result = await this.userService.login(name, password);
      if (result.length > 0) {
        // Generate a JWT token upon successful login
        const token = jwt.sign({ name }, "your_secret_key");
        baseResponse(
          { message: "Login successful", user: result, tokenKey: token },
          res
        );
      } else {
        res.status(403).json({ message: "Access denied" });
      }
    } catch (err) {
      baseResponse(err, res);
    }
  }
  async showuser(req, res, next) {
    try {
      const result = await this.userService.showUser();
      baseResponse({ result }, res);
    } catch (err) {
      baseResponse(err, res);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      baseResponse({ message: `delete ${id} successful` }, res);
    } catch (err) {
      baseResponse(err, res);
    }
  }
}

const dataRequestController = new UserController();
module.exports = dataRequestController;

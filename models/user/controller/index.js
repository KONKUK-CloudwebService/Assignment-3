const Router = require('express');
const CreateUserDTO=require('../DTO/create-user.dto');
const UserService = require('../service/index');

class UserController {
    userService;
    router;
    path = '/user'

    constructor() {
        this.router = Router();
        this.userService = new UserService();
        this.init();
    };

    init() {
        this.router.post('/register', this.register.bind(this));
        this.router.get('/login',this.login.bind(this))
        this.router.get('/showuser',this.showuser.bind(this));
    };

    async register(req, res, next) {
        try {
            const createUserDTO = new CreateUserDTO(req.body);
            await this.userService.register(createUserDTO);
            res.status(201).json({ message: "Registration successful" });
        } catch (err) {
            next(err);
        };
    };
    async login(req, res, next) {
        try{
            const { name, password } = req.body;

            const result = await this.userService.login(name,password);
            if (result.length > 0) {
                
                res.status(200).json({ message: "Login successful", user: result });
              } else {
                res.status(403).json({ message: "Access denied" });
              }
            }
        catch(err){
            next(err);
        }
    }
    async showuser(req,res,next){
        try{
            const result = await this.userService.showUser();
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }
}

const dataRequestController = new UserController();
module.exports = dataRequestController;

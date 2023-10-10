const Router = require('express');
const CreateRdataDTO=require('../DTO/create-rdata.dto');
const CreateRdisputeDTO=require('../DTO/create-rdispute.dto');
const DataRequestService = require('../service/index');

class DataRequestController {
    dataRequestService;
    router;
    path = '/dataRequest'

    constructor() {
        this.router = Router();
        this.dataRequestService = new DataRequestService();
        this.init();
    };

    init() {
        this.router.post('/createDataRequest', this.createRdata.bind(this));
        this.router.post('/createDisputeRequest',this.createRdispute.bind(this))
        this.router.get('/showRdata',this.showRdata.bind(this));
        this.router.get('/showRdispute',this.showRdispute.bind(this));
    };

    async createRdata(req, res, next) {
        try {
            const createRdataDTO = new CreateRdataDTO(req.body);
            await this.dataRequestService.createRData(createRdataDTO);
            res.status(201).json({ message: "처리완료" });
        } catch (err) {
            next(err);
        };
    };
    async createRdispute(req, res, next) {
        try {
            const createRdisputeDTO = new CreateRdisputeDTO(req.body);
            await this.dataRequestService.createRDispute(createRdisputeDTO);
            res.status(201).json({ message: "처리완료" });
        } catch (err) {
            next(err);
        };
    };
    async showRdata(req,res,next){
        try{
            const result = await this.dataRequestService.showRdata();
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    }
    async showRdispute(req,res,next){
        try{
            const result = await this.dataRequestService.showRdispute();
            res.status(200).json(result);
            }
        
        catch(err){
            next(err);
        }
    }
}

const dataRequestController = new DataRequestController();
module.exports = dataRequestController;

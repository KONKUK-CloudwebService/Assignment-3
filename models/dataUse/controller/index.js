const Router = require('express');
const CreateDataDTO = require('../DTO/create-data.DTO')
const DataService = require('../service/index');
class DataUseController{
    dataUseService;
    router;
    path = '/dataUse'

    constructor(){
        this.router = Router();
        this.dataUseService = new DataService();
        this.init();
    };

    init(){
        this.router.post('/insertData',this.insertData.bind(this));
        this.router.get('/',this.getDataVisuals.bind(this));
        this.router.get('/:id',this.getDataVisual.bind(this));
        this.router.post('/:id',this.deleteDataVisual.bind(this));
    };

    async insertData(req,res,next){
        try{
            const newData = new CreateDataDTO(req.body);
            await this.dataUseService.createData(newData);
            res.status(201).json({message: "처리완료"});

        }catch(err){
            next(err);
        };
    };

    async getDataVisuals(req,res,next){
        try{
            const result = await this.dataUseService.findDataVisuals(req.query.page);
            res.status(200).json({result});
        }catch(err){
            next(err);
        }
    };

    async getDataVisual(req,res,next){
        try{
            const {id} = req.params;
            const Data = await this.dataUseService.findDataVisual(id);
            res.status(200).json({Data});
        }catch(err){
            next(err);
        }
    };

    async deleteDataVisual(req,res,next){
        try{
            const {id} = req.params;
            await this.dataUseService.deleteDataVisual(id);
            res.status(204).json({});
        }catch(err){

        }
    }
}

const dataUseController = new DataUseController();
module.exports = dataUseController;
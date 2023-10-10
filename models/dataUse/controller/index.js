const Router = require('express');
const CreateDataDTO = require('../DTO/create-data.DTO')
const DataService = require('../service/index');
const baseResponse = require('../../../utils/baseResponse')
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
            baseResponse({message: "데이터 처리완료"},res)
        }catch(err){
            next(err);
        };
    };

    async getDataVisuals(req,res,next){
        try{
            const result = await this.dataUseService.findDataVisuals(req.query.page);
            baseResponse({result},res);
        }catch(err){
            next(err);
        }
    };

    async getDataVisual(req,res,next){
        try{
            const {id} = req.params;
            const Data = await this.dataUseService.findDataVisual(id);
            baseResponse({Data},res);
        }catch(err){
            next(err);
        }
    };

    async deleteDataVisual(req,res,next){
        try{
            const {id} = req.params;
            await this.dataUseService.deleteDataVisual(id);
            res.status(204).json({deletePostId: id},res);
        }catch(err){
            next(err);
        }
    }
}

const dataUseController = new DataUseController();
module.exports = dataUseController;
const Router = require("express");
const CreateRdataDTO = require("../DTO/create-rdata.dto");
const CreateRdisputeDTO = require("../DTO/create-rdispute.dto");
const DataRequestService = require("../service/index");
const baseResponse = require("../../../utils/baseResponse");

class DataRequestController {
  dataRequestService;
  router;
  path = "/requests";

  constructor() {
    this.router = Router();
    this.dataRequestService = new DataRequestService();
    this.init();
  }

  init() {
    this.router.post("/data", this.createRdata.bind(this)); // 데이터 요청 생성
    this.router.post("/disputes", this.createRdispute.bind(this)); // 분쟁 조정 요청 생성
    this.router.get("/data", this.showRdata.bind(this)); // 데이터 요청 목록 조회
    this.router.get("/disputes", this.showRdispute.bind(this)); // 분쟁 조정 요청 목록 조회
  }

  async createRdata(req, res, next) {
    try {
      const createRdataDTO = new CreateRdataDTO(req.body);
      await this.dataRequestService.createRData(createRdataDTO);
      baseResponse({ message: "데이터 생성 완료" }, res);
    } catch (err) {
      next(err);
    }
  }
  async createRdispute(req, res, next) {
    try {
      const createRdisputeDTO = new CreateRdisputeDTO(req.body);
      await this.dataRequestService.createRDispute(createRdisputeDTO);
      baseResponse({ message: "분쟁 데이터 생성 완료" }, res);
    } catch (err) {
      next(err);
    }
  }
  async showRdata(req, res, next) {
    try {
      const url = process.env.META_DATA_URL;
      const response = await axios.get(url);
      const data = response.data;

      const headInfo = data.OrganicAnimalProtectionFacilit[0].head;

      const result = await this.dataRequestService.showRdata();
      baseResponse({ headInfo, result }, res);
    } catch (err) {
      next(err);
    }
  }
  async showRdispute(req, res, next) {
    try {
      const url = process.env.META_DATA_URL;
      const response = await axios.get(url);
      const data = response.data;

      const headInfo = data.OrganicAnimalProtectionFacilit[0].head;

      const result = await this.dataRequestService.showRdispute();
      baseResponse({ headInfo, result }, res);
    } catch (err) {
      next(err);
    }
  }
}

const dataRequestController = new DataRequestController();
module.exports = dataRequestController;

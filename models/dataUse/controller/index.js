const Router = require("express");
const CreateDataDTO = require("../DTO/create-data.DTO");
const DataService = require("../service/index");
const baseResponse = require("../../../utils/baseResponse");
class DataUseController {
  dataUseService;
  router;
  path = "/data-visuals";

  constructor() {
    this.router = Router();
    this.dataUseService = new DataService();
    this.init();
  }

  init() {
    this.router.post("/", this.insertData.bind(this));
    this.router.get("/", this.getDataVisuals.bind(this));
    this.router.get("/:id", this.getDataVisual.bind(this));
    this.router.delete("/:id", this.deleteDataVisual.bind(this));
  }

  async insertData(req, res, next) {
    try {
      const newData = new CreateDataDTO(req.body);
      await this.dataUseService.createData(newData);
      baseResponse({ message: "데이터 처리완료" }, res);
    } catch (err) {
      next(err);
    }
  }

  async getDataVisuals(req, res, next) {
    try {
      const url = process.env.META_DATA_URL;
      const response = await axios.get(url);
      const data = response.data;

      const headInfo = data.OrganicAnimalProtectionFacilit[0].head;

      const result = await this.dataUseService.findDataVisuals(req.query.page);
      baseResponse({ headInfo, result }, res);
    } catch (err) {
      next(err);
    }
  }

  async getDataVisual(req, res, next) {
    try {
      const { id } = req.params;
      const Data = await this.dataUseService.findDataVisual(id);

      const url = process.env.META_DATA_URL;
      const response = await axios.get(url);
      const data = response.data;

      const headInfo = data.OrganicAnimalProtectionFacilit[0].head;

      baseResponse({ headInfo, Data }, res);
    } catch (err) {
      next(err);
    }
  }

  async deleteDataVisual(req, res, next) {
    try {
      const { id } = req.params;
      await this.dataUseService.deleteDataVisual(id);
      baseResponse({ deletePostId: id }, res);
    } catch (err) {
      next(err);
    }
  }
}

const dataUseController = new DataUseController();
module.exports = dataUseController;

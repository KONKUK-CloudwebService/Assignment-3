const dataSource = require("../../appDataSource");
const baseResponse = require("../../../utils/baseResponse")
const { deleteImageFromS3 } = require("../../../utils/s3/imageUploader");
const CustomException = require("../../../utils/handler/customException");
const { DATABASE_ERROR } = require("../../../utils/baseResponseStatus");
class DataService{
    async createData(data){
        try{
            await dataSource.query(
                `
                INSERT INTO dataVisual(
                title,
                creater,
                data_title,
                content, 
                division,
                img_url,
                csv_url,
                user_id,
                purpose
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [data.title, data.creater,data.data_title,data.content, data.division, data.img_url,data.csv_url,data.user_id,data.purpose]
            );
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
        
    };
    async findDataVisuals(page){
        try{
            const offset = (page - 1) * 20;
            const result = await dataSource.query(
                "SELECT title, creater, division, img_url FROM dataVisual WHERE id BETWEEN ? AND ?",
                [offset+1,offset+20]
            );
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        };
    };

    async findDataVisual(id){
        try{
            const result = await dataSource.query(
                "SELECT * FROM dataVisual WHERE id = ?",
                [id]
            );
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        };
    }

    async deleteDataVisual(id){
        try{
            const s3Image = await this.findDataVisual(id);
            await deleteImageFromS3(s3Image[0].img_url); 
            const result = await dataSource.query(
                "DELETE FROM dataVisual WHERE id = ?",
                [id]
            );
            console.log(result);
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        };
    };
}

module.exports = DataService;
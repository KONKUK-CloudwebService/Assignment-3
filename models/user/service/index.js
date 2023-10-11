const dataSource = require("../../appDataSource");
const jwt = require('jsonwebtoken');
const CommunityService = require("../../community/service/index");
const CustomException = require("../../../utils/handler/customException");
const { DATABASE_ERROR } = require("../../../utils/baseResponseStatus");

class UserService{
    communityService;

    constructor() {
        this.communityService = new CommunityService();
    };

    async register(data){
        try{
            await dataSource.query(
                `
                INSERT INTO users(
                name,
                email, 
                profile_image,
                password
                ) VALUES (?, ?, ?, ?)
                `,
                [data.name,data.email,data.profile_image,data.password]
            );
            
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
    };
    async login(post_name, post_password) {
        try {
          const result = await dataSource.query(
            `
            SELECT *
            FROM users
            WHERE name = ? AND password = ?
            `,
            [post_name, post_password]
          );
          return result;
        } catch (err) {
          throw new CustomException(DATABASE_ERROR);throw new CustomException(DATABASE_ERROR);
        }
    };
    
    async showUser(){
        try{
            const result = await dataSource.query(
                `
            SELECT * FROM users 
          
             `
        );

        return result;
        } catch (err) {
            throw new CustomException(DATABASE_ERROR);
        }

    }

    async deleteUser(id){
        const queryRunner = await dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try{
            console.log(id);
            await queryRunner.manager.query(
                `
                DELETE u
                FROM users u
                WHERE u.id = ?
                `,
                [id]
            );
            console.log(id);
            await queryRunner.commitTransaction();
            //await queryRunner.release();
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw new CustomException(DATABASE_ERROR);
        }
    }
}

module.exports = UserService;
const dataSource = require("../../appDataSource");
const baseResponse = require("../../../utils/baseResponse");
const { deleteImageFromS3 } = require("../../../utils/s3/imageUploader");
const CustomException = require("../../../utils/handler/customException");
const { DATABASE_ERROR } = require("../../../utils/baseResponseStatus");


class CommunityService{
    async createPost(data){
        try{
            await dataSource.query(
                `
                INSERT INTO community(
                title,
                content, 
                user_id
                ) VALUES (?, ?, ?)
                `,
                [data.title, data.content, data.user_id]
            );
            if(data.community_image_url !== 'null'){
                const community_id = await dataSource.query(
                    `
                    SELECT id FROM community WHERE title = ? AND content = ? AND user_id = ? 
                    `,
                    [data.title,data.content,data.user_id]
                );
                await dataSource.query(
                    `INSERT INTO community_images(
                        community_id,
                        user_id,
                        community_image_url
                    )VALUES(?,?,?)`,
                    [community_id[0].id,data.user_id,data.community_image_url]
                );
            }
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        }
        
    };

    async findPost(post_id){
        try{
            const result = await dataSource.query(
                `
                SELECT
                    c.id AS community_id,
                    c.title AS community_title,
                    c.content AS community_content,
                    CASE
                        WHEN ci.community_image_url IS NOT NULL THEN ci.community_image_url
                        ELSE NULL
                    END AS community_image_url
                FROM
                    community c
                LEFT JOIN
                    community_images ci ON c.id = ci.community_id
                WHERE
                    c.id = ?
                `,[post_id]
            );
           
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        };
    };

    async findPosts(page){
        try{
            console.log(1);
            const offset = (page - 1) * 10;
            const result = await dataSource.query(
                `
                SELECT
                    c.id AS community_id,
                    c.title AS community_title,
                    c.content AS community_content,
                    CASE
                        WHEN ci.community_image_url IS NOT NULL THEN ci.community_image_url
                        ELSE NULL
                    END AS community_image_url
                FROM
                    community c
                LEFT JOIN
                    community_images ci ON c.id = ci.community_id
                WHERE 
                    c.id BETWEEN ? AND ?
                `,[offset+1,offset+10]
            );
            return result;
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        };
        
    };
    // 이걸 하나의 transaction으로 처리할 필요가 있음
    async deletePost(post_id){
        const queryRunner = await dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try{
            const s3Image = await queryRunner.manager.query(
                `SELECT * FROM community_images WHERE community_id = ?`,[post_id]
            );
            if(s3Image.length !== 0) {
                await deleteImageFromS3(s3Image[0].community_image_url); 
                await queryRunner.manager.query(
                    `
                    DELETE ci
                    FROM community_images ci
                    WHERE ci.community_id = ?
                    `,
                    [post_id]
                );
            }
            await queryRunner.manager.query(
                `
                DELETE c
                FROM community c
                WHERE c.id = ?
                `,
                [post_id]
            );
            await queryRunner.commitTransaction();
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw new CustomException(DATABASE_ERROR);
        };
    };

    async updatePost(post_id, data){
        try{
            const s3Image = await dataSource.query(
                `SELECT * FROM community_images WHERE community_id = ?`,[post_id]
            );
            if(s3Image.length !== 0) {
                await deleteImageFromS3(s3Image[0].community_image_url); 
            }
            await dataSource.query(
                `
                UPDATE community c
                LEFT JOIN community_images ci ON c.id = ci.community_id
                SET c.title = ?,c.content = ? , ci.community_image_url = ?
                WHERE c.id = ?;
                `,
                [data.title,data.content,data.community_image_url,post_id]
            );
        }catch(err){
            throw new CustomException(DATABASE_ERROR);
        };
    };
};

module.exports = CommunityService;
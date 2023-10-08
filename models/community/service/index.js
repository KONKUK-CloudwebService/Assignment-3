const dataSource = require("../../appDataSource");
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
                    [1,data.user_id,data.community_image_url]
                );
            }
            console.log(1);
        }catch(err){
            throw{status: 404, message: "의도치 않은 오류"};
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
            throw{status: 404, message: "의도치 않은 오류"};
        };
    };

    async findPosts(page){
        try{
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
            throw{status: 404, message: "의도치 않은 오류"};
        };
        
    };

    async deletePost(post_id){
        try{
            const result = await dataSource.query(
                `
                DELETE c, ci
                FROM community c
                LEFT JOIN community_images ci ON c.id = ci.community_id
                WHERE c.id = ?
                `,
                [post_id]
            );
            console.log(result);
        }catch(err){
            throw{status: 404, message: "의도치 않은 오류"};
        };
    };

    async updatePost(post_id, data){
        await dataSource.query(
            `
            UPDATE community c
            LEFT JOIN community_images ci ON c.id = ci.community_id
            SET c.title = ?,c.content = ? , ci.community_image_url = ?
            WHERE c.id = ?;
            `,
            [data.title,data.content,data.community_image_url,post_id]
        );
    };
};

module.exports = CommunityService;
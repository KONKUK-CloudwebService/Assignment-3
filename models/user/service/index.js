const dataSource = require("../../appDataSource");


class UserService{
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
            throw{status: 404, message: "의도치 않은 오류"};
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
          throw { status: 404, message: "An unexpected error occurred" };
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
            throw{status: 404, message: "오류발생"};
        }

    }
}

module.exports = UserService;
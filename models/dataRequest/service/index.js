const dataSource = require("../../appDataSource");

class DataRequestService{
    async createRData(data){
        try{
            await dataSource.query(
                `
                INSERT INTO data_requests(
                    birth, 
                    phone_number, 
                    address, 
                    email, 
                    data_name, 
                    agency, 
                    purpose, 
                    user_id, 
                    likes)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `,
                [data.birth, data.phone_number, data.address, data.email, data.data_name, data.agency, data.purpose, data.user_id, data.likes]
            );
        }catch(err){
            throw{status: 404, message: "오류발생"};
        }
        
    };
    async createRDispute(data){
        try{
            await dataSource.query(
                `
                INSERT INTO dispute_requests(
                    birth,
                    phone_number,
                    address,
                    business_number,
                    email,
                    agency,
                    manager_name,
                    manager_department,
                    manager_phone,
                    manager_email,
                    data_id,
                    user_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `,
                [data.birth, data.phone_number, data.address,data.business_number,
                     data.email, data.agency, data.manager_name,data.manager_department,
                     data.manager_phone, data.manager_email, data.data_id, data.user_id]
            );
        }catch(err){
            throw{status: 404, message: "오류발생"};
        }
        
    };

    async showRdata(){
        try{

            const result = await dataSource.query(
                `
            SELECT * FROM data_requests 
          
             `
        );

        return result;
        } catch (err) {
            throw{status: 404, message: "오류발생"};
        }

    }
    async showRdispute(){
        try{    
            const result = await dataSource.query(
                `
            SELECT * FROM dispute_requests 
              
             `
            );
            
        return result;
        } catch (err) {
            throw{status: 404, message: "오류발생"};
        }

    }
}

module.exports = DataRequestService;
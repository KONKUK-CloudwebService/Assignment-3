class CreateRdataDTO{
    birth;
    phone_number;
    address;
    email;
    data_name;
    agency;
    purpose;
    user_id;
    likes;
    constructor(post){
        this.birth=post.birth; 
        this.phone_number=post.phone_number;
        this.address=post.address;
        this.email=post.email;
        this.data_name=post.data_name;
        this.agency=post.agency;
        this.purpose=post.purpose;
        this.user_id=post.user_id;
        this.likes=post.likes;
    } 
}
module.exports=CreateRdataDTO;

class CreateUserDTO{
    name;
    email;
    profile_image;
    password;
    constructor(post){
        this.name=post.name;
        this.email=post.email;
        this.profile_image=post.profile_image;
        this.password=post.password;
    } 
}
module.exports=CreateUserDTO;

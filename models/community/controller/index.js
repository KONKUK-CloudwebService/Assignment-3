const Router = require('express');
const CreatePostDTO = require('../DTO/create-post.dto');
const UpdatePostDTO = require('../DTO/create-post.dto');
const CommunityService = require('../service/index');
const baseResponse = require("../../../utils/baseResponse");

class CommunityController{
    communityService;
    router;
    path = '/community'

    constructor(){
        this.router = Router();
        this.communityService = new CommunityService();
        this.init();
    };

    init(){
        this.router.post('/createPost',this.createPost.bind(this));
        this.router.get('/:id',this.getPost.bind(this));
        this.router.get('/',this.getPosts.bind(this));
        this.router.post('/post/:id',this.deletePost.bind(this));
        this.router.post('/post/:id',this.updatePost.bind(this));
    };

    async createPost(req,res,next){
        try{
            const createPostDTO = new CreatePostDTO(req.body);
            await this.communityService.createPost(createPostDTO);
            baseResponse({message: "데이터 생성 완료"},res);
        }catch(err){
            next(err);
        }
    };

    async getPost(req,res,next){ // 만약 img url이 없을경우 null로 보낼지 아니면 아예 안보낼지는 고민해봐야할 듯
        try{
            const {id} = req.params;
            const result = await this.communityService.findPost(id);
            baseResponse({result},res);
        }catch(err){
            next(err);
        }
    };

    async getPosts(req,res,next){
        try{
            const result = await this.communityService.findPosts(req.query.page);
            baseResponse({result},res);
        }catch(err){
            next(err);
        };
    };

    async deletePost(req,res,next){
        try{
            const {id} = req.params;
            await this.communityService.deletePost(id);
            baseResponse({deletePostId: id},res);
        }catch(err){
            next(err);
        };
    };

    async updatePost(req,res,next){
        try{
            const {id} = req.params;
            const updatePostDTO = new UpdatePostDTO(req.body);
            await this.communityService.updatePost(id,updatePostDTO);
            baseResponse({updatePostId: id},res);
        }catch(err){
            next(err);
        }
    }

}
const communityController = new CommunityController();
module.exports = communityController;
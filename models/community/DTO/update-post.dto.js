class UpdatePostDTO{
    title;
    content; // 이건 null 일 수도
    user_id;
    community_image_url;
    constructor(post){
        this.title = post.title;
        this.content = post.content ?? "null";
        this.user_id = post.user_id;
        this.community_image_url = post.community_image_url ?? "null";
    }
};

module.exports = updatePostDTO;
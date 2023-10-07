class CreateDataDTO{
    title;
    creater;
    data_title;
    content;
    division;
    img_url;
    csv_url;
    user_id;
    purpose;
    constructor(data){
        this.title = data.title;
        this.creater = data.creater;
        this.data_title = data.data_title;
        this.content = data.content;
        this.division = data.division;
        this.img_url = data.img_url;
        this.csv_url = data.csv_url;
        this.user_id = data.user_id;
        this.purpose = data.purpose;
    };
}

module.exports = CreateDataDTO;
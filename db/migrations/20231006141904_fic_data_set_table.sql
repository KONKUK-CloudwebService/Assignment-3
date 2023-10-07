-- migrate:up
CREATE TABLE dataVisual -- 확장자 종류
(
    id      BIGINT NOT NULL AUTO_INCREMENT,
    title              VARCHAR(100) NOT NULL, -- 제목
    creater            VARCHAR(100) NOT NULL, -- 제작자 명
    data_title         VARCHAR(100) NOT NULL, -- 데이터 명
    content            VARCHAR(3000) NOT NULL, -- 데이터 설명
    division           VARCHAR(300) NOT NULL, -- 분류체계 (문화체육관광)
    img_url            VARCHAR(2000) NOT NULL, -- 이미지 파일
    csv_url            VARCHAR(2000) NOT NULL, -- csv 파일
    user_id            BIGINT NOT NULL,
    purpose            VARCHAR(1000) NOT NULL, -- 활용 목적
    created_at         DATETIME NOT NULL DEFAULT NOW(),
    updated_at         DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)    
);


-- migrate:down
DROP TABLE dataVisual;

-- migrate:up
CREATE TABLE data_requests -- 데이터요청
(
    id           BIGINT NOT NULL AUTO_INCREMENT,
    birth        BIGINT NOT NULL, -- 20001111
    phone_number BIGINT NOT NULL, -- 01011111111
    address      VARCHAR(500) NOT NULL,
    email        VARCHAR(200) NOT NULL,
    data_name    VARCHAR(500) NOT NULL, -- 요청하는 데이터 이름
    agency       VARCHAR(100) NOT NULL, -- 기관명
    purpose      VARCHAR(1000) NOT NULL,
    user_id      BIGINT NOT NULL,
    likes        BIGINT NOT NULL, -- 좋아요 수
    created_at   DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    updated_at   DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id),
    foreign key (user_id) references users (id)
);

-- migrate:down
DROP TABLE data_requests;

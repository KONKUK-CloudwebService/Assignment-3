
-- migrate:up
CREATE TABLE dispute_requests -- 분쟁조정
(
    id                 BIGINT NOT NULL AUTO_INCREMENT,
    birth              BIGINT NOT NULL, -- 20001111
    phone_number       BIGINT NOT NULL, -- 01011111111
    address            VARCHAR(500) NOT NULL,
    business_number    VARCHAR(500) NULL, -- 사업자번호
    email              VARCHAR(200) NOT NULL,
    agency             VARCHAR(100) NOT NULL, -- 기관명
    manager_name       VARCHAR(100) NULL, -- 실무담당자 성명
    manager_department VARCHAR(100) NULL, -- 실무담당자 부서명
    manager_phone      BIGINT NULL, -- 실무담당자 연락처, 01011111111
    manager_email      VARCHAR(200) NULL, -- 실무담당자 이메일
    data_id            BIGINT NOT NULL,
    user_id            BIGINT NOT NULL,
    created_at         DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    updated_at         DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id),
    foreign key (user_id) references users (id),
    foreign key (data_id) references data (id)
);

-- migrate:down
DROP TABLE dispute_requests;
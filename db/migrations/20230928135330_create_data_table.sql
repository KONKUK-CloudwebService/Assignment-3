-- migrate:up
CREATE TABLE data -- 데이터
(
  id                 BIGINT NOT NULL AUTO_INCREMENT,
  title              VARCHAR(100) NOT NULL,
  content            VARCHAR(3000) NULL,
  division           VARCHAR(300) NULL, -- 분류체계 (문화체육관광)
  manager_department VARCHAR(100) NULL, -- 실무담당자 부서명
  manager_phone      BIGINT NULL, -- 실무담당자 연락처, 01011111111
  url                VARCHAR(2000) NULL,
  cost               BIGINT NULL,
  user_id            BIGINT NOT NULL,
  created_at         DATETIME NOT NULL DEFAULT NOW(),
  updated_at         DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)                              
);


-- migrate:down
DROP TABLE data;
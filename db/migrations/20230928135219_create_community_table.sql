-- migrate:up
CREATE TABLE community -- 개발자 커뮤니티 / 공지사항 등
(
  id         BIGINT NOT NULL AUTO_INCREMENT,
  title      VARCHAR(100) NOT NULL,
  content    VARCHAR(3000) NULL,
  user_id    BIGINT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)                              
);


-- migrate:down
DROP TABLE community;


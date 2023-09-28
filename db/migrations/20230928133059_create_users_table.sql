-- migrate:up
CREATE TABLE users 
(
  id            BIGINT NOT NULL AUTO_INCREMENT,                        
  name          VARCHAR(50) NOT NULL,                             
  email         VARCHAR(200) NOT NULL,
  profile_image VARCHAR(2000) NULL,    
  password      VARCHAR(200) NOT NULL,
  created_at    DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  updated_at    DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (id)                                       
);

-- migrate:down
DROP TABLE users;

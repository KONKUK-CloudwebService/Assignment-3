-- migrate:up
CREATE TABLE data_sets -- 확장자 종류
(
    id      BIGINT NOT NULL AUTO_INCREMENT,
    data_id BIGINT NOT NULL,
    types   VARCHAR(100) NULL,
    PRIMARY KEY (id),
    foreign key (data_id) references data (id)
);

-- migrate:down
DROP TABLE community_images;
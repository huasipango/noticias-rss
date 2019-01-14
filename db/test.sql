create database newsRss;

use newsRss;

create table noticia
(
    not_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    not_author VARCHAR(50),
    not_title VARCHAR(100),
    not_description TEXT,
    not_url VARCHAR(200),
    not_urlToImage VARCHAR(200),
    not_publishedAt VARCHAR (30),
    not_content TEXT
);

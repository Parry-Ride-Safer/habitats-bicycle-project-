CREATE DATABASE habitat;

Use habitat;

CREATE TABLE `user` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `hashedPassword` varchar(100) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT "user"
);

CREATE TABLE `address` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `lat` decimal(8,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL
);

CREATE TABLE `category` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100)
);

CREATE TABLE `report` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `information` varchar(300),
  `user_id` int NOT NULL,
  `address_id` int NOT NULL,
  `category_id` int NOT NULL
);

CREATE TABLE `voting` (
  `user_id` int,
  `report_id` int,
  `voting` int NOT NULL,
  PRIMARY KEY (`user_id`, `report_id`)
);

ALTER TABLE `voting` ADD FOREIGN KEY (`report_id`) REFERENCES `report` (`id`);

ALTER TABLE `voting` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `report` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `report` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `report` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);



insert into category (name) values('traffic'),('intersection'),('bikelane'),('road'),('traffic'),('other');
INSERT INTO user (email, hashedpassword)  VALUES ('paulo@gmail.com', 'aushduhasud');

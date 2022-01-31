DROP DATABASE habitat;
create database habitat;
use habitat;

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
  `createdAt` DATETIME DEFAULT now() ON UPDATE now(),
  `user_id` int NOT NULL,
  `address_id` int NOT NULL,
  `image` varchar(255),
  `category_id` int NOT NULL,
  `is_hidden` boolean default false
);

CREATE TABLE `voting` (
  `user_id` int,
  `report_id` int,
  `voting` int,
  `flag_id` int,
  PRIMARY KEY (`user_id`, `report_id`)
);

CREATE TABLE `flag` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

ALTER TABLE `voting` ADD FOREIGN KEY (`report_id`) REFERENCES `report` (`id`) ON delete CASCADE;

ALTER TABLE `voting` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE cascade;

ALTER TABLE `report` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `report` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE cascade;

ALTER TABLE `report` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `voting` ADD FOREIGN KEY (`flag_id`) REFERENCES `flag` (`id`);

insert into category (name) values('traffic'),('intersection'),('bikelane'),('road'),('traffic'),('other');
insert into flag (name) values ('Innapropiate Report'), ('Wrong Location'), ('Issue Resolved');




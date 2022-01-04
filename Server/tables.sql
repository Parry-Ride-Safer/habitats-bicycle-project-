create database Habitat;
use habitat;

create table users(
id int not null auto_increment,
firstname varchar(255) not null,
lastname varchar(255) not null,
email varchar(255) unique not null,
username varchar(100) not null,
hashedPassword varchar(100) not null,
primary key (id)
);

create table address(
id int not null auto_increment,
lat decimal(8,6) not null,
lon decimal (9,6)not null,
primary key (id)
);

create table category(
id int not null auto_increment,
name varchar(100),
primary key (id));

create table reports(
id int not null auto_increment,
information varchar(300),
voting int,
users_id int not null,
address_id int not null,
category_id int not null,
constraint fk_users_reports
	foreign key (users_id)
    REFERENCES users(id),
constraint fk_address_reports
	foreign key (address_id)
    REFERENCES address(id),
constraint fk_category_reports
	foreign key (category_id)
    REFERENCES category(id),
primary key (id)
);

INSERT INTO category (name) VALUES('contruction'),('intersection'),('bikelane'),('road');
INSERT INTO users VALUES (1,'paulo', 'Costa', 'paulo@gmail.com', 'asdasdasd' ,'aushduhasud');
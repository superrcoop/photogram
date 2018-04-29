drop database if exists info3180project2;
create database info3180project2; 
use info3180project2;

create table posts(
	post_id int,
	user_id int,
	photo varchar(80),
	caption varchar(120),
	created_on datetime,
	primary key (post_id)
);

create table users(
	users_id int,
	username varchar(80),
	password varchar(255),
	firstname varchar(80),
	lastname varchar(80),
	email varchar(80),
	location varchar(80),
	biography varchar(255),
	profile_photo varchar(80),
	joined_on datetime,
	primary key (users_id)
);

create table likes( 
	likes_id int,
	user_id int,
	post_id int,	
	primary key (likes_id),
	foreign key (user_id) references posts(user_id) on delete cascade on update cascade,
	foreign key (post_id) references posts(post_id) on delete cascade on update cascade
);

create table follows(
	follows_id int,
	user_id int,
	follower_id int,
	primary key (follows_id),
	foreign key (user_id) references posts(user_id) on delete cascade on update cascade
);
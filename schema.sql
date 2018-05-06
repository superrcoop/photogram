drop database if exists photogram;
create database photogram; 
use photogram;

create table users(
	user_id int,
	username varchar(80),
	password varchar(255),
	firstname varchar(80),
	lastname varchar(80),
	email varchar(80),
	location varchar(80),
	biography varchar(300),
	profile_photo varchar(80),
	joined_on date,
	primary key (user_id)
);
 
create table posts(
	post_id int,
	user_id int,
	photo varchar(80),
	caption varchar(120),
	created_on date,
	primary key (posts_id),
	foreign key (user_id) references users(user_id) on delete cascade on update cascade

);

create table likes( 
	likes_id int,
	user_id int,
	post_id int,	
	primary key (likes_id, user_id),
	foreign key (user_id) references users(user_id) on delete cascade on update cascade,
	foreign key (post_id) references posts(post_id) on delete cascade on update cascade
);

create table follows(
	follows_id int,
	user_id int,
	follower_id int,
	primary key (follows_id),
	foreign key (user_id) references users(user_id) on delete cascade on update cascade
);


/* 

create table comments(
	comment_id int,
	post_id int,
	user_id int,
	comment varchar(300),
	created_on date,
	primary key (comment_id),
	foreign key (user_id) references users(user_id) on delete cascade on update cascade,
	foreign key (post_id) references posts(post_id) on delete cascade on update cascade
);



 eg. Tables

                 List of relations
 Schema |      Name       | Type  |     Owner      
--------+-----------------+-------+----------------
 public | alembic_version | table | 
 public | follows         | table | 
 public | likes           | table | 
 public | posts           | table | 
 public | users           | table | 
(5 rows)


    id    | user_name |                           password                           | first_name | last_name |        email        |     location     | biography |                 profile_photo             | joined_on  
----------+-----------+--------------------------------------------------------------+------------+-----------+---------------------+------------------+-----------+-------------------------------------------+------------
 90667879 | coope12   | $2b$12$6Csa/rtHiu.z2zNb7EZ16OR3AX25OQsiII55gj.My.j9EOU2ROXb6 | jordan     | cooper    | email@email.com     | kingstion        |           |     						               | 2018-04-30
 10697786 | test3     | $2b$12$F4tK0b4CSQ7imDUZcK6w4.zb1ANX2IiX8tcWqUgGRFmutZ/vpJ.QG | test       | test2     | email@emaol.com     | Kingston         |           | ./app/static/uploads/users/f4314d469101   | 2018-04-30

id   	| user_id  |                     post_URI                   |  caption  | created_on 
--------+----------+------------------------------------------------+-----------+------------
 14bb65 | 90667879 | ./app/static/uploads/posts/14bb65              | Caption   | 2018-05-05
 a4c782 | 90667879 | ./app/static/uploads/posts/a4c782              | #waves.   | 2018-05-05

 follows_id | user_id | follower_id 
------------+---------+-------------
(0 rows)


 likes_id | user_id | post_id 
----------+---------+---------
(0 rows)

 comment_id | post_id |   user_id  | comment | likes | created_on  
------------+---------+------------+---------+-------+---------------
(0 rows)
*/
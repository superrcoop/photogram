drop database if exists info3180project2;
create database info3180project2; 
use info3180project2;

create table users(
	user_id int,
	username varchar(80),
	password varchar(255),
	firstname varchar(80),
	lastname varchar(80),
	email varchar(80),
	location varchar(80),
	biography varchar(255),
	profile_photo varchar(80),
	joined_on date,
	primary key (user_id)
);
 
create table posts(
	posts_id int,
	user_id int,
	photo varchar(80),
	caption varchar(120),
	created_on date,
	primary key (posts_id)

);

create table likes( 
	likes_id int,
	user_id int,
	posts_id int,	
	primary key (likes_id, user_id),
	foreign key (user_id) references users(user_id) on delete cascade on update cascade
);

create table follows(
	follows_id int,
	user_id int,
	follower_id int,
	primary key (follows_id),
	foreign key (user_id) references users(user_id) on delete cascade on update cascade
);

INSERT INTO users VALUES (10000001, "shantolforever", "hysmo56"         , "Shantol" , "Miekles", "smiekless@gmail.com"  ,   "Kinston"     , "I love basketball."                          , ".app\static\upload\<user_id>\profilephoto" ,"2017/10/1" );
INSERT INTO users VALUES (10000002, "youngboss"     , "klgon23"         , "Kevin"   , "Junior" , "kevinjr@hype.com"     ,   "Montego Bay" , "Forever Working Towards The Paper."          , ".app\static\upload\<user_id>\profilephoto" ,"2017/08/05");
INSERT INTO users VALUES (10000003, "threehype"     , "junior23"        ,"Nicholas" , "Smith"  , "nichsmith23@yahoo.com",   "St Elizabeth", "Young Wild and Free."                        , ".app\static\upload\<user_id>\profilephoto" ,"2017/05/26" );
INSERT INTO users VALUES (10000004, "kimmykitty"    , "kingJks"         , "Kimberly", "Kurtis" , "kurtiskim24@yahoo.com",   "Trelawny"    , "I am free like the ocean. I love travelling.", ".app\static\upload\<user_id>\profilephoto" ,"2015/04/01");
INSERT INTO users VALUES (10000005, "wildrebecca"   , "unforgettable577", "Rebecca" , "Reid"   , "rebeccarr33@hotmail.com", "St. Andrew"  , "I am an entrepreneur."                       , ".app\static\upload\<user_id>\profilephoto" ,"2016/12/24");
INSERT INTO users VALUES (10000006, "sammyforever"  , "funpass7766"     , "Samantha", "Neil"   , "sammyneil78@gmail.com",   "Clarendon"   , "I am a student at U-tech."                   , ".app\static\upload\<user_id>\profilephoto" ,"2017/09/18" );
INSERT INTO users VALUES (10000007, "humblehenry"   , "839hhsls"        , "Henry"   , "Charles", "henrycha76al@gmail.com", "Hanover"      , "Pastry is my passion."                       , ".app\static\upload\<user_id>\profilephoto" ,"2015/08/13");
INSERT INTO users VALUES (10000008, "musicalstyles" , "HUkd733"         , "Michael" , "Powell" , "powellmike@hotmail.com", "Portland"     , "I am an artiste. I will forever love music"  , ".app\static\upload\<user_id>\profilephoto" ,"2017/03/12");
INSERT INTO users VALUES (10000009, "gorgeousgia"   ,"739HKnjnd"        , "Gia"     , "James"  , "giajames44@mua.com"    , "St. Thomas"   , "I am a make-up artist. I can transform you"  , ".app\static\upload\<user_id>\profilephoto" ,"2016/02/11");
INSERT INTO users VALUES (10000010, "jugglegym"     , "jsie893njd"      , "Christopher", "Smart", "chrissmart@gmail.com" , "Manchester"   , "Gyming is life. It's my life!"               , ".app\static\upload\<user_id>\profilephoto" ,"2017/04/09");


INSERT INTO posts VALUES(20000001, 10000001,".app\static\upload\<posts_id>\postsphoto" ,"Basketball"     ,"2017/10/1");
INSERT INTO posts VALUES(20000002, 10000002,".app\static\upload\<posts_id>\postsphoto" ,"Cash or Cheque" ,"2017/08/05");
INSERT INTO posts VALUES(20000003, 10000003,".app\static\upload\<posts_id>\postsphoto" ,"Escape"         ,"2017/05/26");
INSERT INTO posts VALUES(20000004, 10000004,".app\static\upload\<posts_id>\postsphoto" ,"Greece"         ,"2015/04/01");
INSERT INTO posts VALUES(20000005, 10000005,".app\static\upload\<posts_id>\postsphoto" ,"Bossman"        ,"2016/12/24");
INSERT INTO posts VALUES(20000006, 10000006,".app\static\upload\<posts_id>\postsphoto" ,"Studying"       ,"2017/09/18");
INSERT INTO posts VALUES(20000007, 10000007,".app\static\upload\<posts_id>\postsphoto" ,"Macaroons"      ,"2015/08/13");
INSERT INTO posts VALUES(20000008, 10000008,".app\static\upload\<posts_id>\postsphoto" ,"Nicki Minaj"    ,"2017/03/12");
INSERT INTO posts VALUES(20000009, 10000009,".app\static\upload\<posts_id>\postsphoto" ,"Kylie Cosmetics","2016/02/11");
INSERT INTO posts VALUES(20000010, 10000010,".app\static\upload\<posts_id>\postsphoto" ,"Express Fitness","2017/04/09");


INSERT INTO likes VALUES(30000001, 10000001, 40000001);
INSERT INTO likes VALUES(30000002, 10000002, 40000002);
INSERT INTO likes VALUES(30000003, 10000003, 40000003);
INSERT INTO likes VALUES(30000004, 10000004, 40000004);
INSERT INTO likes VALUES(30000005, 10000005, 40000005);
INSERT INTO likes VALUES(30000006, 10000006, 40000006);
INSERT INTO likes VALUES(30000007, 10000007, 40000007);
INSERT INTO likes VALUES(30000008, 10000008, 40000008);
INSERT INTO likes VALUES(30000009, 10000009, 40000009);
INSERT INTO likes VALUES(30000010, 10000010, 40000010);


INSERT INTO follows VALUES(40000001, 10000001, 50000001);
INSERT INTO follows VALUES(40000002, 10000002, 50000002);
INSERT INTO follows VALUES(40000003, 10000003, 50000003);
INSERT INTO follows VALUES(40000004, 10000004, 50000004);
INSERT INTO follows VALUES(40000005, 10000005, 50000005);
INSERT INTO follows VALUES(40000006, 10000006, 50000006);
INSERT INTO follows VALUES(40000007, 10000007, 50000007);
INSERT INTO follows VALUES(40000008, 10000008, 50000008);
INSERT INTO follows VALUES(40000009, 10000009, 50000009);
INSERT INTO follows VALUES(40000010, 10000010, 50000010);

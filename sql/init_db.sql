drop database if exists anime_streaming_calendar;
create database anime_streaming_calendar;

create table anime_streaming_calendar.users(
  id int unsigned auto_increment primary key,
  name varchar(20) not null,
  password varchar(255) not null,
  token varchar(255) not null,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
);

create table anime_streaming_calendar.services(
  id int unsigned auto_increment primary key,
  name varchar(20) not null,
  url varchar(255) not null,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
);

create table anime_streaming_calendar.works(
  id int unsigned auto_increment primary key,
  name varchar(30) not null,
  url varchar(255) not null,
  onair boolean not null,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
);

create table anime_streaming_calendar.schedules(
  id int unsigned auto_increment primary key,
  day_of_week int not null,
  url varchar(255) not null,
  user_id int unsigned not null,
  work_id int unsigned not null,
  service_id int unsigned not null,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
);

alter table anime_streaming_calendar.schedules add constraint fk_schedules_user foreign key (user_id) references users (id);
alter table anime_streaming_calendar.schedules add constraint fk_schedules_work foreign key (work_id) references works (id);
alter table anime_streaming_calendar.schedules add constraint fk_schedules_service foreign key (service_id) references services (id);

create table anime_streaming_calendar.lists(
  id int unsigned auto_increment primary key,
  name varchar(20) not null,
  user_id int unsigned not null,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
);

alter table anime_streaming_calendar.lists add constraint fk_lists_user foreign key (user_id) references users (id);

create table anime_streaming_calendar.relate_lists_schedules(
  list_id int unsigned not null,
  schedule_id int unsigned not null,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
);

alter table anime_streaming_calendar.relate_lists_schedules add constraint fk_relate_lists_schedules_list foreign key (list_id) references lists (id);
alter table anime_streaming_calendar.relate_lists_schedules add constraint fk_relate_lists_schedules_schedule foreign key (schedule_id) references schedules (id);


insert into anime_streaming_calendar.services (name , url) values ( 'dTV','https://pc.video.dmkt-sp.jp/');
insert into anime_streaming_calendar.services (name , url) values ( 'Hulu','https://www.happyon.jp/');
insert into anime_streaming_calendar.services (name , url) values ( 'U-NEXT','https://video.unext.jp/');
insert into anime_streaming_calendar.services (name , url) values ( 'プライム・ビデオ','https://www.amazon.co.jp/Prime-Video/b?ie=UTF8&node=3535604051/');
insert into anime_streaming_calendar.services (name , url) values ( 'Netflix','https://www.netflix.com/jp/');
insert into anime_streaming_calendar.services (name , url) values ( 'dアニメストア','https://anime.dmkt-sp.jp/');
insert into anime_streaming_calendar.services (name , url) values ( 'auビデオパス','https://www.videopass.jp/');
insert into anime_streaming_calendar.services (name , url) values ( 'niconico','www.nicovideo.jp/');

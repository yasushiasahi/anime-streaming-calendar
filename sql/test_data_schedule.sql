create table anime_streaming_calendar.schedules(
  id int unsigned auto_increment primary key,
  day int not null,
  url varchar(255) not null,
  user_id int unsigned not null,
  work_id int unsigned not null,
  service_id int unsigned not null,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
);


insert into schedules (day , user_id,work_id,service_id) values ( ,);

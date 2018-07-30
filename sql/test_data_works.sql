insert into users (name ,password ,token) values ( 'あさひ','88857dbe0f1a24bde21dcb7b103b7286fd709f1fbb775e661762dcc1b169c233', '1111111111');
insert into users (name ,password ,token) values ( 'やすし','88857dbe0f1a24bde21dcb7b103b7286fd709f1fbb775e661762dcc1b169c233', '1111111111');

insert into works (name ,url, onair, user_id) values ( '邪神ちゃんドロップキック', 'jashinchan.com', 1, 1);
insert into works (name ,url, onair, user_id) values ( 'プラネット・ウィズ', 'planet-with.com', 1, 2);
insert into works (name ,url, onair, user_id) values ( 'あそびあそばせ', 'asobiasobase.com', 1, 1);

insert into schedules (day_of_week, url, user_id, work_id, service_id) values ( 1,'http://amzn.asia/0upy9ns', 1, 1 ,4);
insert into schedules (day_of_week, url, user_id, work_id, service_id) values ( 5,'https://anime.dmkt-sp.jp/animestore/ci_pc?workId=22265', 2, 2 ,6);

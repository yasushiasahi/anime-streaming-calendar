-- select * from posts join comments on posts.id = comments.post_id;

-- select * from schedules join works on schedules.work_id = works.id;

-- select work_id, name, day_of_week, service_id, schedules.url from schedules join works on schedules.work_id = works.id;

-- select * from schedules inner join works on schedules.work_id = schedules.service_id inner join services on table1.id = table3.id;

-- select * from table1 inner join table2 on table1.id = table2.id inner join table3 on table1.id = table3.id;


select
	works.id as work_id,
	works.name as work_name,
	works.url as work_url,
	services.id as services_id,
	services.name as service_name,
	schedules.day_of_week,
	schedules.url as schedules_url
from works
left join schedules ON works.id = schedules.work_id
left join services ON schedules.service_id = services.id
where work_id = 5;

-- select articles.id, articles_title, articles_body, tags.id, tags.name
-- FROM articles
-- LEFT JOIN articles_tags ON articles.id = articles_tags.article_id
-- LEFT JOIN tags ON articles_tags.tag_id = tags.id;

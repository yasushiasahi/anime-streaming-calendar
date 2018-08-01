package data

// Schedule stands for schedules sql table
type Schedule struct {
	ID        int    `json:"id"`
	DayOfWeek int    `json:"dayOfWeek"`
	URL       string `json:"url"`
	UserID    int    `json:"userId"`
	WorkID    int    `json:"workId"`
	ServiceID int    `json:"serviceId"`
}

// Create ...
func (sd *Schedule) Create() (err error) {
	res, err := Db.Exec(
		"insert into schedules (day_of_week, url, user_id, work_id, service_id) values (?, ?, ?, ?, ?)",
		sd.DayOfWeek,
		sd.URL,
		sd.UserID,
		sd.WorkID,
		sd.ServiceID,
	)

	id, err := res.LastInsertId()
	if err != nil {
		return
	}

	sd.ID = int(id)

	return
}

// GetSchedules gets all schedules
func GetSchedules() (sds []Schedule, err error) {
	rows, err := Db.Query("select id, day_of_week, url, user_id, work_id, service_id from schedules")
	if err != nil {
		return
	}

	for rows.Next() {
		sd := Schedule{}
		err = rows.Scan(
			&sd.ID,
			&sd.DayOfWeek,
			&sd.URL,
			&sd.UserID,
			&sd.WorkID,
			&sd.ServiceID,
		)
		if err != nil {
			return
		}
		sds = append(sds, sd)
	}
	rows.Close()

	return
}

// WorkJoinedSchedule joined works, services, schedule
type WorkJoinedSchedule struct {
	SvID   int    `json:"svId"`
	SvName string `json:"svName"`
	DOW    int    `json:"DOW"`
	SdURL  string `json:"sdUrl"`
}

// GetWorkJoinedSchedules ...
func GetWorkJoinedSchedules(wkID int) (wjss []WorkJoinedSchedule, err error) {
	rows, err := Db.Query(`
        select
                services.id,
                services.name,
                schedules.day_of_week,
                schedules.url
        from works
        left join schedules ON works.id = schedules.work_id
        left join services ON schedules.service_id = services.id
        where work_id = ?;
    `, wkID)
	if err != nil {
		return
	}

	for rows.Next() {
		wjs := WorkJoinedSchedule{}
		err = rows.Scan(
			&wjs.SvID,
			&wjs.SvName,
			&wjs.DOW,
			&wjs.SdURL,
		)
		if err != nil {
			return
		}
		wjss = append(wjss, wjs)
	}
	rows.Close()

	return
}

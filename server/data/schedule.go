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

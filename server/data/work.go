package data

// Work stands for works sql table
type Work struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	URL    string `json:"url"`
	Onair  bool   `json:"onair"`
	UserID int    `json:"userId"`
}

// Create ...
func (wk *Work) Create() (err error) {
	res, err := Db.Exec(
		"insert into works (name, url, onair, user_id) values (?, ?, ?, ?)",
		wk.Name,
		wk.URL,
		wk.Onair,
		wk.UserID,
	)

	id, err := res.LastInsertId()
	if err != nil {
		return
	}

	wk.ID = int(id)

	return
}

// GetWorks gets all works
func GetWorks() (wks []Work, err error) {
	rows, err := Db.Query("select id, name, url, onair,user_id from works")
	if err != nil {
		return
	}

	for rows.Next() {
		wk := Work{}
		err = rows.Scan(
			&wk.ID,
			&wk.Name,
			&wk.URL,
			&wk.Onair,
			&wk.UserID,
		)
		if err != nil {
			return
		}
		wks = append(wks, wk)
	}
	rows.Close()

	return
}

// GetByURL returns user which match url
func (wk *Work) GetByURL() (err error) {
	err = Db.QueryRow(
		"select id, name, Onair, user_id from works where url = ?",
		wk.URL,
	).Scan(
		&wk.ID,
		&wk.Name,
		&wk.Onair,
		&wk.UserID,
	)
	if err != nil {
		return
	}
	return
}

// Update updates work
func (wk *Work) Update() (err error) {
	_, err = Db.Exec(
		"update works set name = ?, user_id = ? where id = ?",
		wk.Name,
		wk.UserID,
		wk.ID,
	)
	return
}

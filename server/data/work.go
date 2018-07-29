package data

// Work stands for works sql table
type Work struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	URL   string `json:"url"`
	Onair bool   `json:"onair"`
}

// Create ...
func (wk *Work) Create() (err error) {
	_, err = Db.Exec(
		"insert into works (name, url, onair) values (?, ?, ?)",
		wk.Name,
		wk.URL,
		wk.Onair,
	)
	return
}

// GetWorks gets all works
func GetWorks() (wks []Work, err error) {
	rows, err := Db.Query("select id, name, url, onair from works")
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
		"select id, name, Onair from works where url = ?",
		wk.URL,
	).Scan(
		&wk.ID,
		&wk.Name,
		&wk.Onair,
	)
	if err != nil {
		return
	}
	return
}

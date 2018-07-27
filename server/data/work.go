package data

// Work stands for works sql table
type Work struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	URL   string `json:"url"`
	Onair bool   `json:"onair"`
}

// Create ...
func (w *Work) Create() (err error) { return }

// GetWorks gets all works
func GetWorks() (ss []Work, err error) {
	rows, err := Db.Query("select id, name, url, onair from works")
	if err != nil {
		return
	}

	for rows.Next() {
		w := Work{}
		err = rows.Scan(
			&w.ID,
			&w.Name,
			&w.URL,
			&w.Onair,
		)
		if err != nil {
			return
		}
		ss = append(ss, w)
	}
	rows.Close()

	return
}

// GetByURL returns user which match url
func (w *Work) GetByURL() (err error) {
	err = Db.QueryRow(
		"select id, name, Onair from works where url = ?",
		w.URL,
	).Scan(
		&w.ID,
		&w.Name,
		&w.Onair,
	)
	if err != nil {
		return
	}
	return
}

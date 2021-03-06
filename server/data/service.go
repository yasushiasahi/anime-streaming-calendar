package data

// Service stands for service sql table
type Service struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	URL  string `json:"url"`
}

// GetService gets all services
func GetService() (ss []Service, err error) {
	rows, err := Db.Query("select id, name, url from services")
	if err != nil {
		return
	}

	for rows.Next() {
		s := Service{}
		err = rows.Scan(
			&s.ID,
			&s.Name,
			&s.URL,
		)
		if err != nil {
			return
		}
		ss = append(ss, s)
	}
	rows.Close()

	return
}

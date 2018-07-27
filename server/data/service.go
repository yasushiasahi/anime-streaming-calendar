package data

import (
	"time"
)

// Service stands for users sql table
type Service struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	URL       string    `json:"url"`
	CreatedAt time.Time `json:"createAt"`
	UpdatedAt time.Time `json:"updateAt"`
}

// GetService gets all users
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

package data

import (
	"fmt"
	"time"
)

// User is for users table
type User struct {
	ID        int
	Name      string
	Password  string
	Token     string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Create a new user
func (u *User) Create() error {

	fmt.Println(u.Name, u.Password, u.Token)
	res, err := Db.Exec(
		"insert into users (name, password, token) values ($1, $2, $3)",
		u.Name, u.Password, u.Token,
	)
	fmt.Println(res)
	return err
}

// GetByID find user by ID
func (u *User) GetByID() (err error) {
	row := Db.QueryRow("SELECT name FROM users WHERE id = $1", u.ID)
	err = row.Scan(&u.Name)
	return
}

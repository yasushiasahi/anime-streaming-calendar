package data

import (
	"log"
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
func (u *User) Create() (err error) {
	stmt := "insert into users (name, password, token) values (?, ?, ?)"
	st, err := Db.Prepare(stmt)
	if err != nil {
		return err
	}
	defer st.Close()

	res, err := st.Exec(u.Name, u.Password, u.Token)
	if err != nil {
		log.Fatal(err)
	}

	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	u.ID = int(id)

	return
}

// GetByID finds user by ID
func (u *User) GetByID() (err error) {
	err = Db.QueryRow(
		"select id, name, password, token from users where id = ?",
		u.ID,
	).Scan(
		&u.ID,
		&u.Name,
		&u.Password,
		&u.Token,
	)
	return
}

// GetAll gets all users
func GetAll() (us []User, err error) {
	rows, err := Db.Query("select id, name, password, token from users")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		u := User{}
		err = rows.Scan(
			&u.ID,
			&u.Name,
			&u.Password,
			&u.Token,
		)
		if err != nil {
			log.Fatal(err)
		}
		us = append(us, u)
	}
	rows.Close()

	return
}

// Update update user by ID
func (u *User) Update() (err error) {
	_, err = Db.Exec(
		"update users set name = ?, password = ?, token = ? where id = ?",
		u.Name, u.Password, u.Token, u.ID,
	)
	return
}

// Delete deletes user by Id
func (u *User) Delete() (err error) {
	_, err = Db.Exec(
		"delete from users where id = ?",
		u.ID,
	)
	return
}

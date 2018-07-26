package data

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// User stands for users sql table
type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Password  string    `json:"password"`
	Token     string    `json:"token"`
	CreatedAt time.Time `json:"createAt"`
	UpdatedAt time.Time `json:"updateAt"`
}

// Create a new user
func (u *User) Create() (err error) {
	u.encryptPassword()
	u.SetToken()

	stmt := "insert into users (name, password, token) values (?, ?, ?)"
	st, err := Db.Prepare(stmt)
	if err != nil {
		return
	}
	defer st.Close()

	res, err := st.Exec(u.Name, u.Password, u.Token)
	if err != nil {
		return
	}

	id, err := res.LastInsertId()
	if err != nil {
		return
	}

	u.ID = int(id)
	return
}

// SetCookie sets token to client cookie
func (u *User) SetCookie(w http.ResponseWriter) {
	c := http.Cookie{
		Name:  "_cookie",
		Value: u.Token,
		Path:  "/",
	}
	u.Token = ""
	http.SetCookie(w, &c)
}

// GetByToken ..
func (u *User) GetByToken() (err error) {
	err = Db.QueryRow(
		"select id,name,password from users where token = ?",
		u.Token,
	).Scan(
		&u.ID,
		&u.Name,
		&u.Password,
	)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
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
		u.Name,
		u.Password,
		u.Token,
		u.ID,
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

func (u *User) encryptPassword() {
	u.Password = makeHash(u.Password)
}

func (u *User) SetToken() {
	ts := time.Now().Format(time.RFC3339Nano)
	u.Token = makeHash(u.Name + ts)
}

package data

import (
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

// GetByToken returns user which match token
func (u *User) GetByToken() (err error) {
	err = Db.QueryRow(
		"select id, name, password from users where token = ?",
		u.Token,
	).Scan(
		&u.ID,
		&u.Name,
		&u.Password,
	)
	if err != nil {
		return
	}
	return
}

// GetByName returns user which match token
func (u *User) GetByName() (err error) {
	err = Db.QueryRow(
		"select id, password from users where name = ?",
		u.Name,
	).Scan(
		&u.ID,
		&u.Password,
	)
	if err != nil {
		return
	}
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

// SetToken updates users token
func (u *User) SetToken() {
	ts := time.Now().Format(time.RFC3339Nano)
	u.Token = MakeHash(u.Name + ts)
}

func (u *User) encryptPassword() {
	u.Password = MakeHash(u.Password)
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

package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

// Handle is functions set which handle apis
var Handle = map[string]func(http.ResponseWriter, *http.Request){
	"createUser":   createUser,
	"checkSession": checkSession,
	// "updateUser": updateUser,
	// "deleteUser": deleteUser,
	// "getUsers":   getUsers,
}

func createUser(w http.ResponseWriter, r *http.Request) {
	var u data.User
	if err := decodeBody(r, &u); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	if err := u.Create(); err != nil {
		errorRespons(w, "データの作成に失敗しました"+err.Error())
		return
	}

	u.SetCookie(w)
	u.Password = ""
	singleResponse(w, &u)
}

func checkSession(w http.ResponseWriter, r *http.Request) {
	c, err := r.Cookie("_cookie")
	if err != nil {
		errorRespons(w, "クッキーはありません")
		return
	}

	fmt.Println(r.Header["Cookie"])
	fmt.Println(c.Value)

	u := data.User{Token: c.Value}

	if err = u.GetByToken(); err != nil {
		errorRespons(w, "クッキーに一致するユーザーがいません")
		return
	}

	u.SetToken()
	if err = u.Update(); err != nil {
		errorRespons(w, "トークンの更新に失敗しました")
		return
	}

	u.SetCookie(w)
	u.Password = ""
	singleResponse(w, &u)
}

func getUser(r *http.Request) string {
	u := data.User{ID: 5}
	fmt.Println(u)
	err := u.GetByID()
	if err != nil {
		log.Fatal(err)
		return "失敗"
	}
	fmt.Println(u)
	return "成功"
}

func getUsers(r *http.Request) string {
	us, err := data.GetAll()
	fmt.Println(us)
	if err != nil {
		log.Fatal(err)
		return "失敗"
	}
	return "成功"
}

func updateUser(r *http.Request) string {
	u := data.User{
		ID:       7,
		Name:     "たたら",
		Password: "たたら",
		Token:    "たたら",
	}
	fmt.Println(u)
	err := u.Update()
	if err != nil {
		log.Fatal(err)
		return "失敗"
	}
	fmt.Println(u)
	return "成功"
}

func deleteUser(r *http.Request) string {
	u := data.User{
		ID: 5,
	}
	err := u.Delete()
	if err != nil {
		log.Fatal(err)
		return "失敗"
	}
	return "成功"
}

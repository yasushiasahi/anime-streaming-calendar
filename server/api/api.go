package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

// Handle is functions set which handle apis
var Handle = map[string]func(*http.Request) string{
	"createUser": createUser,
	"getUser":    getUser,
	"updateUser": updateUser,
	"deleteUser": deleteUser,
	"getUsers":   getUsers,
}

func createUser(r *http.Request) string {

	b := readBody(r)
	fmt.Println(b)

	// u := data.User{
	// 	Name:     "なまえ",
	// 	Password: "パスワード",
	// 	Token:    "トークン",
	// }
	// fmt.Println(u)
	// err := u.Create()
	// if err != nil {
	// 	log.Fatal(err)
	// 	return "失敗"
	// }
	// fmt.Println(u)
	return "ユーザーを作成しました"
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

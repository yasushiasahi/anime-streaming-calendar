package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

// Handle is functions set which handel apis
var Handle = map[string]func(*http.Request) string{
	"createUser": createUser,
	"getUser":    getUser,
}

func getUser(r *http.Request) string {
	u := data.User{ID: 1}
	err := u.GetByID()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(u)
	return "成功？？"
}

func createUser(r *http.Request) string {
	u := data.User{
		Name:     "あさひ",
		Password: "damy password",
		Token:    "damy token",
	}
	err := u.Create()
	if err != nil {
		log.Fatal(err)
	}
	return "ユーザーを作成しました"
}

package main

import (
	"fmt"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

func main() {

	data.InitDB()

	server := http.Server{
		Addr: "127.0.0.1:3000",
	}

	http.HandleFunc("/", showReqestPath(sendStaticFiles))
	http.HandleFunc("/api/", showReqestPath(handleAPI))

	fmt.Println("server lisning at localhost:3000")

	server.ListenAndServe()
}

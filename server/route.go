package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/api"
)

func showReqestPath(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Request url: %s\n", r.URL.Path)
		h(w, r)
	}
}

func send404(w http.ResponseWriter) {
	w.WriteHeader(404)
	fmt.Fprintln(w, "404 NOT FOUND")
}

func sendStaticFiles(w http.ResponseWriter, r *http.Request) {
	ps := "./dist"
	rp := r.URL.Path

	if rp == "/" {
		ps += "/index.html"
	} else {
		ps += r.URL.Path
		if _, err := os.Stat(ps); err != nil {
			send404(w)
			return
		}
	}

	bs, err := ioutil.ReadFile(ps)
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		return
	}

	w.Write(bs)
}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	rp := strings.Replace(r.URL.Path, "/api/", "", 1)

	_, ok := api.Handle[rp]
	if !ok {
		send404(w)
		return
	}

	api.Handle[rp](w, r)

}

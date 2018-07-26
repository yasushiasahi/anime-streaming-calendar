package api

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

type singlebody struct {
	OK    bool
	Query data.Row
}

type multiBody struct {
	OK    bool
	Query []data.Row
}

type msgBody struct {
	OK    bool
	Query string
}

func decodeBody(r *http.Request, row data.Row) (err error) {
	d := json.NewDecoder(r.Body)
	for {
		err = d.Decode(&row)
		if err == io.EOF {
			err = nil
			break
		}
		if err != nil {
			log.Fatal(err)
		}
	}
	return
}

func singleResponse(w http.ResponseWriter, r data.Row) {
	b := singlebody{OK: true, Query: r}
	e := json.NewEncoder(w)
	err := e.Encode(b)
	if err != nil {
		log.Fatal(err)
	}
}

func multiResponse(w http.ResponseWriter, rs []data.Row) {
	b := multiBody{OK: true, Query: rs}
	e := json.NewEncoder(w)
	err := e.Encode(b)
	if err != nil {
		log.Fatal(err)
	}
}

func errorRespons(w http.ResponseWriter, msg string) {
	b := msgBody{OK: false, Query: msg}
	e := json.NewEncoder(w)
	err := e.Encode(b)
	if err != nil {
		log.Fatal(err)
	}
}

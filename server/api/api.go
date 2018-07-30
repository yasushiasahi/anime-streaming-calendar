package api

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

// Handle is functions set which handle apis
var Handle = map[string]func(http.ResponseWriter, *http.Request){
	"signin":       signin,
	"login":        login,
	"checkSession": checkSession,
	"getService":   getService,
	"getWorks":     getWorks,
	"getWork":      getWork,
	"addWork":      addWork,
	"addSchedule":  addSchedule,
	"updateWork":   updateWork,
	"getSchedules": getSchedules,
}

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
			return
		}
	}
	return
}

func singleResponse(w http.ResponseWriter, r data.Row) {
	b := singlebody{OK: true, Query: r}
	e := json.NewEncoder(w)
	err := e.Encode(b)
	if err != nil {
		errorRespons(w, "jsonのエンコードに失敗")
	}
}

func errorRespons(w http.ResponseWriter, msg string) {
	b := msgBody{OK: false, Query: msg}
	e := json.NewEncoder(w)
	err := e.Encode(b)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// func multiResponse(w http.ResponseWriter, rs []data.Row) {
// 	b := multiBody{OK: true, Query: rs}
// 	e := json.NewEncoder(w)
// 	err := e.Encode(b)
// 	if err != nil {
// 		errorRespons(w, "jsonのエンコードに失敗")
// 	}
// }

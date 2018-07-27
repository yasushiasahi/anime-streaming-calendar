package api

import (
	"encoding/json"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

type serviceBody struct {
	OK    bool
	Query []data.Service
}

func getService(w http.ResponseWriter, r *http.Request) {
	ss, err := data.GetService()
	if err != nil {
		errorRespons(w, "serviceデータの読み込みに失敗しました")
		return
	}

	b := serviceBody{OK: true, Query: ss}
	e := json.NewEncoder(w)
	err = e.Encode(b)
	if err != nil {
		errorRespons(w, "jsonのエンコードに失敗")
	}
}

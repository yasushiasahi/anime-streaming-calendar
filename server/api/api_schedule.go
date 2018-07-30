package api

import (
	"fmt"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

func addSchedule(w http.ResponseWriter, r *http.Request) {
	sd := data.Schedule{}
	if err := decodeBody(r, &sd); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	fmt.Println("sd= ", sd)

	if err := sd.Create(); err != nil {
		errorRespons(w, "データの保存に失敗しました"+err.Error())
		return
	}

	singleResponse(w, &sd)

}

// func getSchedules(w http.ResponseWriter, r *http.Request) {
// 	wks, err := data.GetWorks()
// 	if err != nil {
// 		errorRespons(w, "作品データの読み込みに失敗しました"+err.Error())
// 		return
// 	}

// 	b := worksBody{OK: true, Query: wks}
// 	e := json.NewEncoder(w)
// 	err = e.Encode(b)
// 	if err != nil {
// 		errorRespons(w, "jsonのエンコードに失敗"+err.Error())
// 	}
// }

package api

import (
	"fmt"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

// type serviceBody struct {
// 	OK    bool
// 	Query []data.Service
// }

func getWork(w http.ResponseWriter, r *http.Request) {
	work := data.Work{}
	if err := decodeBody(r, &work); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	fmt.Println("11", work)

	if err := work.GetByURL(); err != nil {
		errorRespons(w, work.URL+"は登録されていません"+err.Error())
		panic(err.Error())
	}

	fmt.Println("22", work)

	singleResponse(w, &work)

}

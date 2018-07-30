package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

type worksBody struct {
	OK    bool
	Query []data.Work
}

func addWork(w http.ResponseWriter, r *http.Request) {
	wk := data.Work{}
	if err := decodeBody(r, &wk); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	fmt.Println("wk= ", wk)

	if err := wk.Create(); err != nil {
		errorRespons(w, "データの保存に失敗しました"+err.Error())
		return
	}

	singleResponse(w, &wk)
}

func getWork(w http.ResponseWriter, r *http.Request) {
	wk := data.Work{}
	if err := decodeBody(r, &wk); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	if err := wk.GetByURL(); err != nil {
		errorRespons(w, wk.URL+"は登録されていません"+err.Error())
		return
	}

	singleResponse(w, &wk)
}

func getWorks(w http.ResponseWriter, r *http.Request) {
	wks, err := data.GetWorks()
	if err != nil {
		errorRespons(w, "作品データの読み込みに失敗しました"+err.Error())
		return
	}

	b := worksBody{OK: true, Query: wks}
	e := json.NewEncoder(w)
	err = e.Encode(b)
	if err != nil {
		errorRespons(w, "jsonのエンコードに失敗"+err.Error())
	}
}

func updateWork(w http.ResponseWriter, r *http.Request) {
	wk := data.Work{}
	if err := decodeBody(r, &wk); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	if err := wk.Update(); err != nil {
		errorRespons(w, "作品データの更新に失敗しました"+err.Error())
		return
	}

	singleResponse(w, &wk)
}

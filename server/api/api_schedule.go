package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/yasushiasahi/proj/anime-streaming-calendar/server/data"
)

type schedulesBody struct {
	OK    bool
	Query []data.Schedule
}

func addSchedule(w http.ResponseWriter, r *http.Request) {
	sd := data.Schedule{}
	if err := decodeBody(r, &sd); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	if err := sd.Create(); err != nil {
		errorRespons(w, "データの保存に失敗しました"+err.Error())
		return
	}

	singleResponse(w, &sd)

}

func getSchedules(w http.ResponseWriter, r *http.Request) {
	sds, err := data.GetSchedules()
	if err != nil {
		errorRespons(w, "スケジュールデータの読み込みに失敗しました"+err.Error())
		return
	}

	b := schedulesBody{OK: true, Query: sds}
	e := json.NewEncoder(w)
	err = e.Encode(b)
	if err != nil {
		errorRespons(w, "jsonのエンコードに失敗"+err.Error())
	}
}

type schedulesJoinedWorkBody struct {
	OK    bool
	Query []data.WorkJoinedSchedule
}

func getSchedulesJoinedWork(w http.ResponseWriter, r *http.Request) {
	wk := data.Work{}
	if err := decodeBody(r, &wk); err != nil {
		errorRespons(w, "送信データの読み込みに失敗しました"+err.Error())
		return
	}

	wjss, err := data.GetWorkJoinedSchedules(wk.ID)
	if err != nil {
		fmt.Println("エラー", err)
		errorRespons(w, "該当の作品はありません"+err.Error())
		return
	}
	if wjss == nil {
		errorRespons(w, "該当の作品はありません")
		return
	}

	b := schedulesJoinedWorkBody{OK: true, Query: wjss}
	e := json.NewEncoder(w)
	err = e.Encode(b)
	if err != nil {
		errorRespons(w, "jsonのエンコードに失敗"+err.Error())
	}
}

package api

import "net/http"

// Handle is functions set which handel apis
var Handle = map[string]func(*http.Request) string{
	"getData": getData,
	"getHoge": getHoge,
}

func getData(r *http.Request) string {
	return "getDataは未実装です！！もうすぐ出来ますよ！！"
}

func getHoge(r *http.Request) string {
	return "getHogeは未実装です！！もうすぐ出来ますよ！！"
}

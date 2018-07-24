package api

import (
	"net/http"
)

func readBody(r *http.Request) string {
	len := r.ContentLength
	b := make([]byte, len)
	r.Body.Read(b)
	return string(b)
}

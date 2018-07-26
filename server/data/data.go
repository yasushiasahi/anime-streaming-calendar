package data

import (
	"crypto/sha256"
	"database/sql"
	"fmt"
	"io"
	"log"
	// driver for MySQL
	_ "github.com/go-sql-driver/mysql"
)

const salt string = "hogehogehogehogehogehogehogehogehoge"

// Db is database instance
var Db *sql.DB

// Row is type for which stands for sql tables row
type Row interface {
	Create() error
}

// InitDB makes MySQL server connection
func InitDB() {
	var err error
	Db, err = sql.Open("mysql", "root@/anime_streaming_calendar")
	if err != nil {
		log.Fatal(err)
	}
}

func makeHash(str string) (hs string) {
	sha := sha256.New()
	io.WriteString(sha, str+salt)
	hs = fmt.Sprintf("%x", sha.Sum(nil))
	return
}

package data

import (
	"database/sql"
	"log"

	// driver for MySQL
	_ "github.com/go-sql-driver/mysql"
)

// Db is database instance
var Db *sql.DB

// InitDB makes MySQL server connection
func InitDB() {
	var err error
	Db, err = sql.Open("mysql", "root@/anime_streaming_calendar")
	if err != nil {
		log.Fatal(err)
	}

	if err := Db.Ping(); err != nil {
		log.Fatal(err)
	}
}

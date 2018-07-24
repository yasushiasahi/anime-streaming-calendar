package data

import (
	"database/sql"
	"fmt"
	"log"

	// driver for MySQL
	_ "github.com/go-sql-driver/mysql"
)

// InitDB makes MySQL server connection
func InitDB() {
	db, err := sql.Open("mysql", "root@/anime_streaming_calendar")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("select name from users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			log.Fatal(err)
		}
		fmt.Println(name)
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
}

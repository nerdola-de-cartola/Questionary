const Database = require('./config')

const initDatabase = {
    async init() {
        const db = await Database()
        
        await db.exec(`
        CREATE TABLE rooms(
            id INTEGER PRIMARY KEY,
            password TEXT
        )
        `)

        await db.exec(`
        CREATE TABLE questions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INTEGER,
            room INTEGER
        )
        `)

        await db.close
    }
}

initDatabase.init()
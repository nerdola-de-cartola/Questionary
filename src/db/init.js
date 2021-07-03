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
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            description TEXT,
            read INTEGER
        )
        `)

        await db.close
    }
}

initDatabase.init()
const Database = require('../db/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const password = req.body.password
        let roomId
        let isRoom = true
        while (isRoom) {

            // Gera o número da sala
            roomId = Math.floor(Math.random() * 10)

            for (let i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
            }

            // Pega os ids existentes
            const roomsExistIds = await db.all(`
                SELECT id FROM rooms
            `)

            // Verifica se o id já existe
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            // Insere o id no banco de dados se ele for inédito
            if (!isRoom) {

                await db.run(`
                    INSERT INTO rooms (
                        id,
                        password
                    )
                    VALUES (
                        ${parseInt(roomId)},
                        ${password}
                    )
                `)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        let isNoQuestions
        
        const questions = await db.all(`
        SELECT * FROM questions WHERE room = ${roomId} and read = 0
        `)
        const questionsRead = await db.all(`
        SELECT * FROM questions WHERE room = ${roomId} and read = 1
        `)

        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true
            }
        }

        res.render('room', { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions })
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}

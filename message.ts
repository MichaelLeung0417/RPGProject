import express from "express"
import fs from "fs"

export const chat = express.Router()

chat.post('/chat', async (req, res) => {
    let messages;
    try {
        messages = JSON.parse(await fs.promises.readFile('chat.json', 'utf8'))
     } catch (err) {
         console.error(err)
         res.status(500).send('Internal Server Error')
         return
     }
     messages.push({
         text: req.body.chat
     })
     res.end()
    await fs.promises.writeFile('chat.json', JSON.stringify(messages))

})
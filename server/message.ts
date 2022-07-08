import express from "express"
// import http from 'http'
// import { Server } from 'socket.io'
// import { Client } from 'pg'
// import { io, client } from './main'




export const chat = express.Router()


console.log("message.ts");

// io.on('connection', function(socket){
//     console.log('Sever connect to client')
//     socket.on('sendSever', async function(data){

//         client.query(`INSERT INTO text (messages, created_at, updated_at) VALUES ( ${JSON.parse(data).messages}, NOW(), NOW());`)
//         console.log('insert ok')
//         let boardcastMessage = await client.query(`SELECT messages FROM text`)
//         socket.emit('sendClient', JSON.stringify(boardcastMessage))
//         console.log('send to client ok')
//     })
// })

//chat.post()

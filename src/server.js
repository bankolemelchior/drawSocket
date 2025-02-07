import { createServer } from "http";
import express from 'express';

const port = 9100;
const app = express();
const serverHttp = createServer(app)

app.get('/', (req, res) => {
    res.send("Hello socket 🤳😂");
})
serverHttp.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`)
})
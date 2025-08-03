import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from 'url';

let app = express();
let port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({exposedHeaders: "*"}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "codemirror")));
app.use(express.static(path.join(__dirname, "javascript")));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'style')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/", handler);

app.listen(port, () => {
    console.log("Server Started...");
});

async function handler(req, res) {
    try {
        let response;
        const headerData = JSON.parse(req.body.header);
        if (req.body.method == "get" || req.body.method == "head") {
            response = await fetch(req.body.url, {
                method: req.body.method,
                headers: headerData,
            });
        } else {
            const bodyData = JSON.parse(req.body.bodyData);
            response = await fetch(req.body.url, {
                method: req.body.method,
                headers: headerData,
                body: JSON.stringify(bodyData)
            });
        }
        
        if(req.body.method == "head"){
            return res.send("");
        }

        if (!req.body.method == "head" && !response.ok) {
            const errorMessage = response.statusText;
            throw { status: response.status, message: errorMessage };
        }


        const contentType = response.headers.get("Content-Type");

        if (contentType.includes("application/json")) {
            const jsonResponse = await response.json();
            res.json(jsonResponse);
        } else {
            const textResponse = await response.text();
            res.send(textResponse);
        }
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ error: error.message });
    }
}

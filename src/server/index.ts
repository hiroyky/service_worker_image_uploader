import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const app = express();
const upload = multer({dest: "./upload_files"});

app.get("/", async (req, res) => {
    const body = await fs.promises.readFile(path.join(__dirname, "views/index.html"));

    res.header({
        "Content-type": "text/html",
    }).end(body);
} );

app.get("/serviceworker.js", async (req, res) => {
    const js = await fs.promises.readFile(path.join(__dirname, "static/js/serviceworker.js"));

    res.header({
        "Content-type": "application/javascript",
    }).end(js);
});

app.post("/upload", upload.single("upload_image"), (req, res) => {
    console.log("/upload");
    console.log(req.headers);
    console.log(req.body);
    res.end("done");
});

app.use(express.static(path.join(__dirname + "/static")));

app.listen(3000, () => {
    console.log("listen port: 3000");
});

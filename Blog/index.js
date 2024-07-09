import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let T = "";
let S = "";
let b = "";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", {});
});

app.post("/SUBMIT", (req, res) => {
    T = req.body.blogname;
    S = req.body.sub;
    b = req.body.about;
    res.render(__dirname + "/views/about.ejs", {
        Title: T,
        Sub: S
    });
});

app.get("/blogs", (req, res) => {
    res.render(__dirname + "/views/about.ejs", {
        Title: T,
        Sub: S,
        body: b
    });
});

app.get("/view-blog", (req, res) => {
    res.render(__dirname + "/views/ViewBlog.ejs", {
        Title: T,
        Sub: S,
        body: b
    });
});

app.get("/contact", (req, res) => {
    res.render(__dirname + "/views/contact.ejs", {});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

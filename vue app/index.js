const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const PORT = "5000" || process.env.PORT;

const upload = multer(
{
    dest: "./uploads",
});

app.post("/upload", upload.single("file"), (req, res) =>
{
    res.json({ file: req.file });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
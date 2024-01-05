const fs = require('fs');
const path = require('path');
const express = require("express")
const axios = require("axios");
const {readFileSync} = require("fs");

const app = express()

const getImageList = () => {
    const folderPath = './assets/images';
    const validImageExtensions = ['.jpg', '.jpeg', '.png'];
    const files = fs.readdirSync(folderPath);

    return files.filter(file => {
        const extension = path.extname(file).toLowerCase();
        return validImageExtensions.includes(extension);
    })
}
app.get("/list", async (req, res) => {
    const images = getImageList()

    res.json({
        status: true,
        files: images
    })
})

app.get("/random", async (req, res) => {
    try {
        const images = getImageList()

        const imageSize = images.length

        const min = Math.ceil(0);
        const max = Math.floor(imageSize - 1);

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        const file_name = images[randomNumber]

        const image = await readFileSync("./assets/images/" + file_name)

        const base64_image = image.toString("base64")

        res.json({
            status: true,
            data: base64_image
        })
    } catch (e) {
        res.send({
            status: false,
            message: e.toString()
        })
    }
})

app.get("/image/:path")

app.listen(3000, () => {
    console.log("Degawa API is now listen on Port 3000", "http://localhost:3000")
})
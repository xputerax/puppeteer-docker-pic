import express from 'express';
import morgan from 'morgan';
import puppeteer from 'puppeteer';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("combined"))

app.get('/', function (req, res, next) {
    res.json({
        success: true,
    })
})

app.get('/generate', function (req, res, next) {
    puppeteer.launch({ headless: true, executablePath: '/usr/lib/chromium/chrome', args: ['--no-sandbox'] }).then((browser) => {
        browser.newPage().then((page) => {
            page.setContent('<h1>Hello World</h1>').then(() => {
                page.pdf({ printBackground: true }).then((pdfBuffer) => {
                    res.setHeader('Content-Type', 'application/pdf')
                    res.write(pdfBuffer)
                    res.end()
                })
            })
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            success: false,
            error: err
        })
    })
})

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})
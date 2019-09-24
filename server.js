const express = require('express');
const cors = require('cors');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 2000;
const app = express();
const XLSX = require('xlsx');
const DEBUG = process.env.NODE_ENV !== 'production';
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const excelFile = await XLSX.readFile('./TFC Details.xlsx');
    const sheet_name_list = await excelFile.SheetNames;
    const jsonMsg = await XLSX.utils.sheet_to_json(excelFile.Sheets[sheet_name_list[0]])
    await res.json(jsonMsg)
})

app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server started at http://localhost: ${port}`)
});


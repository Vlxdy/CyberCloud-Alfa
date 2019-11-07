require('dotenv').config();
const app = require('./app');
require('./database');
const { getTerminals } = require('./data');
const { getSettings, setSettings} = require('./settings')

async function main() {
    await getSettings();
    await getTerminals();
    setInterval(getTerminals, 500);
    console.log("server on port", app.get('port'));
    setTimeout(()=>app.listen(app.get('port')), 1000);
}

main();

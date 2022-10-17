const fs = require('fs');
fs.readFile('res/multipleChoice.json', 'utf8', (err, data) => {
    if(err) console.error(err);
    const multiChoice = JSON.parse(data);
});

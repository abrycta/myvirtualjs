const fs = require('fs');
fs.readFile('res/matchingType.json', 'utf8', (err, data) => {
    if(err) console.error(err);
    const matchingType = JSON.parse(data);
});

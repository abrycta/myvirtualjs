const fs = require('fs');
fs.readFile('res/matchingType.json', 'utf8', (err, data) => {
    if(err) console.error(err);
    const identify = JSON.parse(data);

    console.log(identify.value);
});

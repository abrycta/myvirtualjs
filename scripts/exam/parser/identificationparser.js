const fs = require('fs');
fs.readFile('res/identification.json', 'utf8', (err, data) => {
    if(err) console.error(err);
    const identify = JSON.parse(data);
    
    // console.log(identify[0].Question);
    // console.log(identify[1].Question);
    // console.log(identify[2].Question);
    // console.log(identify[3].Question);
    // console.log(identify[4].Question);
    // console.log(identify[5].Question);
    // console.log(identify[6].Question);
    // console.log(identify[7].Question);
    // console.log(identify[8].Question);
    // console.log(identify[9].Question);
    // console.log(identify[10].Question);
    // console.log(identify[11].Question);
    // console.log(identify[12].Question);
    // console.log(identify[13].Question);
    // console.log(identify[14].Question); 
});

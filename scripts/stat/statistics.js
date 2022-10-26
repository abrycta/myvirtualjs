const body = document.body
function averageScore(){
    let average = "";
    let avg = sum / scoreArray.length;
    for (i in scores; i < scoreArray.length; i++) {
        average += "Average of Scores:" + names[i] ;
    }
    $("results").value = average;
    }
function highestScoring() {
    let bestStudent = "";
    let highScore = Math.max.apply(Math, scores);
    for (let i in scores) {
        if (scores[i] > highScore) highScore = scores[i];
        bestStudent += names[i] + highScore;
    }
    const div = document.createElement('div')
    div.innerHTML = `
        <h2>Highest Scoring Student</h2>
        <h3>${bestStudent}<h3>
        <h2>Highest Score</h2>
        <h3>score<h3>`
    body.append(div)
    // $("results").value = bestStudent;
    }

function lowestScoring() {
    let lowestStudent = "";
    let lowestScore = Math.min.apply(Math, scores);
    for (let i in scores) {
        if (scores[i] < lowestScore) lowestStudent = scores[i];
        lowestStudent += names[i] + lowestScore;
    }
    const div = document.createElement('div')
    div.innerHTML = `
        <h2>Lowest Scoring Student</h2>
        <h3>${lowestStudent}<h3>
        <h2>Lowest Score</h2>
        <h3>score<h3>`
    body.append(div)
    // $("results").value = lowestStudent;
}

function mostAnsweredQ() {

}

function leastAnsweredQ() {

}
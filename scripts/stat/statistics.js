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
        bestStudent += "Highest Scoring Student = " + names[i] + "\n" + "Highest Score = " + highScore;
    }
    $("results").value = bestStudent;
    }

function lowestScoring() {
    let lowestStudent = "";
    let lowestScore = Math.min.apply(Math, scores);
    for (let i in scores) {
        if (scores[i] < lowestScore) lowestStudent = scores[i];
        lowestStudent += "Lowest Scoring Student = " + names[i] + "\n" + "Lowest Score = " + lowestScore;
    }
    $("results").value = lowestStudent;
}

function mostAnsweredQ() {

}

function leastAnsweredQ() {

}
function averageScore(){
    let average = "";


}
function highestScoring() {
    let bestStudent = "";
    let highScore = Math.max.apply(Math, scores);
    for (let i in scores) {
        if (scores[i] > highScore) highScore = scores[i];
        bestStudent += "High Score Student = " + names[i] + "\n" + "High Score = " + highScore;
    }
    $("results").value = bestStudent;
    }

function lowestScoring() {
    let lowestStudent = "";
    let lowestScore = Math.min.apply(Math, scores);
    for (let i in scores) {
        if (scores[i] < lowestScore) lowestStudent = scores[i];
        lowestStudent += "High Score Student = " + names[i] + "\n" + "High Score = " + highScore;
    }
    $("results").value = lowestStudent;
}

function mostAnsweredQ() {

}

function leastAnsweredQ() {

}
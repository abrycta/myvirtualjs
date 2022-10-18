var i = 0;
var correctCount = 0 ;
//initialize the first question
generateQuestion(0);
function generateQuestion(index){
    document.getElementById("question").innerHTML = data[index].Question;
    document.getElementById("a").innerHTML = data[index].A;
    document.getElementById("b").innerHTML = data[index].B;
    document.getElementById("c").innerHTML = data[index].C;
    document.getElementById("d").innerHTML = data[index].D;
}
function checkAnswer() {
    if (document.getElementById("A").checked && data[i].A == data[i].Answer) {
       correctCount++;
    }
    if (document.getElementById("B").checked && data[i].B == data[i].Answer) {
        correctCount++;
    }
    if (document.getElementById("C").checked && data[i].C == data[i].Answer) {
        correctCount++;
    }
    if (document.getElementById("D").checked && data[i].D == data[i].Answer) {
        correctCount++;
    }
    // increment i for next question
    i++;
    if(data.length-1 < i){
        document.write("*****Your score is : "+correctCount+"*****");
    }
    // callback to generate
    generateQuestion(i);
}
// pre-condition:
// all items must be accomplished

// CHECKER MODULER WRITTEN BY KURT

import {identificationExam, matchingExam, multiChoiceExam} from "./testproper.js";
import {nextPageButton as nextPageIdentification}  from "./identificationExam.js";
import {renderIdentificationItem} from "./identificationExam.js";
function enforceAccomplishedExam(studentSession) {
    let isAccomplished = true   // true if otherwise
    let unaccomplishedIdentificationItems = []
    let unaccomplishedMultiChoiceItems = []
    let unaccomplishedMatchingItems = []
    let tempIndex = 0 // for use with the matchingType Exam checker

    // make sure that all items are answered
    studentSession['identificationAnswers'].forEach((value, key) => {
        // if string is empty, warn
        if (value === "")  {
            isAccomplished = false
            // store the index
            unaccomplishedIdentificationItems.push(key)
        }

        // if answers contain only whitespace, warn
        if (!(/\S/.test(value))) {
            isAccomplished = false
            if(unaccomplishedIdentificationItems.includes(value)) {
                unaccomplishedIdentificationItems.push(key)
            }
        }
    })

    // make sure that all items are answered
    studentSession['multiChoiceAnswers'].forEach((value, key) => {
        if (value === "") {
            unaccomplishedMultiChoiceItems.push(key)
            isAccomplished = false
        }
    })

    // make sure that all items are answered
    matchingExam['questions'].forEach((val) => {
        console.log(val)
        if(!studentSession['matchingAnswers'].has(tempIndex)) {
            unaccomplishedMatchingItems.push(tempIndex)
        }
        tempIndex++
    })

    if (isAccomplished) {
        alert("Your results will now be shown. Afterwards, press the logout button")
    }

    if (!isAccomplished) {
        if (unaccomplishedIdentificationItems.length > 0) {
            alert(`Unaccomplished Identification Items: ${unaccomplishedIdentificationItems.toString()}`)
        }
        if (unaccomplishedMultiChoiceItems.length > 0) {
            alert(`Unaccomplished Multiple Choice Items: ${unaccomplishedMultiChoiceItems.toString()}`)
        }

        if (unaccomplishedMatchingItems.length > 0) {
            alert(`Unaccomplished Matching Type Items: ${unaccomplishedMatchingItems.toString()}`)
        }
        return; // DO NOT CONTINUE
    }

    // Start Checking the Identification Answer
    tempIndex = 0
    identificationExam['questions'].forEach((val) => {
        console.log(val)
        let answer = studentSession['identificationAnswers'].get(tempIndex);
        let isCorrect = answer == val.Answer;
        var value = {
            question: val.Question,
            correct: isCorrect,
            points: isCorrect ? val.Points : 0,
            totalPoints: val.Points,
        };

        studentSession['identificationScore'] = studentSession['identificationScore'] + value.points
        studentSession['totalScore'] = studentSession['totalScore'] +value.points

        studentSession['identificationAnswersCheck'].set(tempIndex, value)
        console.log("IDentification Answers",studentSession['identificationAnswersCheck'])
        tempIndex ++;
    })

    // Start Checking the Multiple Choice Answer
    tempIndex = 0
    multiChoiceExam['questions'].forEach((val) => {
        
        let answer = studentSession['multiChoiceAnswers'].get(tempIndex);
        console.log(answer,val)
        let isCorrect = answer.toLowerCase() == val.answer.toLowerCase();
        var value = {
            question: val.question,
            correct: isCorrect,
            points: isCorrect ? 1 : 0,
            totalPoints: 1,
        };
        
        studentSession['multiChoiceSCore'] = studentSession['multiChoiceSCore'] + value.points
        studentSession['totalScore'] = studentSession['totalScore'] +value.points

        studentSession['multiChoiceAnswersCheck'].set(tempIndex, value)
        console.log("Multiple Choice Answers",studentSession['multiChoiceAnswersCheck'])
        tempIndex ++;
    })

    // Start Checking the Matching Type Answer
    tempIndex = 0
    matchingExam['questions'].forEach((val) => {
        console.log(val)
        let answer = studentSession['matchingAnswers'].get(tempIndex)[0];
        let isCorrect = answer == val.Choice;
        var value = {
            question: val.Answer,
            correct: isCorrect,
            points: isCorrect ? val.Points : 0,
            totalPoints: val.Points,
        };
        studentSession['matchingScore'] = studentSession['matchingScore'] + value.points
        studentSession['totalScore'] = studentSession['totalScore'] +value.points

        studentSession['matchingAnswersCheck'].set(tempIndex, value)
        console.log("Matching Answers",studentSession['matchingAnswersCheck'])
        tempIndex ++;
    })

    studentSession['finished'] = true;
    

    // render identification
    document.body.innerHTML = '';
    identificationExam['questions'].forEach((item) => {
        renderIdentificationItem(item,
            identificationExam['questions'].indexOf(item))
    })

    let aggregatedExamStatistics = new Map(JSON.parse(localStorage.getItem('aggregatedExamStatistics')))
    if (aggregatedExamStatistics == null){
        aggregatedExamStatistics = new Map();
    }

    // scores are computed through studentSession Objects
    // Clone the current studentSession object
    // to make sure that a copy is manipulated
    // for further safety

    let studentSessionClone = Object.assign({}, studentSession)

    // store the results of a session into the localstorage
    // as most results are in the form of a map, we need to call
    // Array.from to convert map entries into arrays before stringifying the JSON
    // because Map objects cannot be stringified into JSON objects
    studentSessionClone.identificationAnswers = JSON.stringify(Array.from(studentSession.identificationAnswers.entries()) )
    studentSessionClone.matchingAnswers = JSON.stringify(Array.from(studentSession.matchingAnswers.entries()) )
    studentSessionClone.multiChoiceAnswers = JSON.stringify(Array.from(studentSession.multiChoiceAnswers.entries()) )

    studentSessionClone.identificationAnswersCheck = JSON.stringify(Array.from(studentSession.identificationAnswersCheck.entries()) )
    studentSessionClone.matchingAnswersCheck = JSON.stringify(Array.from(studentSession.matchingAnswersCheck.entries()) )
    studentSessionClone.multiChoiceAnswersCheck = JSON.stringify(Array.from(studentSession.multiChoiceAnswersCheck.entries()) )

    aggregatedExamStatistics.set(studentSession['name'], JSON.stringify(studentSessionClone))

    // store into local storage
    localStorage.setItem("aggregatedExamStatistics", JSON.stringify(Array.from(aggregatedExamStatistics.entries())));
    nextPageIdentification()
}

export {enforceAccomplishedExam}
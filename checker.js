// pre-condition:
// all items must be accomplished

import {matchingExam} from "./testproper.js";


function enforceAccomplishedExam(studentSession) {
    let isAccomplished = true   // true if otherwise
    let unaccomplishedIdentificationItems = []
    let unaccomplishedMultiChoiceItems = []
    let unaccomplishedMatchingItems = []
    let tempIndex = 0 // for use with the matchingType Exam checker
    // checker for identification
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

    // checker for multiple choice
    studentSession['multiChoiceAnswers'].forEach((value, key) => {
        if (value === "") {
            unaccomplishedMultiChoiceItems.push(key)
            isAccomplished = false
        }

    })

    console.log(matchingExam)
    console.log(studentSession['matchingAnswers'])

    matchingExam['questions'].forEach((val) => {
        console.log(val)
        if(!studentSession['matchingAnswers'].has(tempIndex)) {
            unaccomplishedMatchingItems.push(tempIndex)
        }
        tempIndex++
    })

    if (!isAccomplished) {
        if (unaccomplishedIdentificationItems.length > 0) {
            alert(`Unaccomplished Identification Items: ${unaccomplishedIdentificationItems.toString()}`)
        }
        if (unaccomplishedMultiChoiceItems.length > 0) {
            alert(`Unaccomplished Multiple Choice Items: ${unaccomplishedMultiChoiceItems.toString()}`)
        }

        if (unaccomplishedMatchingItems.length > 0) {
            alert(`Unaccomplished Matching Type Items: ${unaccomplishedMultiChoiceItems.toString()}`)
        }

    }
}

export {enforceAccomplishedExam}
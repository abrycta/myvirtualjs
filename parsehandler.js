import {JSONHandler} from "./jsonparser.js";
import {matchingPart, multiChoicePart, identificationPart} from "./scripts/exam/exammodel.js";

export function parse(file) {
    let tempPart = parseJSON(file)
    switch (tempPart.type) {
        case 'multi-choice':
            multiChoicePart = tempPart
            break
        case 'matching':
            matchingPart = tempPart
            break
        default:
            identificationPart = tempPart
            break
    }
}
const matchingExam = JSON.parse(localStorage.getItem('matchingExam'))
const body = document.body

const renderMatchingItem = (item, index) => {
    const htmlItem = document.createElement('div2')

    // FOR DRAG AND DROP
    // function handleDrag(event){
    //
    // }
    // function handleDrop(event){
    //
    // }
    // const items =

    htmlItem.innerHTML=`
        <h3>${item.Answer}</h3>
        <input type = "drop" id = drop_${index} />
    `
    body.append(htmlItem)
}

const renderChoice = (item, index) => {
    const choiceItem = document.createElement('div1')
    choiceItem.innerHTML=`
        <h2 class="box" draggable="true">${item.Choice}</h2>
    `
    body.append(choiceItem)
}

function returnButton() {
    const returnPage = document.createElement('button')
    returnPage.innerText = "Return"
    returnPage.addEventListener('click', () => {
        window.location.href = "./testproper.html"
    })
    body.append(returnPage)
}

function matchingTypeExam() {
    console.log(matchingExam.questions)
    // start matching type exam

    matchingExam['questions'].forEach((item) => {
        renderMatchingItem(item,
            matchingExam['questions'].indexOf(item))
    })

    matchingExam['questions'].forEach((item) => {
        renderChoice(item,
            matchingExam['questions'].indexOf(item))
    })


    returnButton()
}

matchingTypeExam()
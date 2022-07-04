//Script for the functions of calculator

//Global variables to record the calculation status 
let currentNumber = 0
let numberStack = []
let operationStack = []
let previousAction = null

// Detect the click event for the buttons then call relevant functions.
const keys = document.querySelector('.calculator-grid')
const display = document.querySelector('.output')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = keys.dataset.previousKeyType
    //input numbers
    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent
        } else {
        display.textContent = displayedNum + keyContent
        }
        keys.dataset.previousKeyType = 'number'
    }
    //decimal button
    if ((action === 'decimal') && (!Array.from(displayedNum).includes('.'))) {
        display.textContent = displayedNum + '.'
      }
    //delete button 
    if (action === 'delete'){
      display.textContent = deleteNumber(displayedNum)
    }
    //all clear button
    if (action === 'all-clear'){
      display.textContent = clearNumber(displayedNum)
    }
    //operator buttons (+-*/%√) using stack
    if (action === 'add' || action === 'minus' || action === 'multiply' || 
        action === 'divide' || action === 'mod' || action === 'root-square') {
      currentNumber = (parseFloat(displayedNum))
      numberStackBuild(currentNumber)
      keys.dataset.previousKeyType = 'operator'
      //operators of */%√ are with higher priority, calculated first 
      if(previousAction === 'multiply' || previousAction === 'divide' ||
      previousAction === 'mod' || previousAction === 'root-square'){
        calculation(numberStack, previousAction)
        operationStack.pop()
      }
      previousAction = action
      operatorStackBuild(action)
    } 
    //equals button
    if (action === 'equals') {
      currentNumber = (parseFloat(displayedNum))
      numberStackBuild(currentNumber)
      keys.dataset.previousKeyType = 'operator'
      previousAction = action
      let steps = operationStack.length
      for(let i = 0; i < steps; i++){
        calculation(numberStack, operationStack.pop())
      }
      display.textContent = numberStack.pop()
    }
  }
})


// Function as backspace
function deleteNumber(number){
  let updatedNumber = number
  if(updatedNumber.length==1){
    updatedNumber = "0"
  }
  else{
    updatedNumber = number.slice(0, -1)
  }
  return updatedNumber
}

// Function for resetting the calculator
function clearNumber(number){
  numberStack = []
  operationStack = []
  return '0'
}

// Function for building the number stack list
function numberStackBuild(number){
  numberStack.push(number)
}

// Function for building the operator stack list
function operatorStackBuild(operator){
  operationStack.push(operator)
}

// Function for the operations of +-*/%√
function calculation(numberStack, action){
  if (action == 'add'){
    let result = numberStack.pop() + numberStack.pop()
    numberStack.push(result)
  }
  if (action == 'minus'){
    let result = numberStack.pop() - numberStack.pop()
    numberStack.push(-(result))
  }
  if (action == 'multiply'){
    let result = numberStack.pop() * numberStack.pop()
    numberStack.push(result)
  }
  if (action == 'divide'){
    let divisor = numberStack.pop()
    let divident = numberStack.pop()
    let result = divident / divisor
    numberStack.push(result)
  }
  if (action == 'mod'){
    let divisor = numberStack.pop()
    let divident = numberStack.pop()
    numberStack.push(divident % divisor)
  }
  if (action == 'root-square'){
    let result = Math.sqrt(numberStack.pop())
    numberStack.push(result)
  }
}











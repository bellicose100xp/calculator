import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

const perfromArithmaticOperation = (prevNumStr, currNumStr, operation) => {
  const [prevNum, currNum] = [Number(prevNumStr), Number(currNumStr)]
  switch (operation) {
    case "+":
      return prevNum + currNum
    case "-":
      return prevNum - currNum
    case "÷":
      return prevNum / currNum
    case "*":
      return prevNum * currNum
    default:
      console.error(`'${operation}' is invalid arithmatic operation`)
  }
}

const reducer = (state, { type, payload }) => {

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      if (payload.digit !== "0" && state.currentOperand === "0") {
        state.currentOperand = ""
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      switch (payload.operation) {
        case '+':
          return {
            ...state,
            operation: payload.operation,
            previousOperand: perfromArithmaticOperation(state.previousOperand, state.currentOperand, state.operation),
            currentOperand: null,
          }

        case '-':
          return {
            ...state,
            operation: payload.operation,
            previousOperand: perfromArithmaticOperation(state.previousOperand, state.currentOperand, state.operation),
            currentOperand: null,
          }

        case '*':
          return {
            ...state,
            operation: payload.operation,
            previousOperand: perfromArithmaticOperation(state.previousOperand, state.currentOperand, state.operation),
            currentOperand: null,
          }

        case '÷':
          return {
            ...state,
            operation: payload.operation,
            previousOperand: perfromArithmaticOperation(state.previousOperand, state.currentOperand, state.operation),
            currentOperand: null,
          }

        default:
          console.error(`'${payload.operation}' is not handled in reducer()`)
      }
      break

    case ACTIONS.EVALUATE:

      if (state.previousOperand == null) return state
      return {
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: perfromArithmaticOperation(state.previousOperand, state.currentOperand, state.operation)
      }

    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: null
      }

    default:
      console.error(`action.type: '${type}' didn't match any actions in reducer()`)
      return state
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {}) // initial state is empty {}


  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation} </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>

      <OperationButton operation="÷" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperationButton operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />

      <OperationButton operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;

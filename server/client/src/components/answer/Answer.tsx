/////////// IMPORTS
///
import { useEffect } from "react"
import { FC, useState } from "react"
import classes from "./Answer.module.css"
///
/////////// Types
///
interface AnswerProps {
  answer: {
    value: string
    letter: string
  }
  clickOnAnswer: Function
  currentPOS: string
  answerSelected: boolean
  progress: number
  toggleRetry: boolean
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Answer: FC<AnswerProps> = ({
  answer,
  clickOnAnswer,
  currentPOS,
  answerSelected,
  progress,
  toggleRetry,
}) => {
  /////////// VARIABLES
  ///
  const [interactingClass, interactingClassUpdater] = useState("")
  ///
  /////////// CUSTOM HOOKS
  ///
  /*--- ⬇️ reset "interactingClass" whenever progress is made or retry is clicked ---*/
  useEffect(() => {
    interactingClassUpdater("")
  }, [progress, toggleRetry])
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  /*--- ⬇️ handling answer click to pass data to parent and to update interactingClass state conditionally ---*/
  const answerClickHandler = () => {
    /*--- ⬇️ pass answer value to the parent ---*/
    clickOnAnswer(answer.value)

    if (!answerSelected) {
      currentPOS === answer.value
        ? interactingClassUpdater(classes.rightAnswer)
        : interactingClassUpdater(classes.wrongAnswer)
    }
  }

  ///
  /////////// FUNCTIONS
  ///
  ///
  return (
    <li
      onClick={answerClickHandler}
      className={`${classes.answer} ${
        answerSelected ? classes.clicked : ""
      } ${interactingClass} darkGrayBoldSolidBorder centerFlexY`}
    >
      <span className={`${classes.answer__letter} darkGrayBoldSolidBorder`}>
        {answer.letter}
      </span>
      <p className={`${classes.answer__value} capitalize`}>{answer.value}</p>
    </li>
  )
}

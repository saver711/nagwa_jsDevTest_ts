/////////// IMPORTS
///

import { wordsType } from "../../App"
import classes from "./Question.module.css"
///
/////////// Types
///

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Question = ({ qs }: { qs: wordsType }) => {
  /////////// VARIABLES
  ///
  const word = qs?.word
  const sentence = qs?.sentence
  const sentence_1 = sentence?.slice(0, sentence.indexOf(word))
  const sentence_2 = sentence?.slice(sentence.indexOf(word) + word.length)

  ///
  /////////// CUSTOM HOOKS
  ///

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

  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className={`${classes.qsBox} blackBoldBorder`}>
      <p className={`centerText`}>
        {sentence_1}
        <span>{word}</span>
        {sentence_2}
      </p>
    </div>
  )
}

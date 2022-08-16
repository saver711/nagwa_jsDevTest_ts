/////////// IMPORTS
///

import classes from "./Question.module.css"
///
/////////// Types
///
interface QuestionProps {
  qs: {
    word: string
    id: number
    pos: string
    sentence: string
  }
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Question = ({ qs }: QuestionProps) => {
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

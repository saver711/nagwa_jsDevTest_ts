/* 👀 Some differences from last time 
1- Better implementation of Typescript
--- eg: FC was removed because:
------ *children props were implicitly added
------ *Generic Type was not supported on children
2- added "result" mode for better app state control
2- Enhanced "reset text functionality" when the user leaves the test page
--- the feature only works in "test mode" (Neither in "start" nor "result")
*/
/////////// IMPORTS
///
import classes from "./App.module.css"
/* (ICONS) */
import { IoMdDoneAll } from "react-icons/io"
import { BsArrowCounterclockwise } from "react-icons/bs"

/* toastify */
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useState, useEffect } from "react"
import useFetch from "./hooks/useFetch"
import { Start } from "./components/start/Start"
import { Progress } from "./components/progress/Progress"
import { Question } from "./components/question/Question"
import { Answer } from "./components/answer/Answer"
import { MainButton } from "./components/UI/mainButton/MainButton"
import { Modal } from "./components/UI/modal/Modal"
import { Rank } from "./components/rank/Rank"
import { Button } from "./components/UI/buton/Button"

///
/////////// Types
///
interface wordsType {
  id: number
  word: string
  pos: string
  sentence: string
}
export type Modes = "test" | "start" | "result"
/////////// HELPER VARIABLES & FUNCTIONS
///

const answersList = [
  {
    value: "noun",
    letter: "A",
  },
  {
    value: "adverb",
    letter: "B",
  },
  {
    value: "adjective",
    letter: "C",
  },
  {
    value: "verb",
    letter: "D",
  },
]
///
export const App = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: words,
    error,
    loading,
    refetch,
  } = useFetch<wordsType[]>(`${process.env.REACT_APP_SERVER}/words`)


  const wordsLength = words.length

  ///
  /////////// STATES
  ///
  const [mode, modeUpdater] = useState<Modes>("start")
  const [rightAnswers, rightAnswersUpdater] = useState(0)
  const [wrongAnswers, wrongAnswersUpdater] = useState(0)
  const [progress, progressUpdater] = useState(0)
  const [autoNext, autoNextUpdater] = useState(false)
  const [answerSelected, answerSelectedUpdater] = useState(false)
  const [toggleRetry, toggleRetryUpdater] = useState(true)
  const [modalVisibility, modalVisibilityUpdater] = useState(false)
  const [feedback, feedbackUpdater] = useState({ shown: false, value: false })

  const didntReachEnd = progress < wordsLength!

  ///
  /////////// SIDE EFFECTS
  ///

  /*--- ⬇️ hide autoNext feedback ---*/
  useEffect(() => {
    let counter: ReturnType<typeof setTimeout>
    if (feedback.shown) {
      counter = setTimeout(() => {
        feedbackUpdater((prev) => {
          return { ...prev, shown: false }
        })
      }, 1200)
    }

    return () => clearTimeout(counter)
  }, [feedback])

  /*--- ⬇️ next question (automatically) ---*/
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (answerSelected && autoNext) {
      timer = setTimeout(() => {
        progressUpdater((prev) => prev + 1)
        answerSelectedUpdater(false)
      }, 700)
    }

    return () => clearTimeout(timer)
  }, [answerSelected, autoNext])

  /*--- ⬇️ show result modal  ---*/
  useEffect(() => {
    if (wordsLength - progress === 0 && mode === "test") {
      modalVisibilityUpdater(!didntReachEnd)
      modeUpdater("result")
    }
  }, [didntReachEnd, mode])

  /*--- ⬇️ reset the test if the user leaves test tab ---*/
  useEffect(() => {
    if (mode === "test") {
      window.addEventListener("blur", resetTest)
    }

    return () => {
      window.removeEventListener("blur", resetTest)
    }
  }, [mode])

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const resetTest = () => {
    modeUpdater("start")
    rightAnswersUpdater(0)
    wrongAnswersUpdater(0)
    answerSelectedUpdater(false)
    progressUpdater(0)
    refetch({})
  }

  const skipHandler = () => {
    if (didntReachEnd && !answerSelected) {
      progressUpdater((prev) => prev + 1)
    }
  }

  const toggleAutoNext = () => {
    autoNextUpdater((prev) => !prev)
    feedbackUpdater((prev) => {
      return { value: !prev.value, shown: true }
    })
  }

  /*--- ⬇️ handling answer click ---*/
  const answerHandler = (answer: string) => {
    if (!answerSelected) {
      if (words[progress].pos === answer) {
        rightAnswersUpdater((prev) => prev + 1)
      } else {
        wrongAnswersUpdater((prev) => prev + 1)
      }
      answerSelectedUpdater(true)
    }
  }

  /*--- ⬇️ continue button ---*/
  const ProceedHandler = () => {
    if (!answerSelected) {
      toast.error(
        "Don't force me to hide this button until you choose an answer! 😃",
        {
          position: "top-center",
          autoClose: 2200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      return
    }

    progressUpdater((prev) => prev + 1)
    answerSelectedUpdater(false)
  }

  /*--- ⬇️ retry button ---*/
  const retryHandler = () => {
    refetch({})
    rightAnswersUpdater(0)
    wrongAnswersUpdater(0)
    progressUpdater(0)
    answerSelectedUpdater(false)
    toggleRetryUpdater((prev) => !prev)
    modalVisibilityUpdater(false)
    modeUpdater("test")
  }

  ///
  /////////// FUNCTIONS
  ///

  /// RETURN conditionally
  if (mode === "start") {
    return <Start modeUpdateHandler={modeUpdater} />
  }
  if (mode === "test") {
    return (
      <>
        <section className={`${classes.test}`}>
          <div className={`${classes.top} centerMargin centerFlexY`}>
            <Button
              onClick={resetTest}
              className={`textBtn dangerColor capitalize`}
            >
              Cancel
            </Button>

            <Progress progress={progress} wordsLength={wordsLength} />

            {didntReachEnd ? (
              <Button
                onClick={skipHandler}
                className={`textBtn darkColor capitalize ${
                  answerSelected ? "disabled" : ""
                }`}
              >
                Skip
              </Button>
            ) : (
              <div className={`${classes.top__icon}`}>
                <IoMdDoneAll />
              </div>
            )}
          </div>

          {/* exam sheet */}
          {didntReachEnd && (
            <div
              className={`${classes.sheet} centerMargin boxy blackBoldBorder`}
            >
              <div className={`${classes.sheet__header}`}>
                <div className={`${classes.auto}`}>
                  <div className={`centerFlexY`}>
                    <input
                      type="checkbox"
                      className={`d-none`}
                      name="toggle"
                      id="toggle"
                      defaultChecked={feedback.value}
                    />
                    <label htmlFor="toggle" onClick={toggleAutoNext}>
                      <span className={`${classes.auto__circle}`}></span>
                    </label>

                    {feedback.shown && (
                      <div
                        className={`feedback right ${
                          feedback.value ? "successColor" : "dangerColor"
                        }`}
                      >
                        Auto Next is{feedback.value ? " On" : " Off"}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className={`centerText`}>Choose Correct POS</h3>
              </div>

              <Question qs={words[progress]} />

              <ul className={`${classes.answers}`}>
                {answersList.map((answer, i) => (
                  <Answer
                    clickOnAnswer={answerHandler}
                    currentPOS={words[progress].pos}
                    answerSelected={answerSelected}
                    toggleRetry={toggleRetry}
                    progress={progress}
                    key={i}
                    answer={answer}
                  />
                ))}
              </ul>
            </div>
          )}

          <div className={`${classes.btns} centerFlex`}>
            {!autoNext && didntReachEnd && (
              <MainButton
                type="primary"
                text="Continue"
                clickHandler={ProceedHandler}
              />
            )}
            <MainButton
              type="transparent"
              icon={<BsArrowCounterclockwise />}
              text="Retry"
              clickHandler={retryHandler}
            />
          </div>
        </section>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    )
  }
  if (mode === "result") {
    return (
      <>
        <section className={`${classes.test}`}>
          <div className={`${classes.top} centerMargin centerFlexY`}>
            <Button
              onClick={resetTest}
              className={`textBtn dangerColor capitalize`}
            >
              Cancel
            </Button>

            <Progress progress={progress} wordsLength={wordsLength} />

            {didntReachEnd ? (
              <Button
                onClick={skipHandler}
                className={`textBtn darkColor capitalize ${
                  answerSelected ? "disabled" : ""
                }`}
              >
                Skip
              </Button>
            ) : (
              <div className={`${classes.top__icon}`}>
                <IoMdDoneAll />
              </div>
            )}
          </div>

          <div className={`${classes.btns} centerFlex`}>
            {!didntReachEnd && (
              <MainButton
                type="primary"
                text="Result"
                clickHandler={() => modalVisibilityUpdater(true)}
              />
            )}

            <MainButton
              type="transparent"
              icon={<BsArrowCounterclockwise />}
              text="Retry"
              clickHandler={retryHandler}
            />
          </div>
        </section>

        {!didntReachEnd && modalVisibility && (
          <Modal modalVisibilityUpdater={modalVisibilityUpdater}>
            <Rank
              retryHandler={retryHandler}
              rightAnswers={rightAnswers}
              wrongAnswers={wrongAnswers}
              wordsLength={wordsLength}
            />
          </Modal>
        )}
      </>
    )
  }
  return <></>
}

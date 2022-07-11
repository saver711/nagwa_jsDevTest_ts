/////////// IMPORTS
///
import classes from "./Rank.module.css"
import useFetch from "../../hooks/useFetch"
import { FC, useCallback, useRef } from "react"
import downloadjs from "downloadjs"
import html2canvas from "html2canvas"
import { BsArrowCounterclockwise, BsCloudDownload } from "react-icons/bs"
import { Button } from "../UI/button/Button"

///
/////////// Types
///
interface RankProps {
  rightAnswers: number
  wrongAnswers: number
  wordsLength: number
  retryHandler: React.MouseEventHandler<HTMLButtonElement>
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Rank: FC<RankProps> = ({
  rightAnswers,
  wrongAnswers,
  wordsLength,
  retryHandler,
}) => {
  /////////// VARIABLES
  ///
  /*--- ⬇️ i will use this to handle capturing and downloading result image ---*/
  const resultElement = useRef<HTMLDivElement>(null!)
  const sentScore = (rightAnswers / wordsLength) * 100
  const skippedAnswers = wordsLength - (rightAnswers + wrongAnswers)
  const passed = rightAnswers >= wordsLength / 2
  ///
  /////////// CUSTOM HOOKS
  ///
  const {
    data: rank,
    error,
    loading,
    refetch,
  } = useFetch(`${process.env.REACT_APP_SERVER}/rank`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score: sentScore }),
  })

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
  /*--- ⬇️ capturing and downloading result image ---*/
  const handleCaptureClick = useCallback(async () => {
    const canvas = await html2canvas(resultElement.current)
    const dataURL = canvas.toDataURL("image/png")
    downloadjs(dataURL, "Test Result.png", "image/png")
  }, [])
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div>
      <div ref={resultElement} className={`${classes.main}`}>
        <div className={`${classes.main__img}`}>
          {passed ? (
            <img
              className={`centerMargin`}
              src={require("../../assets/imgs/success.png")}
              alt="success"
            />
          ) : (
            <img
              className={`centerMargin`}
              src={require("../../assets/imgs/tryAgain.png")}
              alt="try again"
            />
          )}
        </div>

        <h3
          className={`${classes.main__text} ${
            passed ? classes.success : classes.tryAgain
          } capitalize centerText`}
        >
          <p>Rank: {rank}%</p>
          {passed ? `congratulations!` : `try again!`}
        </h3>

        <ul className={`${classes.statics} centerFlex`}>
          <li
            className={`centerFlex centerText ${classes.statics__item} ${classes.success}`}
          >
            <span>{rightAnswers}</span>
            <span className={`capitalize`}>right answers</span>
          </li>
          <li
            className={`centerFlex centerText ${classes.statics__item} ${classes.tryAgain}`}
          >
            <span>{wrongAnswers}</span>
            <span className={`capitalize`}>wrong answers</span>
          </li>
          <li
            className={`centerFlex centerText ${classes.statics__item}`}
          >
            <span>{skippedAnswers}</span>
            <span className={`capitalize`}>skipped answers</span>
          </li>
        </ul>
      </div>

      <div className={`centerFlex`}>
        <>
          <Button
            type="primary"
            icon={<BsCloudDownload />}
            text="Download"
            clickHandler={handleCaptureClick}
          />
          <Button
            type="transparent"
            icon={<BsArrowCounterclockwise />}
            text="Retry"
            clickHandler={retryHandler}
          />
        </>
      </div>
    </div>
  )
}

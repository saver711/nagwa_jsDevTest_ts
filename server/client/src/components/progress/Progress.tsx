/////////// IMPORTS
///
import { FC } from "react"
import classes from "./Progress.module.css"
///
/////////// Types
///
interface progressProps {
  progress: number
  wordsLength: number
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Progress: FC<progressProps> = ({ progress, wordsLength }) => {
  /////////// VARIABLES
  ///
  const progressPercentage = Math.round((progress / wordsLength) * 100)
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
    <div className={`${classes.progress}`}>
      <div
        style={{
          width: `${!progress ? "0px" : `calc(${progressPercentage}% + 5px)`}`,
        }}
        className={`${classes.progress__bar} ${
          progress ? "blackBoldBorder" : ''
        }`}
      ></div>

      <div className={`${classes.progress__num}`}>
        <span
          style={{
            color: `${progress < 1 ? "var(--redish)" : "var(--greenish)"}`,
          }}
          className={`${classes.progress__step}`}
        >
          {progress}
        </span>
        /<span>{wordsLength}</span>
      </div>
    </div>
  )
}

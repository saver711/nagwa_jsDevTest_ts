/////////// IMPORTS
///
import React from "react"
import { Modes } from "../../App"
import { MainButton } from "../UI/mainButton/MainButton"
import classes from "./Start.module.css"
///
/////////// Types
///
interface StartProps {
  modeUpdateHandler: React.Dispatch<React.SetStateAction<Modes>>
}
/////////// HELPER VARIABLES & FUNCTIONS
///
const testInfo = {
  name: "part of speech",
  description:
    "A traditional class of words (such as adjectives, adverbs, nouns, and verbs) distinguished according to the kind of idea denoted and the function performed in a sentence.",
  img: require("../../assets/imgs/study.png"),
}
///
export const Start = ({ modeUpdateHandler }: StartProps) => {
  /////////// VARIABLES
  ///

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
  const clickHandler = () => modeUpdateHandler("test")
  ///
  return (
    <>
      <section className={`${classes.start}`}>
        <div className={`${classes.start__top} centerText`}>
          <h2 className="uppercase">Test</h2>
          <h1 className="capitalize">{testInfo.name}</h1>
        </div>

        <div className={`${classes.box} boxy blackBoldBorder centerMargin`}>
          <h4
            className={`${classes.box__definition} blackBoldBorder capitalize`}
          >
            definition
          </h4>

          <h2 className={`capitalize`}>{testInfo.name}</h2>

          <p className={`${classes.box__mainText}`}>{testInfo.description}</p>

          <img className={classes.box__img} src={testInfo.img} alt="study" />
        </div>

        <div className={`centerFlexX`}>
          <MainButton clickHandler={clickHandler} type="primary" text="Start" />
        </div>

        <p className={`${classes.start__note} centerText centerMargin`}>
          Note: Once you click on START, Don't leave test page or the test will
          be cancelled.
        </p>
      </section>
    </>
  )
}

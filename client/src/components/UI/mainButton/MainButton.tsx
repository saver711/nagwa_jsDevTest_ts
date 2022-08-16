/////////// IMPORTS
///
import classes from "./Button.module.css"
///
/////////// Types
///
interface ButtonProps {
  type: "primary" | "transparent"
  icon?: React.ReactNode
  text: string
  clickHandler: React.MouseEventHandler<HTMLButtonElement>
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const MainButton= ({ type, icon, text, clickHandler }: ButtonProps) => {
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

  ///
  return (
    <button
      onClick={clickHandler}
      className={`${classes.button} blackBoldBorder
      ${
        type === "primary"
          ? classes.primary
          : type === "transparent"
          ? classes.transparent
          : ""
      }
      btnClickTop uppercase`}
    >
      {icon && <div className={`${classes.button__icon}`}>{icon}</div>}
      <span>{text}</span>

      <div className={classes.ticks}>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
        <div className={classes.button__spots}></div>
      </div>
    </button>
  )
}

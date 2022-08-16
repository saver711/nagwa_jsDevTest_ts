/////////// IMPORTS
///
import {
  ButtonHTMLAttributes,
  ReactNode,
} from "react"
// import classes from './Button.module.css'
///
/////////// Types
///
interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Button = ({ children, ...props }: buttonProps) => {
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
  return <button {...props}>{children}</button>
}

/////////// IMPORTS
///
import classes from "./Modal.module.css"
import { createPortal } from "react-dom"
import React, { FC } from "react"
import { useEffect, useRef } from "react"
import { ImCross } from "react-icons/im"

///
/////////// HELPER VARIABLES & FUNCTIONS
///
const portalElement = document.getElementById("overlay") as HTMLElement

interface ModalProps {
  modalVisibilityUpdater: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}
///
export const Modal: FC<ModalProps> = ({ children, modalVisibilityUpdater }) => {
  /////////// VARIABLES
  ///
  /*--- ⬇️ i will use it to handle clicking outside this element ---*/
  const contentRef = useRef<HTMLDivElement>(null)
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///
  /*--- ⬇️ close modal with keyboard Escape key ---*/
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      e.key === "Escape" && modalVisibilityUpdater(false)
    }
    window.addEventListener("keydown", close)

    return () => window.removeEventListener("keydown", close)
  }, [modalVisibilityUpdater])

  /*--- ⬇️ handling click outside the modal ---*/
  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      assertIsNode(target)
      if (contentRef.current && !contentRef.current.contains(target)) {
        hideModalHandler()
      }
    }
    // ⬇️ Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // ⬇️ Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const hideModalHandler = () => {
    modalVisibilityUpdater(false)
  }
  ///
  /////////// FUNCTIONS
  ///
  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !("nodeType" in e)) {
      throw new Error(`Node expected`)
    }
  }
  ///
  return (
    <>
      {createPortal(
        <div className={`${classes.modal}`}>
          <div ref={contentRef} className={`${classes.content} centerMargin`}>
            {children}
            <div
              onClick={hideModalHandler}
              className={`${classes.content__close}`}
            >
              <ImCross />
            </div>
          </div>
        </div>,
        portalElement
      )}
    </>
  )
}

import React from 'react'

const Modal = ({showModal, hideModal, children}) => {
  return (
    showModal && (
        <div className="modalBackground" >
            <div className="modalContainer">
                {children}
            </div>
        </div>
    )
  )
}

export default Modal

import React, { Fragment } from 'react'
const Loader = ({loading}) => {
  return (
    <Fragment>
        <div className="loader"></div>
        <p 
            style={{textAlign: "center", color: "red"}}>
            {loading}
        </p>
    </Fragment>
  )
}

export default Loader

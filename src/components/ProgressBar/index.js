import React, { Fragment } from 'react'

const ProgressBar = (props) => {
  const {idQuestion, maxQuestions} = props
  const progress = (100 / maxQuestions)* (idQuestion + 1)
  return (
    <Fragment>
        <div className="percentage">
            <div className="progressPercent">Question : {`${idQuestion + 1}/${maxQuestions}`}</div>
            <div className="progressPercent">Progression : {`${progress}%`}</div>
        </div>

        <div className="progressBar">
            <div className='progressBarChange' style={{width: `${progress}%`}}>  </div>
        </div>
    </Fragment>

  )
}

export default ProgressBar

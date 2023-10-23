import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'
const Levels = (props) => {
  const {levelNames, quizLevel} = props
  const [quizStep, setQuizstep] = useState([])
  useEffect(()=>{
    setQuizstep(levelNames.map(level => ({title: level.toUpperCase()})))
  }, [levelNames])


  return (
    <div className="levelsContainer" style={{background: "transparent"}}>
      <Stepper steps={ quizStep
      } 
      activeStep={ quizLevel }
      circleTop={0} 
      activeTitleColor={'#d31017'}
      activeColor= {'#d31017'}
      completeTitleColor = {'#E0E0E0'}
      defaultTitleColor= {'#E0E0E0'}
      completeColor = {'#E0E0E0'}
      completeBarColor = {'#E0E0E0'}
      barStyle = {'dashed'}
      size = {45}
      circleFontSize ={20}
      />
    </div>
  )
}

export default React.memo(Levels)

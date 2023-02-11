import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './PopularQuestions.css'
import { renderQuestions } from '../../../../helper/questionHelper'
import * as questionActions from '../../../../store/question'


function PopularQuestions() {
  const dispatch = useDispatch()
  const allquestions = useSelector((state) => state.questionsReducer.question.questions)


  let orderQuestions = []

  for(let i = 0; i < allquestions.length; i++){

   for (let j = 0; j < (allquestions.length - i - 1); j++){

    if(allquestions[j].answers.length > allquestions[j+1].answers.length){
      let temp = allquestions[j]
      allquestions[j] = allquestions[j + 1]
      allquestions[j + 1] = temp
      orderQuestions.push(temp)
    }
   }

  }



  useEffect(() => {
    dispatch(questionActions.getTheQuestions())
  }, [dispatch])


  return (
    allquestions?
    <div className="question-container">
    <div className="question-title">
      <div></div>
      <div className="q-t-title">Questions</div>
      <div className="q-t-answers">Answers</div>
      <div className="q-t-author">Author</div>
      <div className="q-t-latest-answer">Latest Answer</div>
    </div>
    <div className="question-body">
      {allquestions.questions
        ? renderQuestions(allquestions.questions)
        : null}
    </div>
  </div>:<></>
  )
}

export default PopularQuestions

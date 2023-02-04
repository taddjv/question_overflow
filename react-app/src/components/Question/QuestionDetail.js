import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/user";

// For the route at questions:id


function questionDetail(id) {



  return (
    <div className='question-details'>
        <div className='q-d-user'></div>
        <div className='q-d-question'></div>
        <div className='q-d-body-details'></div>
    </div>
  )


  // return (
  //   //!add new route to answers to count the answers per question
  //   <>
  //     <div className="question-content">
  //       <div className="q-c-logo"></div>
  //       <div className="q-c-title-">
  //         <div className="q-c-t-q">{questionTitle}</div>
  //         <div className="q-c-t-d">{detail}</div>
  //       </div>
  //       <div className="q-c-answers">0</div>
  //       <div className="q-c-author">{userContent}</div>
  //       <div className="q-c-latest-answer">Latest Answer</div>
  //     </div>
  //   </>
  // );

}

export default questionDetail

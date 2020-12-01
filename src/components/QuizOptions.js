import React from 'react';

const QuizOptions = ({option, optionAnswer, checkAnswer, iconRef}) => {
    
    return (
        <>
            <div 
                onClickCapture={checkAnswer} className="QuizOptions Hovering"
                 >
                <p className='Option'>{option}</p>
                <p className='OptionAns'>{optionAnswer}</p>
                <span 
                    className="material-icons Mark"
                    ref={iconRef}>
                
                </span>   
            </div>
        </>
    )
}

export default QuizOptions

import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QuizOption from './QuizOptions';
import adventureLogo from '../images/undraw_adventure_4hum 1.svg';
import winnerLogo from '../images/undraw_winners_ao2o 2.svg';
import {getCountries} from '../actions/CountriesActions';
import {genRandomUniqueNumbers, shuffleArray} from '../utils/Utility';



const QuizQuestion = () => {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState('New Zealand');
    const [capital, setCapital] = useState('Wellington');
    const [flag, setFlag] = useState('https://restcountries.eu/data/nzl.svg');
    const [questionType, setQuestionType] = useState('capitalQuestion')
    const [tryAgain, setTryAgain] = useState(false);
    const [next , setNext] = useState(false);
    const [score, setScore] = useState(0);
    

    const [answers, setAnswers] = useState(['Canada', 'Peru', 'Accra', 'New Zealand']);
    
    const iconRef = useRef(null);

    const {countryList} = useSelector(state => state.countries);
    const countryLength = countryList.length;

    // const filterCountry = countryList.filter(x => x.capital !== '' && x.name !== '');

    // console.log(countryList)
    

    const checkAnswerHandler = (e)=>{
        // console.dir(e, this)
        // console.log(e.target.tagName === 'P');

        const divs = document.querySelectorAll('.QuizOptions');
        if(e.target.className === 'OptionAns'){
            if(answer === e.target.textContent){
                e.target.parentElement.classList.add('Correct');
                e.target.parentElement.classList.remove('Hovering');
                e.target.nextSibling.style.display = 'block';
                e.target.nextSibling.textContent = 'check';
                setNext(true);
                setScore(score + 1);
                divs.forEach(div => {
                    div.classList.add('Disable');
                });
            }else{
                e.target.parentElement.classList.add('Wrong');
                e.target.parentElement.classList.remove('Hovering');
                e.target.nextSibling.textContent = 'clear';
                e.target.nextSibling.style.display = 'block';

                divs.forEach(div => {
                    div.classList.add('Disable');
                });
                
                setTimeout(()=>{
                    setTryAgain(true);
                }, 2000);
                setNext(false);
            }
        }
        
    };


    // const tryAgainHandler = () =>{
    //     const divs = document.querySelectorAll('.QuizOptions');
    //     const icons = document.querySelectorAll('.Mark');
    //     divs.forEach(div => {
    //         div.classList.remove('Disable');
    //         if(div.classList.contains('Wrong')){
    //             div.classList.remove('Wrong');
    //             div.classList.add('Hovering');
    //         }
    //     });
    //     icons.forEach(icon =>{
    //         if(icon.style.display === 'block'){
    //             icon.style.display = 'none';
    //         }
    //     });
    //     setTryAgain(false);
    // };


    const nextHandler = () =>{
        const newCountry = [];
        const newAnswers = [];
        // generate 4 random unique numbers from countryList
        const numArray = genRandomUniqueNumbers(countryLength);
        const countryIndex = genRandomUniqueNumbers(numArray.length);
        

        for(let i = 0; i < numArray.length; i++){
            // push randomly generated country to new array
            newCountry.push(countryList[numArray[i]]);
        }

        // console.log(newCountry[countryIndex[0]].flag)
        setCapital(newCountry[countryIndex[0]].capital);
        setFlag(newCountry[countryIndex[0]].flag);
        setAnswer(newCountry[countryIndex[0]].name);

        for(let i = 0; i < countryIndex.length; i++){
            newAnswers.push(newCountry[countryIndex[i]].name);
        }

        setAnswers(newAnswers);
        shuffleArray(newAnswers);
        

        const divs = document.querySelectorAll('.QuizOptions');
        const icons = document.querySelectorAll('.Mark');
        divs.forEach(div => {
            div.classList.remove('Disable');
            if(div.classList.contains('Correct')){
                div.classList.remove('Correct');
                div.classList.add('Hovering');
            }
        });
        icons.forEach(icon =>{
            if(icon.style.display === 'block'){
                icon.style.display = 'none';
            }
        });

        setNext(false);
    };

    const startAgainHandler = () =>{
        setTryAgain(false);
    };

    const selectInputHandler = (e) =>{
        setQuestionType(e.target.id)
    };


    const quizOptions = (
        <>
            <div className="advLogo">
                <img src={adventureLogo} alt="Logo"/>
            </div>

            {questionType === 'capitalQuestion' ? (
                <div className="QuestionCapital">
                    <h3 className="QuizQuestion">
                        {capital} is the capital of
                    </h3>
                </div>
            ) 
            : (
                <div className="QuestionFlag">
                    <img className="Flag" src={flag} alt=""/>
                    <h3>
                    Which country does this flag belong to?  
                    </h3>
                </div>
            )}

                <QuizOption 
                    option='A' 
                    optionAnswer={answers[0]} 
                    checkAnswer={checkAnswerHandler}
                    iconRef={iconRef}  />
                <QuizOption 
                    option='B' 
                    optionAnswer={answers[1]}  
                    checkAnswer={checkAnswerHandler}
                    iconRef={iconRef}  />
                <QuizOption 
                    option='C' 
                    optionAnswer={answers[2]} 
                    checkAnswer={checkAnswerHandler}
                    iconRef={iconRef}  />
                <QuizOption 
                    option='D' 
                    optionAnswer={answers[3]}
                    checkAnswer={checkAnswerHandler}
                    iconRef={iconRef}  />

                <div className="BtnDiv">
                    <div className="SelectQuestion">
                        <div className="inputGroup">
                            <input type="radio" name="questionType" id="capitalQuestion"
                            onClick={selectInputHandler}
                            />
                            <label htmlFor="capitalQuestion">Capital</label>
                        </div>
                        
                        <div className="inputGroup">
                            <input type="radio" name="questionType" 
                            id="flagQuestion"
                            onClick={selectInputHandler}
                            />
                            <label htmlFor="flagQuestion">Flag</label>
                        </div>
                        <small>* select question type</small>
                    </div>
                    {next ? (
                        <button 
                            className="Btn NextBtn" 
                            onClick={nextHandler}>
                            Next
                        </button>
                    ) : null}
                </div>
        </>
    )

    const scoreCard = (
        <div className="ScoreCard">
            <div className="winnerLogo">
                <img src={winnerLogo} alt="score card"/> 
            </div>
            <h2 className="Result">
                Results
            </h2>

            <p className="ScoreText">
                You got 
                <span className="ScoreNum">{score}</span> 
                correct answers
            </p>

            <div className="Button">
                <button 
                    className="TryAgainBtn"
                    onClick={startAgainHandler}>
                    Try Again
                </button>
            </div>  
        </div>
    )


    useEffect(()=>{
        dispatch(getCountries());
    }, [dispatch]);

    
    return (
        <div className="Container">
           <h1 className="HeadingText">Country quiz</h1>
           <div className="QuizContainer">
                {!tryAgain ? quizOptions : scoreCard} 
           </div> 
        </div>
    )
}

export default QuizQuestion
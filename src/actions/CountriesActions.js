import axios from 'axios';
import { GET_COUNTRY_REQUEST, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAIL} from '../constants/CountryConstants';



export const getCountries = () => async (dispatch) =>{
    try {
        dispatch({type: GET_COUNTRY_REQUEST});

        const {data} = await axios.get('https://restcountries.eu/rest/v2/all');


        dispatch({
            type: GET_COUNTRY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_COUNTRY_FAIL,
            payload: error.message
        });
    }
};


// export const genRandomUniqueNumbers = () => async (dispatch) => {
//     const {data} = await axios.get('https://restcountries.eu/rest/v2/all');

//     //we need to store these numbers somewhere
//     const numArray = [];
//     //how many times we added a valid number (for if statement later)
//     let counter = data.length - 4;

//     //we will be generating random numbers until we are satisfied
//     while (true) {

//         //create that number
//         const newRandomNumber = Math.floor(Math.random() * data.length);

//         //if we do not have this number in our array, we will add it
//         if (!numArray.includes(newRandomNumber)) {
//             numArray.push(newRandomNumber);
//             counter++;
//         }

//         //if we have enought of numbers, we do not need to generate them anymore
//         if (counter >= data.length) {
//             break;
//         }
//     }


//     //now hand over this stuff
//     return numArray;
// };


import { GET_COUNTRY_FAIL, GET_COUNTRY_REQUEST, GET_COUNTRY_SUCCESS} from '../constants/CountryConstants';


export const CountryReducer = (state={countryList: []}, action)=>{
    switch(action.type){
        case GET_COUNTRY_REQUEST:
            return{...state, loading: true };
        case GET_COUNTRY_SUCCESS:
            return{
                ...state,
                loading: false,
                countryList: action.payload,
            };
        case GET_COUNTRY_FAIL:
            return{
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};






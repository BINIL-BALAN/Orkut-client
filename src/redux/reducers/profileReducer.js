import {SUCCESS,FAIL} from '../../constants'
export const profileReducer = (state={profiles:[]},action)=>{    
   switch(action.type){
      case SUCCESS :
              return {details:action.payload}
      case FAIL :
              return {details:action.payload}
      default: 
              return state
   }
}

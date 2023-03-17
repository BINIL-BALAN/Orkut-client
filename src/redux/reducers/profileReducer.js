import {SUCCESS,FAIL} from '../../constants'
export const profileReducer = (state={profiles:[]},action)=>{    
   switch(action.type){
      case SUCCESS :
              return {profiles:action.payload}
      case FAIL :
              return {profiles:action.payload}
      default: 
              return state
   }
}

const initialState = {
   opacity:0,message:'',data:[]
    }
    
    const reducer= (state = initialState, action) => {
        switch (action.type) {
    
        case "DISPLAY":
            
            return {opacity:1,message:action.payload}
        case "HIDE":
            return initialState
        case 'ADD':
           let dummy=[]
            let index=state.data.findIndex(el=>el.id==action.payload.id)
            dummy=state.data.filter(e=>e.id!=action.payload.id)
            if(index==-1){
                return {...state,data:[action.payload,...state.data]}
            }
            
            return {...state,data:[action.payload,...dummy]}
            
        default:
            return state
        }
    }
export default reducer
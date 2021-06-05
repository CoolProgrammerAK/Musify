export const alerted=text=>{
    return function(dispatch){
    dispatch({
       type:"DISPLAY",
       payload:text
    })
    setTimeout(() => {
        dispatch({
            type:"HIDE"
           
         })
    }, 2700);
   }}

   export const adddata=data=>{
    return function(dispatch){
    dispatch({
       type:"ADD",
       payload:data
    })
    
   }}
import React,{createContext, useState,useEffect,useContext} from "react";

const ActionContext=createContext({});

export function Provider({children}){
  const[todoes,setTodoes] = useState([])
  
  return(
    <ActionContext.Provider value={{todoes,setTodoes}}>
     {children}
    </ActionContext.Provider>
  )
}

export function useTodo(){
  const {todoes,setTodoes} = useContext(ActionContext);

const handleAddTodo = (todoInput) =>
 setTodoes([...todoes,{id:Date.now(), content: todoInput,type:"todo"}])

  const handleTodoClick = (itemId) => {
    const cloneTodoes = [...todoes] //clone with reference changed!
    const itemIndex=cloneTodoes.findIndex(todo => todo.id === itemId)
    if(cloneTodoes[itemIndex]) {
      cloneTodoes[itemIndex].type="todo";
    }
    setTodoes(cloneTodoes)
  };

const handleDoClick = (itemId) => {
  const cloneTodoes = [...todoes] //clone with reference changed!
  const itemIndex=cloneTodoes.findIndex(todo => todo.id === itemId)
  if(cloneTodoes[itemIndex]) {
    cloneTodoes[itemIndex].type="doing";
  }
  setTodoes(cloneTodoes)
};

const handleDoneClick =  (itemId) => {
  const cloneTodoes = [...todoes] 
  const itemIndex=cloneTodoes.findIndex(todo => todo.id === itemId)
  if(cloneTodoes[itemIndex]){    
      cloneTodoes[itemIndex].type="done";
    }
    setTodoes(cloneTodoes)
  };

useEffect(()=>{
  if(!todoes.length)
  setTodoes(JSON.parse(window.localStorage.getItem("todoes")) || []);

  if(todoes.length)
  window.localStorage.setItem("todoes",JSON.stringify(todoes))
},[setTodoes, todoes]);

return[
  {
   todoes: todoes.filter((todo)=> todo.type === "todo"),
   doingss: todoes.filter((todo)=> todo.type === "doing"),
   dones: todoes.filter((todo)=> todo.type === "done")
  },
   {handleAddTodo,handleTodoClick,handleDoClick,handleDoneClick}
 ];
}
export default ActionContext;
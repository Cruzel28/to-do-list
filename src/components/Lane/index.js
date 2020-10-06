import React from "react";
import Content from "./Content";
import {useTodo} from "../../contexts/ActionContext";

function Lane() {
  const [{todoes,doings,dones}]= useTodo();
 
  return (
    <div className="lane-container">
      <Content title="Todo"list={todoes}/>
      <Content title="Doing"list={doings}/>
      <Content title="Done" list={dones}/> 
    </div>
  );
}
export default Lane;
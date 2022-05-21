import React from 'react'
import './index.css'
import TaskItem from './TaskItem'

function TaskView({tasks, delItem, updateClickHandler}){
    return(
        <React.Fragment>
            {
                tasks.length===0?<h3>No Tasks</h3>:
                tasks.map((item)=>
                    <TaskItem key={item.id} id={item.id} completed={item.completed} description={item.description} delItem={delItem} updateClickHandler={updateClickHandler}/>
                )
            }
        </React.Fragment> 
    )
}
export default TaskView
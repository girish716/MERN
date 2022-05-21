import './index.css';

import {useEffect, useRef, useState} from 'react'

function InputSection(props){
    const [task, setTask] = useState("");
    const [completed, setCompleted] = useState(false)
    const inputRef = useRef(null);
    const noteRef = useRef(null);

    
    useEffect(()=>{
        if(props.isUpdateScreen){
            setTask(props.updateItemData.description);
            setCompleted(props.updateItemData.completed);
            noteRef.current.innerText = ""
            inputRef.current.focus();
        }
    },[props.isUpdateScreen, props.updateItemID]);

    const onChange = (e)=>{
        const {type, checked, value} = e.target;
        if(type==="checkbox"){
            setCompleted(checked);
        }
        else{
            setTask(value);
        }
        noteRef.current.innerText = "";
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        if(task===""){
            noteRef.current.innerText = "Please enter your Task and click Add"
            return;
        }
        if(props.isUpdateScreen){
            props.updateItem(task,completed, props.updateItemID);
            props.updateScreenHandler()
        }
        else{
            props.addTask(task);
        }
        setTask("");
    }

    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <h3>{props.isUpdateScreen?"Update Task":"Task Manager"}</h3>
            <input ref={inputRef} id="task" type="text" placeholder="Ex: Exam at 2PM" value={task} name="task" onChange={onChange}/>
            {props.isUpdateScreen && 
                <div className='checkbox'>
                    <label htmlFor='completed'>Completed</label>
                    <input type="checkbox" id="completed" name="completed" checked={completed} onChange={onChange}/>
                </div>
            }
            <button style={{width:props.isUpdateScreen?"300px":"max-content"}}>{props.isUpdateScreen?"Update":"Add"}</button>
            <br/>
            <p ref={noteRef}>{props.isUpdateScreen && props.updateItemID!=null && props.updateItemID===props.delItemID ? "Please Update the task before Deleting it..":""}</p>
        </form>
    );
}

export default InputSection;

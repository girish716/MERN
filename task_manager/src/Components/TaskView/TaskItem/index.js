import './index.css'
import { RiDeleteBack2Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { IoMdDoneAll } from 'react-icons/io'

export default function TaskItem(props){
    return(
        <div className='task-item'>
        <div className='icon over' style={{display:props.completed?"block":"none"}}><IoMdDoneAll color='green' fontSize='20px'/></div>
            <div className='des'><h3>{props.description}</h3></div>
            <div className='icons'>
                <div className='icon'><RiDeleteBack2Fill color='red' fontSize='20px' onClick={()=>{props.delItem(props.id)}}/></div>
                <div className='icon'><GrUpdate onClick={()=>{props.updateClickHandler(props.id)}}/></div>
            </div>
        </div>
    );
}
import './index.css';
import InputSection from '../InputSection'
import TaskView from '../TaskView';
import {useState, useEffect} from 'react'


function Home(){
    const [tasks, setTasks] = useState([]);
    const [isUpdateScreen, setIsUpdateScreen] = useState(false);
    const [updateItemID, setUpdateItemID] = useState(null);
    const [delItemID, setDelItemID] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        syncTasks(); 
    },[])

    const syncTasks = ()=>{
        fetch('https://task-manager-api.girishdama.com/api/v1/tasks'
        )
            .then(res => res.json())  
            .then(data => {
                let updatedTasks = data.tasks.map(task=>{
                    return {
                        id : task._id,
                        description : task.description,
                        completed : task.completed
                    }
                })
                setTasks(updatedTasks);
                setLoading(false);
            })
            .catch(err=>console.log(err))
    }

    const addTask = (description)=>{
        fetch(`https://task-manager-api.girishdama.com/api/v1/tasks`, {
            method: "POST",
            body: JSON.stringify({
                description: description,
                completed : false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(()=>{syncTasks()})
        .catch(err=>console.log(err)) 
    }

    const delItem = (id)=>{
        setDelItemID(id);
        if(isUpdateScreen && updateItemID===id){ 
        // not allowing to del when the user is updating the item & tries to del at the same time
            return;
        }
        fetch(`https://task-manager-api.girishdama.com/api/v1/tasks/${id}`, {
            method: "DELETE"
        })
        .then(()=>{syncTasks()})
        .catch(err=>console.log(err)) 
    }

    const updateItem = (description, completed, id)=>{
        fetch(`https://task-manager-api.girishdama.com/api/v1/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                description: description,
                completed : completed
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(()=>{syncTasks()})
        .catch(err=>console.log(err))
    }

    return(
        <div className="home">
            <div className="section-1" 
                style={{height:isUpdateScreen?"200px":"120px"}}>
                <InputSection 
                    addTask={addTask} 
                    isUpdateScreen={isUpdateScreen} 
                    updateItemData={tasks.find(item=>item.id===updateItemID)}
                    updateItemID={updateItemID}
                    delItemID={delItemID}
                    updateItem={updateItem}
                    updateScreenHandler={()=>{
                        setIsUpdateScreen(false);
                        setDelItemID(null);
                        setUpdateItemID(null);
                    }}
                    />
            </div>
            <div className="section-2">
            {
                loading?
                <h3>Loading....</h3>
                :
                <TaskView tasks={tasks} delItem={delItem} updateClickHandler={(id)=>{
                    setIsUpdateScreen(true);
                    setUpdateItemID(id);
                    setDelItemID(null);
                }}/>
            }
                
            </div>
        </div>
    );
}

export default Home;
import './tasks.css'
import '../../App.css'
import TasksList from './TasksList';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const Tasks = () =>{
    const dispatch = useDispatch();
    const textRef = useRef();
    const imgRef = useRef();
    const submitHandler = (event) =>{
        event.preventDefault();
        let taskName = textRef.current.value;
        const imgFile = imgRef.current.files;
        let img;
        if(taskName === '' && imgFile.length > 0){
            taskName = imgFile[0].name;
            img = imgFile[0];
            dispatch({type: 'ADD_TASK',taskName:taskName,taskImg:img})
            imgRef.current.value = '';
        }else if(taskName !== ''){
            if(imgFile.length > 0){
                img = imgFile[0];
                dispatch({type: 'ADD_TASK',taskName:taskName,taskImg:img})
                imgRef.current.value = '';
            }else{
                dispatch({type: 'ADD_TASK',taskName:taskName})
            }
            textRef.current.value = '';
        }
    }
    return(
        <section className="task-section">
            <form onSubmit={submitHandler} className="task-input-form">
                <button className="addButton" type="submit">Add Button</button>
                <input ref={textRef} id="task-input" type="text" placeholder="Add Task" />
                <input ref={imgRef} type="file" id="task-img" name="task-img" accept="image/*" />
            </form>
            <TasksList/>
        </section>
    )
}

export default Tasks;
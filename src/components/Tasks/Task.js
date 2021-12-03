import { useRef } from "react";
import { useDispatch } from "react-redux"

const Task = (props) =>{
    const labelRef = useRef();
    const dispatch = useDispatch();
    const checkboxClickHandler = () =>{
        dispatch({type:'CHANGE_TASK_STATUS',taskId: props.task.id})
    }
    const changeLabelNameHandler = (event) =>{
        event.preventDefault();
        const taskName = labelRef.current.innerText;
        dispatch({type:'CHANGE_TASK_NAME',taskId: props.task.id,taskName: taskName})
    }
    const labelClickHandler = (event) =>{
        event.preventDefault();
    }

    const deleteButtonClickHandler = () => {
        dispatch({type: 'REMOVE_TASK',taskId: props.task.id})
    }

    return(
        <li>
            <div className="task-input-container">
                {props.task.marked ? 
                    <input id={props.task.id} type="checkbox" onClick={checkboxClickHandler} checked/>
                    : <input id={props.task.id} type="checkbox" onClick={checkboxClickHandler}/>
                }
                <label ref={labelRef} htmlFor={props.task.id} contentEditable="true" onClick={labelClickHandler} onBlur={changeLabelNameHandler}
                className={props.task.marked ? "ticked":''} suppressContentEditableWarning={true}>
                    {props.task.text}
                </label>
            </div>
            <button onClick={deleteButtonClickHandler} className="material-icons del">delete_forever</button>
        </li>
    )
}

export default Task
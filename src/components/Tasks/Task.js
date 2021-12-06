import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux"
import { CHANGE_TASK_NAME, CHANGE_TASK_STATUS, REMOVE_TASK } from "../../app/actions";

const Task = (props) =>{
    const labelRef = useRef();
    const dispatch = useDispatch();
    const checkboxClickHandler = useCallback(()=>{
        dispatch({type: CHANGE_TASK_STATUS,taskId: props.task.id})
    },[props.task.id])

    const changeLabelNameHandler = useCallback((event)=>{
        event.preventDefault();
        const taskName = labelRef.current.innerText;
        dispatch({type: CHANGE_TASK_NAME,taskId: props.task.id,taskName: taskName})
    },[props.task.id])

    const labelClickHandler = useCallback((event)=>{
        event.preventDefault();
    },[])
    
    const deleteButtonClickHandler = useCallback(()=>{
        dispatch({type: REMOVE_TASK,taskId: props.task.id})
    },[props.task.id])

    return(
        <li>
            <div className="task-input-container">
                {props.task.marked ? 
                    <input id={props.task.id} type="checkbox" onChange={checkboxClickHandler} checked/>
                    : <input id={props.task.id} type="checkbox" onChange={checkboxClickHandler}/>
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
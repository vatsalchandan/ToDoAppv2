import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_FROM_LIST, UPDATE_SELECTED_LIST_ID } from '../../app/actions';
import './Lists.css'

const List = (props) =>{
    const dispatch = useDispatch();
    const listRef = useRef();
    const selectedListId = useSelector((state)=>state.selectedListId);
    const deleteHandler = useCallback(()=>{
        dispatch({type: REMOVE_FROM_LIST,id: props.list.id})
    },[dispatch, props.list.id])

    const listClickHandler = useCallback((event)=>{
        if(event.target.className !== "material-icons del"){
            dispatch({type: UPDATE_SELECTED_LIST_ID,selectedListId:props.list.id})
        }
    },[dispatch, props.list.id])
    
    return(
        <li className={'list' + (props.list.id === selectedListId ? ' selected': '')} ref={listRef} onClick={listClickHandler}>
            <label>{props.list.name}</label>
            <button onClick={deleteHandler} className="material-icons del">delete_forever</button>
        </li>
    )
}

export default List
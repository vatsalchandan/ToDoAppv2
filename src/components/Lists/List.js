import { useDispatch } from 'react-redux'
import './Lists.css'

const List = (props) =>{
    const dispatch = useDispatch();
    const deleteHandler = () =>{
        dispatch({type: 'REMOVE_FROM_LIST',id: props.list.id})
    }

    const listClickHandler = (event) =>{
        if(event.target.className !== "material-icons del"){
            dispatch({type: 'UPDATE_SELECTED_LIST_ID',selectedListId:props.list.id})
        }
    }
    return(
        <li className="list" onClick={listClickHandler}>
            <label>{props.list.name}</label>
            <button onClick={deleteHandler} className="material-icons del">delete_forever</button>
        </li>
    )
}

export default List
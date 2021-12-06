import { useSelector } from "react-redux"
import List from "./List";
import './Lists.css'

const ListsList = () =>{
    const lists = useSelector(state => Object.values(state.lists));
    return(
        <ul id="lists-list">
            {lists?.map(list => <List key={list.id} list = {list} />)}
        </ul>
    )
}

export default ListsList
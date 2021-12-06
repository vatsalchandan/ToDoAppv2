import './Lists.css'
import '../../App.css'
import ListsList from './ListsList'
import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_TO_LIST } from '../../app/actions'

const Lists = () =>{
    const dispatch = useDispatch();
    const listInputRef = useRef();

    const listFormSubmitHandler = useCallback((event)=>{
        event.preventDefault();
        const listName = listInputRef.current.value;
        dispatch({type: ADD_TO_LIST,listName: listName})
        listInputRef.current.value = '';
    },[])

    const searchInputHandler = useCallback(()=>{
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("lists-list");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("label")[0];
            txtValue = a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "flex";
            } else {
                li[i].style.display = "none";
            }
        }
    },[])
    
    return(
        <section className="list-section">
            <input type="text" id="searchInput" placeholder="search" onKeyUp={searchInputHandler} />
            <ListsList/>
            <form onSubmit={listFormSubmitHandler} className="list-input-form">
                <input ref={listInputRef} className="list-input" id="list-input" type="text" placeholder="Add List" />
                <button className="addButton" type="submit">Add</button>
            </form>
        </section>
    )
}

export default Lists
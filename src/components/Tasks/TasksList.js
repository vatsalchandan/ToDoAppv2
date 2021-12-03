import { useSelector } from "react-redux";
import Task from "./Task";

const TasksList = () =>{
    const selectedListId = useSelector(state => state.selectedListId);
    const lists = useSelector(state => state.lists);
    const listIndex = lists.findIndex(list =>  list.id === selectedListId);
    const tasks = lists[listIndex]?.tasks;
    return(
        <ul id="tasks-list">
            {tasks?.map(task => <Task key={task.id} task = {task} />)}
        </ul>
    )
}

export default TasksList
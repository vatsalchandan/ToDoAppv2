import { useSelector } from "react-redux";
import Task from "./Task";

const TasksList = () =>{
    const selectedListId = useSelector(state => state.selectedListId);
    const lists = useSelector(state => state.lists);
    const tasks = lists[selectedListId]?.tasks ? Object.values(lists[selectedListId]?.tasks) : [];
    return(
        <ul id="tasks-list">
            {tasks?.map(task => <Task key={task.id} task = {task} />)}
        </ul>
    )
}

export default TasksList
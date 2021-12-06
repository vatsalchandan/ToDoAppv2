import { ADD_TASK, ADD_TO_LIST, CHANGE_TASK_NAME, CHANGE_TASK_STATUS, REMOVE_FROM_LIST, REMOVE_TASK, UPDATE_SELECTED_LIST_ID } from "./actions";

function List(listName){
    this.id = Date.now().toString();
    this.name = listName;
    this.tasks = {};
}

List.prototype.setTasks = function(value){
    this.tasks = value;
}

function Task(text,img = null){
    this.id = Date.now().toString();
    this.text = text;
    this.img = img;
    this.marked = false;
}

Task.prototype.markTask = function(value){
    this.marked = value;
}

Task.prototype.setImg = function(value){
    this.img = value
}

Task.prototype.setName = function(value){
    this.text = value
}

const initialState = {
    lists: {},
    selectedListId: null
}

const taskUpdate = (state,logic) =>{
    if(state.selectedListId){
        const lists = {...state.lists}
        const list = lists[state.selectedListId];
        logic(list);
        return {
            ...state,
            lists: lists
        }
    }else{
        return state;
    }
}

export const reducer = (state = initialState,action) =>{
    switch(action.type){
        case ADD_TO_LIST:{
            const list = new List(action.listName);
            const newLists = {
                ...state.lists,
                [list.id]: list
            }
            return {
                ...state,
                lists: newLists
            }
        }
        case REMOVE_FROM_LIST:{
            const {[action.id]:removedList , ...restLists} = state.lists;
            return {
                ...state,
                lists: restLists
            }
        }
        case ADD_TASK:{
            const task = new Task(action.taskName,action?.taskImg ?? null);
            return taskUpdate(state,(list)=>{
                const newTasks = {
                    ...list.tasks,
                    [task.id]:task
                };
                list.setTasks(newTasks);
            })
        }
        case  UPDATE_SELECTED_LIST_ID:{
            const newSelectedId = action.selectedListId;
            return {
                ...state,
                selectedListId: newSelectedId
            } 
        }
        case CHANGE_TASK_STATUS:{
            return taskUpdate(state,(list)=>{
                const task = list.tasks[action.taskId];
                task.markTask(!task.marked);
            })
        }
        case CHANGE_TASK_NAME:{
            return taskUpdate(state,(list)=>{
                const task = list.tasks[action.taskId];
                task.setName(action.taskName);
            })
        }
        case REMOVE_TASK:{
            return taskUpdate(state,(list)=>{
                const {[action.taskId]: removedTask, ...restTasks} = list.tasks;
                list.setTasks(restTasks);
            })
        }
        default: {
            return state;
        }
    }
}
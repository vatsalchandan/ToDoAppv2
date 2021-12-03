function List(listName){
    this.id = 'a'+Date.now().toString();
    this.name = listName;
    this.tasks = [];
}

List.prototype.setTasks = function(value){
    this.tasks = value;
}

function Task(text,img = null){
    this.id = 'a'+Date.now().toString();
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
    lists: [],
    selectedListId: null
}

export const reducer = (state = initialState,action) =>{
    switch(action.type){
        case 'ADD_TO_LIST':{
            const list = new List(action.listName);
            const newLists = [...state.lists,list];
            return {
                ...state,
                lists: newLists
            }
        }
        case 'REMOVE_FROM_LIST':{
            const index = state.lists.findIndex(list => list.id === action.id);
            const newLists = [...state.lists];
            newLists.splice(index,1);
            return {
                ...state,
                lists: newLists
            }
        }
        case 'ADD_TASK':{
            const task = new Task(action.taskName,action?.taskImg ?? null);
            if(state.selectedListId){
                const lists = [...state.lists]
                const listIndex = lists.findIndex(list => list.id === state.selectedListId)
                const list = lists[listIndex];
                const newTasks = [...list.tasks,task];
                list.setTasks(newTasks);
                return {
                    ...state,
                    lists: lists
                }
            }else{
                return state;
            }
        }
        case  'UPDATE_SELECTED_LIST_ID':{
            const newSelectedId = action.selectedListId;
            return {
                ...state,
                selectedListId: newSelectedId
            } 
        }
        case 'CHANGE_TASK_STATUS':{
            if(state.selectedListId){
                const lists = [...state.lists]
                const listIndex = lists.findIndex(list => list.id === state.selectedListId)
                const list = lists[listIndex];
                const task = list.tasks.find(task => task.id === action.taskId);
                task.markTask(!task.marked);
                return {
                    ...state,
                    lists: lists
                }
            }else{
                return state;
            }
        }
        case 'CHANGE_TASK_NAME':{
            if(state.selectedListId){
                const lists = [...state.lists]
                const listIndex = lists.findIndex(list => list.id === state.selectedListId)
                const list = lists[listIndex];
                const task = list.tasks.find(task => task.id === action.taskId);
                task.setName(action.taskName);
                return {
                    ...state,
                    lists: lists
                }
            }else{
                return state;
            }
        }
        case 'REMOVE_TASK':{
            if(state.selectedListId){
                const lists = [...state.lists]
                const listIndex = lists.findIndex(list => list.id === state.selectedListId)
                const list = lists[listIndex];
                const newTasks = list.tasks.filter(task => task.id !== action.taskId);
                list.setTasks(newTasks);
                return {
                    ...state,
                    lists: lists
                }
            }else{
                return state;
            }
        }
        default: {
            return state;
        }
    }
}
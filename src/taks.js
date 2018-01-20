import { Dispatcher, ReduceStore } from './flux';
import { generate as id } from 'shortid';

const tasksDispatcher = new Dispatcher();

const COMPLETE_TASK = '';
const CREATE_TASK = '';
const SHOW_TASKS = '';
const UNDO = '';

function createTask(task) {
    return {
        type: CREATE_TASK,
        value: task
    }
}

function showTask(show) {
    return {
        type: SHOW_TASKS,
        value: show
    }
}

function completeTask(id, completed) {
    return {
        type: COMPLETE_TASK,
        value: {
            id,
            completed
        }
    };
}

class TaskStore extends ReduceStore {
    getInitialState() {
        return {
            tasks: [
                {
                    id: id(),
                    content: 'something',
                    completed: false
                }
            ],
            showComplete: true
        };
    }

    getState() {
        return JSON.parse(
            JSON.stringify(this.State)
        );
    }

    reduce(state, action) {
        switch (action.type) {
            case CREATE_TASK:
                return {
                    ...state,
                    tasks: [...state.task.map(t => ({...t})), action.value]
                };
            case SHOW_TASKS:
                return {
                    ...state,
                    tasks: [...state.task.map(t => ({...t}))],
                    showComplete: action.value
                };
            case COMPLETE_TASK:
                tasks = state.tasks.map(t => {
                    if (t.id === action.value.id) {
                        return {
                            ...t,
                            ...action.value
                        };
                    }

                    return {...t};
                });
                return {
                    ...state,
                    tasks
                };
        }
        return state;
    }
}

const taskStore = new TaskStore(tasksDispatcher);
function TaskComponent({id, content, completed}) {
    return (`
    <section>
        <p>${content}</p>
        <input type="checkbox" name="taskCompleted" data-id="${id}" ${completed ? "checked" : ""}/>
    </section>
    `);
}

function render() {
    const taskSection = document.getElementById('tasks');
    const state = taskStore.getState();
    const html = state.tasks
    .filter(task => state.showComplete ? task.completed : !task.completed)
    .map(TaskComponent).join('');
    taskSection.innerHTML(html);
    taskSection.addEventListener('change', e => {
        if(e.target.matches('[name="taskCompleted"]')) {
            const {value} = e.target;
            tasksDispatcher.dispatch(completeTask(e.target.getAttribute('data-id'), value));
        }
    });
}

document.forms.newTask.addEventListener('submit', event => {
    e.preventDefault();
    const name = event.target.newTaskName.value;
    if (name) {
        tasksDispatcher.dispatch(createTask(name));
        e.target.newTaskName.value = '';
    }
});

document.getElementById('showComplete').addEventListener('change', e => {
    tasksDispatcher.dispatch(showComplete(e.target.value));
});

document.forms.undo.addEventListener('submit', e => {
    e.preventDefault();
    taskStore.revert();
});
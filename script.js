
document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById('task-input');
    const AddTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('tasklist');
    const toDosContainer = document.querySelector('.to-do-container');

    const toggleEmptyState = () => {
        toDosContainer.style.width = taskList.children.length > 0 ? '100%':'50%';
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            return;
        } 

        const li = document.createElement ('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <div class= 'task-btn'>
        <button class = "edit-btn">
        <i class= 'fas fa-edit'></i></button>
        <button class = "del-btn">
        <i class= 'fas fa-trash'></i></button>
        `;
        
        li.querySelector('.del-btn').addEventListener('click', () => {
            li.remove();
        });

        
        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
    };

    AddTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e)=> {
        if(e.key === 'Enter') {
            addTask(e);
        }
    });
});

document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById('task-input');
    const AddTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('tasklist');
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
        <i class= 'fas fa-edit'></i></button></>
        <button class = "trash-btn">
        <i class= 'fas fa-trash'></i></button></>
        `;



        
        taskList.appendChild(li);
        taskInput.value = "";
    };

    AddTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e)=> {
        if(e.key === 'Enter') {
            addTask(e);
        }
    });
});
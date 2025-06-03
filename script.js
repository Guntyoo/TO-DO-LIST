
document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById('task-input');
    const AddTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('tasklist');
    const toDosContainer = document.querySelector('.to-do-container');

    const toggleEmptyState = () => {
        toDosContainer.style.width = taskList.children.length > 0 ? '100%':'50%';
    };

    const addTask = (text , completed = false) => {
        event.preventDefault();
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return;
        } 

        const li = document.createElement ('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">${completed ? 'checked' : ''}
        <span>${taskText}</span>
        <div class= 'task-btn'>
        <button class = "edit-btn">
        <i class= 'fas fa-edit'></i></button>
        <button class = "del-btn">
        <i class= 'fas fa-trash'></i></button></div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editbtn = li.querySelector('.edit-btn');

        if (completed) {
            li.classList.add ('completed');
            editbtn.disabled = true;
            editbtn.style.opacity = '0.5';
            editbtn.style.pointerEvents = none;
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked
            li.classList.toggle ('completed', isChecked);
            editbtn.disabled = isChecked;
            editbtn.style.opacity = isChecked ?  '0.5' : '1';
            editbtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        });

        editbtn.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
            }
        });
        
        li.querySelector('.del-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        
        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
    };

    AddTaskBtn.addEventListener('click', () => {
        addTask();
    });
    taskInput.addEventListener('keypress', (e)=> {
        if(e.key === 'Enter') {
            addTask();
        }
    });
});
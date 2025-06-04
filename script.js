
document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById('task-input');
    const AddTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('tasklist');
    const toDosContainer = document.querySelector('.to-do-container');
    const progressBar = document.getElementById('progress');
    const progressNumber = document.getElementById('numbers');
    const form = document.querySelector('.input-area');

    const toggleEmptyState = () => {
        toDosContainer.style.width = taskList.children.length > 0 ? '100%':'50%';
    };

   const updateProgress = (checkCompletion = true) => {
    const TotalTask = taskList.children.length;
    const CompletedTask = taskList.querySelectorAll('.checkbox:checked').length;
    const progress = TotalTask ? (CompletedTask / TotalTask) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    progressNumber.textContent = `${CompletedTask} / ${TotalTask}`;

    if ( checkCompletion && TotalTask > 0 && CompletedTask === TotalTask) {
        Confetti();
    }
};

    const addTask = (text , completed = false, checkCompletion = true) => {
        
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
            editbtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked
            li.classList.toggle ('completed', isChecked);
            editbtn.disabled = isChecked;
            editbtn.style.opacity = isChecked ?  '0.5' : '1';
            editbtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
        });

        editbtn.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
            }
        });
        
        li.querySelector('.del-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
        });

        
        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
        updateProgress(checkCompletion);
    };
     form.addEventListener('submit', (e) => {
    e.preventDefault();
      addTask();
    });
});

const Confetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
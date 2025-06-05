let tasks = [ { id: 1, title: 'Buy groceries', completed: false }, { id: 2, title: 'Read a book', completed: true } ];

function getFilter() {
    const filterAll = document.querySelector(".filter-all");
    const filterCompleted = document.querySelector(".filter-completed");
    const filterPending = document.querySelector(".filter-pending");

    if (filterAll.checked){
        return "all";
    }
    if (filterCompleted.checked){
        return "completed";
    }
    if(filterPending.checked){
        return "pending";
    }
}

const container = document.querySelector(".container");
const newTaskBtn = document.querySelector(".new-task");
const dialog = document.querySelector("dialog");
const closeBtn = dialog.querySelector(".close");
const form = dialog.querySelector("form");
const yesCompleted = form.querySelector(".yes");
const newTaskTitle = document.querySelector(".task-title");

closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    dialog.close();
})

form.addEventListener("submit", (event)=>{
    console.log("submit...");
    const newTask = {
        id: crypto.randomUUID(),
        title: `${newTaskTitle.value}`,
        completed: yesCompleted.checked ? true : false
    };
    tasks.push(newTask);
    displayTasks(getFilter());
    container.appendChild(filterForm);

});

function displayTasks(filter){
    console.log("new display!");
    while (container.hasChildNodes()){
        container.removeChild(container.firstChild);
    }
    tasks.forEach(task=>{
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        const text = document.createElement("p")

        text.textContent = task.title;

        if (filter==="all" || filter)
        taskCard.appendChild(text);
        taskCard.dataset.id = task.id;
        if (task.completed){
            taskCard.classList.add("completed");

        }

        if(filter==="all" || filter==="completed" && task.completed || filter==="pending" && !task.completed){
            container.appendChild(taskCard);

        }
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (event)=>{
            tasks = tasks.filter(task=>task.id != taskCard.dataset.id);
            displayTasks(getFilter());
        })

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Completion";
        toggleBtn.addEventListener("click", (event)=>{
            for(const task of tasks){
                if (task.id == taskCard.dataset.id){
                    task.completed = !task.completed;
                    for (const task of tasks){
                        console.log(task);
                    }
                    break;
                }
            }
            displayTasks(getFilter());
            container.appendChild(filterForm);


        });


        taskCard.appendChild(deleteBtn);
        taskCard.appendChild(toggleBtn);
    });

    container.appendChild(newTaskBtn);
    newTaskBtn.addEventListener("click", (event)=>{
        dialog.showModal();
    })
}



displayTasks(getFilter());

const filterForm = document.querySelector(".filter-form");

filterForm.addEventListener("click", (event)=>{
    displayTasks(getFilter());
    container.appendChild(filterForm);
})


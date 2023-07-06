// Getting all the input
const form = document.getElementById("form")
const input = document.getElementById("content")
const todosUi = document.getElementById("todoUi")

const toggleInp = document.getElementById("mode")
const BD = document.querySelector("body")

// if active button is clicked 
const activeBtn = document.getElementById("activebtn")
const allBtn = document.getElementById("allbtn")
const completedBtn = document.getElementById("completedbtn")
const clearBtn = document.getElementById("clearbtn")

activeBtn.onclick = () => filterTodo('active')  
allBtn.onclick = () => filterTodo('all')
completedBtn.onclick = () => filterTodo('completed')
clearBtn.onclick = () => clearCompletedTodos()

// toggle Mode
const imgUrl = {
    "light": "./images/icon-moon.svg",
    "dark": "./images/icon-sun.svg",
}

toggleInp.onclick = () => {
    if(toggleInp.checked) {
        document.getElementById("toggleIcon").src = imgUrl.light
        BD.classList.add("lightmode")
    }else {
        document.getElementById("toggleIcon").src = imgUrl.dark
        BD.classList.remove("lightmode")
    }
}


let todoArray = []

// if input is submitted
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const todotext = input.value.trim()

    if(todotext !== '') {
        todoArray.push({
            id : Date.now(),
            completed: false,
            text: todotext
        })

        renderTodo()
        input.value = ''
    } 
})

// Function to add new todo
function renderTodo() {
    todosUi.innerHTML = ''
    todoArray.forEach(todo => {
        if(todo) {
            // check
            const check = document.createElement('div') 
            check.className = 'check'
            const checkImg = document.createElement('img') 
            checkImg.src = "./images/icon-check.svg"
            checkImg.alt = "icon-check"
            check.append(checkImg)

            // text
            const textUi = document.createElement('p')
            textUi.textContent = todo.text

            const bigDiv = document.createElement('div')
            bigDiv.className = 'bigDiv'
            bigDiv.append(check)
            bigDiv.append(textUi)
            bigDiv.addEventListener('click', () => checked(todo.id))
            
            // Delete Button
            const delBtn = document.createElement('span') 
            delBtn.className = 'delete'
            const delImg = document.createElement('img') 
            delImg.src = "./images/icon-cross.svg"
            delImg.alt = "icon-cross"
            delBtn.append(delImg)

            delBtn.addEventListener('click', () => deleteTodo(todo.id))

            const task = document.createElement('li')
            task.classList.add('list')

            task.append(bigDiv)
            task.append(delBtn)
            todosUi.append(task)

            if (todo.completed) {
                task.classList.add('checked')
            }
        }
    })
    
    allBtn.classList.add('active')
    activeBtn.classList.remove('active')
    completedBtn.classList.remove('active')
    UpdateNoItems()
}

// Update the number of items
function UpdateNoItems() {
    const noItems = document.getElementById('itemsno')
    const number  = document.querySelectorAll('.list')
    noItems.innerText = `${number.length} items left` 
}

// function to toggle task completion
function checked(todoId) {
    todoArray = todoArray.map(todo => {
        if(todo.id === todoId) {
            todo.completed = !todo.completed
            console.log(todoArray)
        }
        return todo
    })
    renderTodo()
} 

// Function to delete a task
function deleteTodo(todoId) {
    todoArray = todoArray.filter(todo => todo.id !== todoId)
    renderTodo()
}

// function to filter tasks by completion status
function filterTodo(status) {
    let filteredTodos

    switch(status) {
        case 'all': 
            filteredTodos = todoArray
            allBtn.classList.add('active')
            activeBtn.classList.remove('active')
            completedBtn.classList.remove('active')
        break
        case 'active': 
            filteredTodos = todoArray.filter(todo => !todo.completed)
            activeBtn.classList.add('active') 
            allBtn.classList.remove('active')
            completedBtn.classList.remove('active')
        break
        case 'completed': 
            filteredTodos = todoArray.filter(todo => todo.completed)
            completedBtn.classList.add('active')
            activeBtn.classList.remove('active')
            allBtn.classList.remove('active')
        break
        default:
            filteredTodos = todoArray 
            allBtn.classList.add('active')
            activeBtn.classList.remove('active')
            completedBtn.classList.remove('active')
    }

    renderFilteredTodos(filteredTodos, status)
}


// function to render the UI for any condition
function renderFilteredTodos(todos, status) {
    todosUi.innerHTML = ''
    todos.forEach(todo => {

        // check
        const check = document.createElement('div') 
        check.className = 'check'
        const checkImg = document.createElement('img') 
        checkImg.src = "./images/icon-check.svg"
        checkImg.alt = "icon-check"
        check.append(checkImg)

        check.addEventListener('click', () => checked(todo.id))

        // text
        const textUi = document.createElement('p')
        textUi.textContent = todo.text
        
        const bigDiv = document.createElement('div')
        bigDiv.className = 'bigDiv'
        bigDiv.append(check)
        bigDiv.append(textUi)

        // Delete Button
        const delBtn = document.createElement('span') 
        delBtn.className = 'delete'
        const delImg = document.createElement('img') 
        delImg.src = "./images/icon-cross.svg"
        delImg.alt = "icon-cross"
        delBtn.append(delImg)

        delBtn.addEventListener('click', () => deleteTodo())

        const task = document.createElement('li')
        task.classList.add('list')
        
        task.append(bigDiv)

        if(status == 'all') {
            task.append(delBtn)
        }
        todosUi.append(task)

        if (todo.completed) {
            task.classList.add('checked')
        }
    })

    UpdateNoItems()
}

// function to clear Todo
function clearCompletedTodos() {
    todoArray = todoArray.filter(todo => !todo.completed);
    renderTodo();
}





































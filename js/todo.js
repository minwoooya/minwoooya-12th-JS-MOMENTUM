const toDoForm=document.getElementById("todo-form");
const toDoInput=document.querySelector("#todo-form input");
const toDoList=document.getElementById("todo-list");
let toDos=[];
const TODOS_KEY="toDos";

function deleteTodo(event){
    //console.dir(event);
    const li=event.target.parentElement;
    li.remove();
    toDos=toDos.filter((toDo)=>toDo.id!==parseInt(li.id));
    saveToDos();
    //console.log(toDos);
}

function paintToDo(newToDo){
    const li=document.createElement("li");
    const span=document.createElement("span");
    const deletebutton=document.createElement("button");
    const editButton=document.createElement("button");
    //console.log(newToDo);
    li.id=newToDo.id;
    li.appendChild(span);
    li.appendChild(deletebutton);
    li.appendChild(editButton);
    span.innerText=newToDo.text;
    deletebutton.innerText="X"
    editButton.innerText="Edit"
    deletebutton.className="button-name"
    editButton.className="button-name"
    deletebutton.addEventListener("click",deleteTodo);
    editButton.addEventListener("click",editToDo);
    toDoList.appendChild(li);
    //console.log(li);
}

function editToDo(event){
    const li=event.target.parentElement;
    const span=li.querySelector("span");
    const newText=prompt("Edit the to-do: ",span.innerText);
    if(newText!==null&&newText.trim()!==""){
        const todoId=parseInt(li.id);
        toDos=toDos.map((toDo)=>{
            if(toDo.id===todoId){
                toDo.text=newText;
            }
            return toDo;
        });
        span.innerText=newText;
        saveToDos();
    }
}

function saveToDos(){
    localStorage.setItem("toDos",JSON.stringify(toDos));
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo=toDoInput.value;
    toDoInput.value="";
    const newTodoObj={
        text: newToDo,
        id:Date.now(),
    };
    toDos.push(newTodoObj);
    //console.log(toDos);
    paintToDo(newTodoObj);
    saveToDos();
}

const savedToDos=localStorage.getItem(TODOS_KEY);
if(savedToDos!==null){
    const parsedToDos=JSON.parse(savedToDos);
    //console.log(savedToDos);
    toDos=parsedToDos;
    //console.log(toDos);
    parsedToDos.forEach(paintToDo);
}

toDoForm.addEventListener("submit",handleToDoSubmit);
database = firebase.firestore();

const todoListId = document.getElementById('todoList');
const todoInputId = document.getElementById('todoInput')
const inputId = document.getElementById('input');
const descriptionId = document.getElementById('description');



//function to save data to cloud firestore from web
function onSubmit() {
    var todoHeading = inputId.value;
    var todoDescription = descriptionId.value;
    database.collection('ToDo').add({
        Task : todoHeading,
        Description : todoDescription, 
    });
    inputId.value = '';
    descriptionId.value = '';
}


// function to list todo items on web
function listTodoItems(doc) {



    let card = document.createElement("div");
    card.className = "ui centered segment link card";
   
    let content = document.createElement("div");
    content.className = "content";
   
    let icon = document.createElement("i");
    icon.className = "list alternate icon";

    let header = document.createElement("div");
    header.className = "header";

    let description = document.createElement("div");
    description.className = "description";
  
    let close = document.createElement("button");
    close.className = "ui bottom attached red button";

    card.setAttribute('data-id', doc.id);
    header.textContent = doc.data().Task + " ";
    description.textContent = doc.data().Description;
    close.textContent = "REMOVE";

    header.append(icon);
    content.append(header);
    content.append(description);
    card.append(content);
    card.append(close);

    todoListId.append(card);

    close.addEventListener('click', (e) => {
        var id = e.target.parentElement.getAttribute('data-id');
        database.collection("ToDo").doc(id).delete();
    })
}

//get data from cloud firestore
database.collection('ToDo').orderBy('Task').onSnapshot(function (snapshot) {    
    snapshot.docChanges().forEach(function (change) {        
        if (change.type == 'added') {
            listTodoItems(change.doc);
        }
        else if (change.type == "removed") {
            var list = todoListId.querySelector('[data-id=' + change.doc.id + ']');
            todoListId.removeChild(list);
        }
    })
});


















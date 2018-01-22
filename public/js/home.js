const deleteTodo = function(event){
  let method = 'POST';
  let url = '/onDelete';
  let data = `id=${event.target.className}`;
  sendRequest(method,url,displayTodo,data);
}

const displayItems = function(){
  let data = this.responseText;
}

const addItem = function(){
  let input = document.querySelector('#item').value;
  let method = 'POST';
  let url = '/addItem';
  let data = `item=${input}&index=${event.target.className}`;
  sendRequest(method,url,displayItems,data);
}

const createAddItemButton = function(){
  let className = event.target.className;
  document.getElementById('div').innerHTML = "";
  let input = document.createElement('INPUT');
  let button = document.createElement('BUTTON');
  button.className = className;
  input.placeholder = 'Input Item';
  input.id = 'item';
  button.innerText = 'Add';
  button.onclick = addItem;
  document.getElementById('div').appendChild(input);
  document.getElementById('div').appendChild(button);
}

const displayTodo = function(){
  let text = this.responseText;
  text = JSON.parse(text);
  let buttonId = 0;
  text.forEach((todo)=>{
    let title = document.createElement('p');
    let description = document.createElement('p');
    let br = document.createElement('br');
    let button = document.createElement('BUTTON');
    button.className=buttonId;
    button.innerText = 'Delete';
    button.onclick = deleteTodo;
    title.className=buttonId;
    title.onclick = createAddItemButton;
    title.innerText = todo.title;
    description.innerText = todo.description;
    buttonId++;
    document.getElementById('div').appendChild(title);
    document.getElementById('div').appendChild(description);
    document.getElementById('div').appendChild(button);
    document.getElementById('div').appendChild(br);
  })
}

const loadData = function(){
  let method = 'POST';
  let url = '/onDataRequest';
  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  let emptyArray = [];
  let data = `title=${title}&description=${description}`;
  sendRequest(method,url,displayTodo,data);
}

const sendRequest = function(method,url,displayTodo,data){
  let xReq = new XMLHttpRequest();
  xReq.open(method,url);
  xReq.addEventListener('load',displayTodo);
  xReq.send(data);
}

window.onload = loadData;

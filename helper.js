const fs = require('fs')

function creatFileIfNotExist(filePath){
    const isExist = fs.existsSync(filePath)
    if(!isExist){
        fs.writeFileSync(filePath, JSON.stringify([]))
    }
}

function parseArgs(options){
    const parsedOptions = options.reduce((cum , elm , index , arr) => {
        const [optionKey , optionValue] = elm.split('=')
        cum[optionKey] = optionValue
        return cum 
    },{})

    return parsedOptions
}

function add(parsedOptions){
    try{
    const todos = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    const todo = {
        id : todo.length + 1 ,
        title : parsedOptions.title ,
        body : parsedOptions.body ,
        checked : Boolean(parsedOptions.check)
    };
    todos.push(todo)
    fs.readFileSync("./db.json" , JSON.stringify(todos , null , 2))
}catch (err){
    console.log(err)
}
}

function list(){
    const todos = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    const checkedTodos = todos.filter(function (todo) {
        if (todo.checked) {
          return todo;
        }
      });
      const uncheckedTodos = todos.filter(function (todo) {
        if (!todo.checked) {
          return todo;
        }
      });
      if (parsedOptions[0] == "all") {
        console.log(todos);
      } else if (parsedOperationContent.check == "checked") {
        console.log(checkedTodos);
      } else if (parsedOperationContent.check == "unchecked") {
        console.log(uncheckedTodos);
      }

}

function edit(){
    try{
        const todos = JSON.parse(fs.readFileSync("./db.json","utf-8"))
        let todoId = parsedOptions.id 
        const todoWithTodoID = todos.find(({ id }) => id == todoId);
        const todoWithTodoIDIndex = todos.findIndex(({ id }) => id == todoId);
        todos.splice(todoWithTodoIDIndex, 1);
        let title = parsedOptions.title;
        let body = parsedOptions.body;
        todoWithTodoID.title = title;
        todoWithTodoID.body = body;
        todos.push(todoWithTodoID);
        fs.writeFileSync("./db.json", JSON.stringify(todos, null, 2));
    }catch (err) {
        console.log(err);
      }
}

function remove(){
    try{
        const todos = JSON.parse(fs.readFileSync("./db.json","utf-8"))
        let todoId = parsedOptions.id;
        const todoWithTodoIDIndex = todos.findIndex(({ id }) => id == todoId);
        todos.splice(todoWithTodoIDIndex, 1);
        fs.writeFileSync("./db.json", JSON.stringify(todos, null, 2));
      } catch (err) {
        console.log(err);
      }
}

function check(){
    const todos = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let todoId = parsedOptions.id;
    const todoWithTodoID = todos.find(({ id }) => id == todoId);
    console.log(todoWithTodoID);
    let todoStat = todoWithTodoID.checked;
    todoStat ? console.log(`The todo with (id=${todoId}) is selected`) : (todoWithTodoID.checked = true);
    console.log(todoWithTodoID);
}

function uncheck(){
    const todos = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let todoId = parsedOperationContent.id;
    const todoWithTodoID = todos.find(({ id }) => id == todoId);
    let todoStat = todoWithTodoID.checked;
    todoStat ? (todoWithTodoID.checked = false) : console.log(`The todo with (id=${todoId}) is already un selected`);
    console.log(todoWithTodoID);
}

module.exports = {
    add , edit , list , remove , check , uncheck , parseArgs , creatFileIfNotExist
}
const linkToRawData =
  "https://gist.githubusercontent.com/abashkirtsev/a6fc2f8ea52db4d5edaff33eebc809ae/raw/56bf63da5cc3a389ecff47d4624a7e58223c0708/todos.json";

function networkDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// load DTO from server and transform to internal format
export async function getTodos() {
  const response = await fetch(linkToRawData);
  const data = await response.json();
  const todos = data.items.reduce((acc, item, i) => {
    acc[i] = {
      text: item.text,
      checked: item.checked
    };
    return acc;
  }, {});
  return { todos, version: data.version };
}

// get data in internal format, build DTO and send it to server
export async function putTodos(todos, version) {
  await networkDelay(5000);
  const newTodos = Object.values(todos).reduce((acc, value, id) => {
    acc[id] = value;
    return acc;
  }, {});
  return { todos: newTodos, version: version + 1 };
}

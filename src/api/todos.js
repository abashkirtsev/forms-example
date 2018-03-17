function networkDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// load DTO from server and transform to internal format
export async function getTodos() {
  await networkDelay(1000);
  const todos = {
    1: {
      text: "Create todo app",
      checked: true
    },
    2: {
      text: "Add resetting and saving",
      checked: false
    }
  };
  return { todos, version: 1 };
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

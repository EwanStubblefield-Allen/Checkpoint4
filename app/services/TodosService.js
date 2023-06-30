import { AppState } from "../AppState.js"
import { Todo } from "../models/Todo.js"
import { api } from "./AxiosService.js"

class TodosService {
  async getTodos() {
    const res = await api.get('api/todos')
    let todoArr = res.data.map(t => new Todo(t))
    AppState.todos = todoArr
  }

  async createTodo(data) {
    const res = await api.post('api/todos', data)
    let newTodo = new Todo(res.data)
    AppState.todos.push(newTodo)
    AppState.emit('todos')
  }

  async editTodo(todoId) {
    let todos = AppState.todos
    let foundIndex = todos.findIndex(t => t.id == todoId)
    let foundTodo = todos[foundIndex]
    const res = await api.put(`api/todos/${todoId}`, { completed: !foundTodo.completed })
    let newTodo = new Todo(res.data)
    todos.splice(foundIndex, 1, newTodo)
    AppState.emit('todos')
  }

  async deleteTodo(todoId) {
    const res = await api.delete(`api/todos/${todoId}`)
    let todos = AppState.todos
    let foundIndex = todos.findIndex(t => t.id == todoId)
    todos.splice(foundIndex, 1)
    AppState.emit('todos')
  }
}

export const todosService = new TodosService()
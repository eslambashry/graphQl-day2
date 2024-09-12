import {todoModel} from '../../Models/todo.js'


export const todoQueries ={

async  todos(){
    const todo = await todoModel.find()
    return todo;
  }
}
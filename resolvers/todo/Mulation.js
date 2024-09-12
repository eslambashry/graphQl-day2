import { todoModel } from "../../Models/todo.js"





export const todoMutaions={

    async addTodo(_,args){
        
        console.log(args.todo);
            
        let newTodo = await todoModel.create(args.todo)

        if(!newTodo){
            throw new Error('Confilect data')
        }
        return {message:"Todo Added Successfully",newTodo}
    },
  async  deleteTodo(_,args,context){

    if(context.user){
        
        const selectedTodo = await todoModel.findByIdAndDelete({_id:args.id})
        return 'Todo deleted'

    }
    else{
        return 'u r not authorized'
    }
    }
}
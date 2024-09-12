
export const schema = `#graphql
    type Todo {
        _id: ID
        title: String
        status: String
    }

    type User {
        _id: ID
        userName: String!
        email: String!
    }

    type Query {
        users: [User]!
        todos: [Todo]!
    }

    type Mutation{
        register(user:userInput):User!
        login(user:userlogin):loginResponse
        addTodo(todo:todoInput):Todo!
        deleteTodo(id:ID):String!
    }

    input userInput{
        userName:String!
        email:String!
        password: String!
        role: String
    }

    input userlogin{
        email: String!
        password: String!
    }

    type loginResponse{
        token: String
        refreshToken: String
    }

    input todoInput{
        title:String!
        status:statusEnum
        userId: ID!
    }

    enum statusEnum {
        Todo
        In_Prograss
        Completed
    }

`;



import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers/app.js";
import dotenv from "dotenv";
import Util from 'util'
import jwt  from 'jsonwebtoken';

const port = 8080


dotenv.config()
const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    // formatError:(err)=>{
    //     return {message:err.message}
    // }               
})


mongoose.connect('mongodb://localhost:27017/Note-App-W-GraphQL')
.then(()=>{
    console.log("DB Connected Successfully ✔️");   
}).catch((err)=>{
    console.log(err,"Connection Fail 💢")
})

const verifyToken = Util.promisify(jwt.verify);


startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
        const { authorization } = req.headers;

        if (authorization) {
            try {
                // Use await to handle the promise returned by verifyToken
                const decoded = await verifyToken(authorization, process.env.TOKEN_SECRET);
                console.log(decoded);
                return { user: decoded };
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    console.error('JWT expired:', err.expiredAt);
                    // Handle token expiration by returning a message or empty context
                    return { error: 'Token expired' };
                } else {
                    console.error('Token verification failed:', err.message);
                    return { error: 'Invalid token' };
                }
            }
        } else {
            return {};
        }
    }
})
.then(() => {
    console.log(`Server Running On ${port} 👌`);
})
.catch((err) => {
    console.log(err, "Fail To Run Server 💢");
});
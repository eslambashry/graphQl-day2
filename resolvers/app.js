import { userQueries } from "./user/Query.js";
import { userMutaion } from "./user/Mulation.js";
import { todoMutaions } from "./todo/Mulation.js";
import { todoQueries } from "./todo/Query.js";

export const resolvers = {
    Query: {
        ...userQueries,
        ...todoQueries
    },

    Mutation:{
        ...userMutaion,
        ...todoMutaions
    }
}
import {userModel} from '../../Models/user.js'

export const userQueries = {
  
  
    async  users(){
      const users = await userModel.find()
      return users;
    }



}
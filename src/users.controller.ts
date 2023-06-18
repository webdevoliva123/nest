import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';

import { CreateUserDTO } from './dto/createUser.dto';

// database
let database = [];

@Controller('/user')
export class UserController {
  // create user
  @Post('/new')
  async createUser(@Body() body: CreateUserDTO) {
    // added in user data
    await database.push({
      id: database.length + 1,
      name: body.name,
      age: body.age,
    });
    return {
      sucess: true,
      message: 'User created successfully',
    };
  }

  // all users
  @Get('/all')
  async getUsers() {
    return {
      sucess: true,
      message: 'list of all users',
      users: database,
    };
  }

  //   update user
  @Put('/update/:id')
  async updateUser(@Param('id') param: string,@Body() body : any) {

  
    
    // check already exists
    const checkAlreadyExists = database.map((user : any,idx : number) => {
        if(param === user?.id){
            return true;
        }
    })

    if(checkAlreadyExists.length === 0){
        return {
            success : false,
            error : "This user is not existing"
        }
    }

    // update data
    database = database.map((user : any,idx : number) => {


        if(param === user?.id){
            console.log(user);
            return {id: user.id, name : body.name, age : body.age}
        }else{
            user
        }
    });

    console.log(database);
    

    return{
        sucess : true,
        message : "User Data is updated"
    }
     
  }
}

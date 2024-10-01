//create mini-express app
const { request, response } = require('express');
const exp=require('express');
const UserAPI= exp.Router();

require('dotenv').config()

//import express-async-handler
const expressAsyncHandler= require('express-async-handler');

//import bcryptjs
const bcryptjs= require('bcryptjs');

//import jwt
const jwt= require('jsonwebtoken');

//body parser
UserAPI.use(exp.json())

//get all users

UserAPI.get('/get-users',expressAsyncHandler(async(request,response)=>{
    //get user collection object
    const UserCol=request.app.get('UserCol');

    let usersList= await UserCol.find().toArray()
    usersList.map(user=>delete user.password)
    response.status(200).send({message:'Users List',payload:usersList})
}))



//get user by userID

UserAPI.get('/get-user/:id',expressAsyncHandler(async(request,response)=>{
    //get user collection object
    const UserCol=request.app.get('UserCol');

    //get user id from URL
    let userId=+request.params.id;

    let user= await UserCol.findOne({id:userId})
    if(user===null){
        response.status(200).send({message:'User Not Found'})
    }else{
    delete user.password
    response.status(200).send({message:'One User Found',payload:user})
    }
}))


//get user by username

UserAPI.get('/get-username/:username',expressAsyncHandler(async(request,response)=>{
    //get user collection object
    const UserCol=request.app.get('UserCol');

    //get username from URL
    let usernameFromURL=request.params.username;

    const userOfDB= await UserCol.findOne({username:usernameFromURL})
    //if user doesn't exist
    if(userOfDB===null){
       response.status(200).send({message:'User Not Found'})
    }//if user existed
    else{
        delete userOfDB.password
        response.status(200).send({message:'One User Found',payload:userOfDB})
    }
}))



//User Signup (create user)

UserAPI.post('/register',expressAsyncHandler(async(request,response)=>{
    //get user collection object
    const UserCol=request.app.get('UserCol');

    //get user object
    let newUser=request.body;

    let userOfDb= await UserCol.findOne({username:newUser.username})
    //if user already exists
    if(userOfDb!==null){
        response.status(200).send({message:'User already exists'})
    }
    //if user doesn't exist
    else{
        //hash password
        let hashedPassword= await bcryptjs.hash(newUser.password,5);

        //replace plain password with hashed password
        newUser.password=hashedPassword;

        //insert the user
        await UserCol.insertOne(newUser)
        response.status(201).send({message:'User Created'})
    }
}))



// User Login

UserAPI.post('/login',expressAsyncHandler(async(request,response)=>{
    //get user collection object
    const UserCol=request.app.get('UserCol');

    //get user details from request
    let userCred=request.body;

    //verify username
    let userVer= await UserCol.findOne({username:userCred.username})

    //if username is invalid
    if(userVer===null){
        response.status(200).send({message:'Invalid Username'})
    }
    //if username is valid
    else{
        //verify password
        let isEqual=await bcryptjs.compare(userCred.password,userVer.password);
        //if passwords don't match
        if(isEqual===false){
            response.status(200).send({message:'Invalid Password'})
        }
        //if passwords match
        else{
            //create a JWT Token
            let jwToken= jwt.sign({username:userVer.username},process.env.SECRET_KEY,{expiresIn:20})
            //send token in response
            delete userVer.password;
            response.status(200).send({message:'success',token:jwToken,user:userVer})
        }
    }
}))



// user update

UserAPI.put('/update-user',expressAsyncHandler(async(request,response)=>{
    //get user collection object
    const UserCol=request.app.get('UserCol');

    //get updated user object
    let UpdatedUser=request.body;

    //hash password
    let hashPass= await bcryptjs.hash(UpdatedUser.password,5);

    //replace plain password with hashed password
    UpdatedUser.password=hashPass;

    //update the user
    await UserCol.updateOne({id:UpdatedUser.id},{$set:{...UpdatedUser}})
    response.status(200).send({message:'User Updated'})
}))



//user delete

UserAPI.delete('/delete-user/:id',expressAsyncHandler(async(request,response)=>{
    //get user collection object
    const UserCol=request.app.get('UserCol');

    //get user id from URL
    let deleteUserId= +request.params.id;

    await UserCol.deleteOne({id:deleteUserId})
    response.status(200).send({message:'User Deleted'})
}))


module.exports=UserAPI;
const User = require("../model/user");
const Utils = require("../utils");

const getAllUsers = async (req, res, next)=>{
    let users;
    try {
        users = await User.find();   
    } catch (error) {
        return res.status(422).json({error});
    }
    if(!users){
        return res.status(422).json({'error': 'Unable to fetch Users'});
    }else{
        return res.status(200).json({users});
    }
};

const getUser = async (req, res, next)=>{
    let user;
    const id = req.params.id;
    try {
        user = await User.findById(id);   
    } catch (error) {
        return res.status(422).json({error});
    }
    if(!user){
        return res.status(422).json({'error': 'Unable to fetch User'});
    }else{
        return res.status(200).json({user});
    }
};

const createUser = async (req, res, next)=>{
    const {name, email, password} = req.body;
    if(Utils.validateText(name) || Utils.validateText(email) || Utils.validatePassword(password)){
        res.status(422).json({'error': 'Missing required fields'});
    }else{
        let user;
        try {
            user = new User(
            {name,email,password}
            );
            user = await user.save();
        } catch (error) {
            return res.status(422).json({'error': error});
        }
        if(!user){
            return res.status(422).json({'error': 'Sign up failed!'});
        }else{
            return res.status(201).json({user});
        }
    }
};

const deleteUser = async (req, res, next)=>{
    const id = req.params.id;
    let user;
        try {
            user = await User.findByIdAndDelete(id);
        } catch (error) {
            return res.status(422).json({'error': error});
        }
        if(!user){
            return res.status(422).json({'error': 'User does not exist'});
        }else{
            return res.status(200).json({'message': 'User deleted successfully'});
        }
};

const updateUserName = async (req, res, next)=>{
    const id = req.params.id;
    const {name} = req.body;
    if(Utils.validateText(name)){
        return res.status(422).json({'error': 'Missing required fields'});
    }else{
        let user;
        try {
            user = await User.findByIdAndUpdate(id, {name});
            user = await User.findById(id);
        } catch (error) {
            return res.status(422).json({'error': error});
        }
        if(!user){
            return res.status(422).json({'error': 'Update failed!'});
        }else{
            return res.status(200).json({user});
        }
    }
};

const updatePassword = async (req, res, next)=>{
    const id = req.params.id;
    const {password} = req.body;
    console.log(Utils.validatePassword(password));
    if(Utils.validateText(password)){
        return res.status(422).json({'error': 'Missing required fields'});
    }else if(Utils.validatePassword(password)){
        return res.status(422).json({'error': 'Invalid password'});
    }else{
        let user;
        try {
            user = await User.findByIdAndUpdate(id, {password});
            user = await User.findById(id);
        } catch (error) {
            return res.status(422).json({'error': error});
        }
        if(!user){
            return res.status(422).json({'error': 'Update failed!'});
        }else{
            return res.status(200).json({user});
        }
    }
};


const login = async (req, res, next)=>{
    const {email, password} = req.body;
    if(Utils.validateText(email) || Utils.validateText(password)){
        return res.status(422).json({'error': 'Missing required fields'});
    }else if(Utils.validatePassword(password)){
        return res.status(422).json({'error': 'Invalid password'});
    }else{
        let user;
        try {
            user = await User.findOne({email: email});
        } catch (error) {
            return res.status(422).json({'error': error});
        }
        if(!user){
            return res.status(422).json({'error': 'User does not exist!'});
        }else{
            if(user.password === password){
                return res.status(200).json({user});
            }else{
                return res.status(422).json({error: 'Incorrect username/password'});
            }
        }
    }
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUserName = updateUserName;
exports.updatePassword = updatePassword;
exports.deleteUser = deleteUser;
exports.login = login;

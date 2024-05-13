const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Faltan datos");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("Ya existe un usuario con ese email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    res.status(201).json({
        message: "Usuario registrado exitosamente",
        error: false,
        user: user
    })
});
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id),
            error: false
        })
    }
    else
    {
        res.status(401);
        throw new Error("Credenciales incorrectas");
    }
});
const generarToken = (idUsuario) => {
    return jwt.sign({idUsuario}, process.env.JWT_SECRET, {
        expiresIn: '3h'
    });
} 
const showData = asyncHandler(async (req, res) => {
    res.status(200).json(req.user); 
});

const forgotPassword = asyncHandler(async(req, res) => {
    const email = req.body.email
    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error('No se encontró el usuario');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const userActualizado = await User.findByIdAndUpdate(user.id, {name: user.name, email: req.body.email, password:hashedPassword}, {new: true});
    res.status(200).json({datos: userActualizado, message: "Se actualizaron los datos"});
})
const modificarUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404);
        throw new Error('No se encontró el usuario');
    }
    const email = req.body.email
    const userExist = await User.findOne({email});

    if(userExist && !user.equals(userExist)){
        res.status(400);
        throw new Error("Ya existe un usuario con ese email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const userActualizado = await User.findByIdAndUpdate(req.user.id, {name: req.body.name, email: req.body.email, password:hashedPassword}, {new: true});
    res.status(200).json({datos: userActualizado, message: "Se actualizaron los datos"});
});
const borrarUser = asyncHandler( async (req, res) => {
    const userBorrado = await User.findById(req.user.id);
    if(!userBorrado){
        res.status(404);
        throw new Error('No se encontró el usuario');
    }
    if(await bcrypt.compare(req.body.password, userBorrado.password)){
        await User.deleteOne(userBorrado);
        res.status(200).json({message: `La cuenta se eliminó con éxito`, error: false});
    }
    res.status(400);
    throw new Error("Contraseña incorrecta");
});
const showAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})
module.exports = {
    register, login, showData, modificarUser, borrarUser, showAllUsers, forgotPassword
}
const asyncHandler = require("express-async-handler");
const Servicio = require("../models/serviceModel");

const getServicio = asyncHandler( async (req, res) => {
    const servicios = await Servicio.find({user: req.user.id});
    res.status(200).json(servicios);
});

const crearServicio = asyncHandler( async (req, res) => {
    if(!req.body.tipo || !req.body.nombre || !req.body.cantidad ||!req.body.precio ||!req.body.fecha){
        res.status(400);
        throw new Error('Faltan datos');
    }
    const servicio = await Servicio.create({
        nombre : req.body.nombre,
        cantidad: req.body.cantidad,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion ? req.body.descripcion : "-",
        precio: req.body.precio,
        fecha: req.body.fecha,
        user: req.user.id,
    })
    res.status(201).json({servicio: servicio, message: "Servicio agregado"});
});

const modificarServicio = asyncHandler( async (req, res) => {
    const servicio = await Servicio.findById(req.params.id);
    if(!servicio){
        res.status(404);
        throw new Error('No se encontró el servicio');
    }
    const servicioActualizado = await Servicio.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(servicioActualizado);
});

const borrarServicio = asyncHandler( async (req, res) => {
    const servicioBorrado = await Servicio.findById(req.params.id);
    if(!servicioBorrado){
        res.status(404);
        throw new Error('No se encontró el servicio');
    }
    await Servicio.deleteOne(servicioBorrado);
    res.status(200).json({message: `Se eliminó el servicio con id: ${req.params.id}`});
});
module.exports = {
    getServicio, crearServicio, modificarServicio, borrarServicio
}
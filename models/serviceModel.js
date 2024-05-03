const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre del servicio"]
    },
    tipo: {
        type: String,
        required: [true, "Por favor ingrese el tipo de servicio"]
    },
    cantidad: {
        type: Number,
        integer: true,
        required: [true, "Ingrese una cantidad"]
    },
    descripcion: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model("Service", serviceSchema)
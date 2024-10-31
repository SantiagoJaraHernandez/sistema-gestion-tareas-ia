const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Tarea = sequelize.define('Tarea', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    importancia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estimacion_tiempo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Tarea;

const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Asegúrate de que esta ruta apunte a tu archivo de configuración de Sequelize

const Tarea = sequelize.define('Tarea', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'),
        defaultValue: 'pendiente',
        allowNull: false,
    },
    importancia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
        validate: {
            min: 1,
            max: 5
        }
    },
    tiempo_estimado: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    }
});

module.exports = Tarea;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e293b',      // Un gris oscuro para los fondos
        secondary: '#f43f5e',    // Un tono de rojo oscuro para destacar elementos importantes
        accent: '#64748b',       // Un gris azulado para los detalles
        background: '#111827',   // Fondo muy oscuro
        text: '#E5E7EB',         // Texto claro para resaltar sobre el fondo oscuro
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

// Fs de Node permite acceder al filesystem y crear archivos
const fs = require('fs');

// Creamos un archivo .env en el servidor con el contenido del segundo parámetro de writeFileSync, que es la variable que debemos crear en Netlify manualmente
fs.writeFileSync('./.env', `API=${process.env.API}\n`);
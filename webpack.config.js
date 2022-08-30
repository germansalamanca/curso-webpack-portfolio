//'path' ya está disponible en node, no hay que instalar la dependencia
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Aquí vamos a tener la configuración
module.exports = {
  // el punto de entrada de nuestra app
  entry: './src/index.js',
  // Output es hacia dónde vamos a enviar lo que va a preparar webpack. Puede ser un nombre de carpeta o de archivo. En este caso es dist, que se referencia con psth.resolve
  output: {
    // Aquí usamos path para usar su 'método' resolve, que nos permite identificar el directorio de nuestro proyecto
    path: path.resolve(__dirname, 'dist'), // 'dist' es el estandar
    // El resultante donde se va a unificar el js
    filename: 'main.js'
  },
  // Con qué extensiones vamos a trabajar
  resolve: {
    extensions: ['.js']
  },
  // Añadimos module si queremos usar babel
  module: {
    rules: [
      {
        // Qué extensiones vamos a usar
        // Todo lo que empiece por 'mjs' ó 'js' (cierra: '$') (cierra expresión: '/') (Se definen con expresiones regulares) (mjs es extensión de módulos) 
        test: /\.m?js$/,
        // Excluír la carpeta node_modules porque si no, se rompe
        exclude: /node_modules/,
        // le pasamos el loader que vamos a usar, babel
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  // Aquí vamos a poner el plugin de html
  plugins: [
    new HtmlWebpackPlugin({
      // Para que haga la inserción de los elementos
      inject: true,
      // le pasamos el index de nuestra app
      template: './public/index.html',
      // El template lo va a poner en la carpeta dist como index.html, de acuerdo a como lo configuremos
      filename: './index.html'
    })
  ]
}
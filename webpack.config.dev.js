//'path' ya está disponible en node, no hay que instalar la dependencia
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Llamamos al plugin de css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Para copy
const CopyPlugin = require('copy-webpack-plugin');
// Configurar dotenv
const Dotenv = require('dotenv-webpack');


// Aquí vamos a tener la configuración
module.exports = {
  // el punto de entrada de nuestra app
  entry: './src/index.js',
  // Output es hacia dónde vamos a enviar lo que va a preparar webpack. Puede ser un nombre de carpeta o de archivo. En este caso es dist, que se referencia con path.resolve
  output: {
    // Aquí usamos path para usar su 'método' resolve, que nos permite identificar el directorio de nuestro proyecto
    path: path.resolve(__dirname, 'dist'), // 'dist' es el estandar
    // El resultante donde se va a unificar el js
    //filename: 'main.js',
    // Pero ahora con un hash:
    filename: '[name].[contenthash].js', // Esto también se lo vamos a poner a las fuentes
    // Esto es para las imágenes pero no lo explicó bien: es para que mueva las img dentro de assets (clase 11) 
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  // Con qué extensiones vamos a trabajar
  resolve: {
    extensions: ['.js'],
    // Clase 13: Alias: Aquí vamos a crear los alias para utils, templates, estilos e imágenes
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
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
      },
      // Ahora la rregla para css (Y preprocesador stylus)
      {
        // Todo lo que empiece por '.css'
        // test: /\.css$/i,
        // Ahora para que reconozca archivos de stylus '.styl'
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, 
        'css-loader',
        // Agregamos el loader de stylus
        'stylus-loader'
        ]
      },
      // Agregamos la regla para las imágenes
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      // Regla para optimizar las fuentes que usamos localmente y ya no de gugol
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false
          }
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
    }),
    new MiniCssExtractPlugin({
      // Para que el nombre tenga el hash
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"), // Usamos el path que ya definimos
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
  ],
}
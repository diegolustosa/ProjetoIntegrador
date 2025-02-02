const { SerialPort } = require('serialport');
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index.routes');
const dotenv = require('dotenv');


dotenv.config(); 
app.use(express.json());
app.use(cors());  


app.use('/api', routes);


// const porta = 'COM5';  
// const baudRate = 9600; 


// const port = new SerialPort({ path: porta, baudRate: baudRate });


// port.on('open', () => {
//   console.log('Porta serial aberta com sucesso!');
// });


// port.on('data', (data) => {
//   console.log('Dados recebidos:', data.toString());
// });


// port.on('error', (err) => {
//   console.error('Erro na porta serial:', err.message);
// });
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
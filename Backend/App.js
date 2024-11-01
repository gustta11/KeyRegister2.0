import express from 'express';
import router from './routes/DocenteRotas.js'; // Caminho para o arquivo com as rotas

function App() {
    const app = express(); 

    app.use(express.json());
    app.use('/api', router); 

    return app; 
    
}

export default App; 

const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3333; // porta padrão
const mysql = require('mysql');
var cors = require('cors');

app.use(cors('*'));

// função que executa as queries
function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : 'password',
      database : 'HospitalMysql'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }

// configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// inicia o servidor
app.listen(port);
console.log('API funcionando!');

// definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'API ONLINE!' }));
app.use('/', router);


// rotas de clientes
// rota para listar todos clientes
router.get('/hospital', (req, res) =>{
    execSQLQuery('SELECT * FROM Hospital', res);
})
// rota para listar cliente por id
router.get('/hospital/:Cod_Hospital?', (req, res) =>{
    let filter = '';
    if(req.params.Cod_Hospital) filter = ' WHERE Cod_Hospital=' + parseInt(req.params.Cod_Hospital);
    execSQLQuery('SELECT * FROM Hospital' + filter, res);
})
// rota para deletar um cliente por id
router.delete('/hospital/:Cod_Hospital', (req, res) =>{
    execSQLQuery('DELETE FROM Hospital WHERE Cod_Hospital=' + parseInt(req.params.Cod_Hospital), res);
})
// rota para criar um novo cliente
router.post('/hospital', (req, res) =>{
    const Nome = req.body.Nome.substring(0,254);
    const Endereco = req.body.Endereco.substring(0,254);
    execSQLQuery(`INSERT INTO Hospital(Nome, Endereco) VALUES('${Nome}','${Endereco}')`, res);
});
// rota para atualizar um cliente
router.patch('/hospital/:Cod_Hospital', (req, res) =>{
    const Cod_Hospital = parseInt(req.params.Cod_Hospital);
    const Nome = req.body.Nome.substring(0,254);
    const Endereco = req.body.Endereco.substring(0,254);
    execSQLQuery(`UPDATE Hospital SET Nome='${Nome}', Endereco='${Endereco}' WHERE ID=${Cod_Hospital}`, res);
})

// rotas de setores
// rota para listar todos setores
router.get('/hospital/:Cod_Hospital/sector', (req, res) =>{
  execSQLQuery('SELECT * FROM Sector WHERE Cod_Hospital=' + parseInt(req.params.Cod_Hospital), res);
})
// rota para listar setor por id
router.get('/hospital/:Cod_Hospital/sector/:Cod_Setor?', (req, res) =>{
  let filter = '';
  if(req.params.Cod_Setor) filter = ' AND Cod_Setor=' + parseInt(req.params.Cod_Setor);
  execSQLQuery('SELECT * FROM Sector WHERE Cod_Hospital=' + parseInt(req.params.Cod_Hospital) + filter, res);
})
// rota para deletar um setor por id
router.delete('/hospital/:Cod_Hospital/sector/:Cod_Setor', (req, res) =>{
  execSQLQuery('DELETE FROM Sector WHERE Cod_Hospital=' + parseInt(req.params.Cod_Hospital) +' AND Cod_Setor=' + parseInt(req.params.Cod_Setor), res);
})
// rota para criar um novo setor
router.post('/hospital/:Cod_Hospital/sector', (req, res) =>{
  const Nome_Setor = req.body.Nome_Setor.substring(0,254);
  const Cod_Hospital = req.params.Cod_Hospital;
  execSQLQuery(`INSERT INTO Sector(Nome_Setor, Cod_Hospital) VALUES('${Nome_Setor}','${Cod_Hospital}')`, res);
});
// rota para atualizar um setor
router.patch('/hospital/:Cod_Hospital/sector/:Cod_Setor', (req, res) =>{
  const Cod_Hospital = parseInt(req.params.Cod_Hospital);
  const Cod_Setor = parseInt(req.params.Cod_Setor);
  const Nome_Setor = req.body.Nome_Setor.substring(0,254);
  execSQLQuery(`UPDATE Sector SET Cod_Hospital='${Cod_Hospital}', Nome_Setor='${Nome_Setor}' WHERE Cod_Setor=${Cod_Setor}`, res);
})

// rotas de funcionarios
// rota para listar todos funcionarios
router.get('/employee', (req, res) =>{
  execSQLQuery('SELECT * FROM Employee', res);
})
// rota para listar funcionario por id
router.get('/employee/:Cod_Funcionario?', (req, res) =>{
  let filter = '';
  if(req.params.Cod_Funcionario) filter = ' WHERE Cod_Funcionario=' + parseInt(req.params.Cod_Funcionario);
  execSQLQuery('SELECT * FROM Employee' + filter, res);
})
// rota para deletar um funcionario por id
router.delete('/employee/:Cod_Funcionario', (req, res) =>{
  execSQLQuery('DELETE FROM Employee WHERE Cod_Funcionario=' + parseInt(req.params.Cod_Funcionario), res);
})
// rota para criar um novo funcionario
router.post('/employee', (req, res) =>{
  const Nome = req.body.Nome.substring(0,254);
  if(req.body.Data_Admissao){
    var Data_Admissao = new Date(req.body.Data_Admissao).toISOString().replace(/\T.+/, '');
  }else{
    var Data_Admissao = new Date().toISOString().replace(/\T.+/, '');
  }
  const Cod_Setor = req.body.Cod_Setor;
  if(req.body.Medico){
    var Medico = 1;
  }else{
    var Medico = 0;
  }
  

  execSQLQuery(`INSERT INTO Employee(Nome, Data_Admissao, Cod_Setor, Medico) VALUES('${Nome}','${Data_Admissao}','${Cod_Setor}','${Medico}')`, res);
  console.log(res);
  if(Medico){
    console.log('criar medico');
  }
});
// rota para atualizar um funcionario
router.patch('/employee/:Cod_Funcionario', (req, res) =>{
  const Cod_Funcionario = parseInt(req.params.Cod_Funcionario);
  const Nome = req.body.Nome.substring(0,254);
  const Data_Admissao = new Date();
  const Cod_Setor = req.body.Cod_Setor;
  const Medico = req.body.Medico;
  execSQLQuery(`UPDATE Employee SET Nome='${Nome}', Data_Admissao='${Data_Admissao}', Cod_Setor='${Cod_Setor}', Data_Admissao='${Medico}' WHERE Cod_Funcionario=${Cod_Funcionario}`, res);
  if(Medico){
    console.log('criar medico');
  }
})

//rota teste funcionario com setor
router.get('/employee/:Cod_Funcionario/sector', (req, res) =>{
  execSQLQuery('SELECT * FROM Employee e JOIN Sector s ON e.Cod_Setor = s.Cod_Setor WHERE e.Cod_Funcionario=' + parseInt(req.params.Cod_Funcionario), res);
})
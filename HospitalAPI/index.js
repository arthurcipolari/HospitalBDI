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
      password : '',
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


//---------------------------------
//------------HOSPITAIS------------
//---------------------------------

// rota para listar todos hospitais
router.get('/hospital', (req, res) =>{
    execSQLQuery('SELECT * FROM Hospital', res);
})
// rota para listar hospital por id
router.get('/hospital/:Cod_Hospital?', (req, res) =>{
    let filter = '';
    if(req.params.Cod_Hospital) filter = ' WHERE Cod_Hospital=' + parseInt(req.params.Cod_Hospital);
    execSQLQuery('SELECT * FROM Hospital' + filter, res);
})
// rota para deletar um hospital por id
router.delete('/hospital/:Cod_Hospital', (req, res) =>{
    execSQLQuery('DELETE FROM Hospital WHERE Cod_Hospital=' + parseInt(req.params.Cod_Hospital), res);
})
// rota para criar um novo hospital
router.post('/hospital', (req, res) =>{
    const Nome = req.body.Nome.substring(0,254);
    const Endereco = req.body.Endereco.substring(0,254);
    execSQLQuery(`INSERT INTO Hospital(Nome, Endereco) VALUES('${Nome}','${Endereco}')`, res);
});
// rota para atualizar um hospital
router.patch('/hospital/:Cod_Hospital', (req, res) =>{
    const Cod_Hospital = parseInt(req.params.Cod_Hospital);
    const Nome = req.body.Nome.substring(0,254);
    const Endereco = req.body.Endereco.substring(0,254);
    execSQLQuery(`UPDATE Hospital SET Nome='${Nome}', Endereco='${Endereco}' WHERE ID=${Cod_Hospital}`, res);
})

//-------------------------------
//------------SETORES------------
//-------------------------------

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

//-----------------------------------
//------------FUNCIONARIO------------
//-----------------------------------

// rota para listar todos funcionarios
router.get('/employee', (req, res) =>{
  execSQLQuery('SELECT * FROM Employee', res);
})
// rota para listar funcionario por id
router.get('/employee/:Cod_Funcionario', (req, res) =>{
  execSQLQuery('SELECT e.Cod_Funcionario, e.Nome, e.Data_Admissao, e.Medico, e.Cod_Setor, d.CRM, d.Especialidade FROM Employee e JOIN Sector s ON e.Cod_Setor = s.Cod_Setor LEFT JOIN Doctor d ON e.Cod_Funcionario = d.Cod_Funcionario WHERE e.Cod_Funcionario =' + parseInt(req.params.Cod_Funcionario), res);
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
  const Medico = req.body.Medico;
  execSQLQuery(`INSERT INTO Employee(Nome, Data_Admissao, Cod_Setor, Medico) VALUES('${Nome}','${Data_Admissao}','${Cod_Setor}','${Medico}')`, res);
});
// rota para atualizar um funcionario
router.patch('/employee/:Cod_Funcionario', (req, res) =>{
  const Cod_Funcionario = parseInt(req.params.Cod_Funcionario);
  const Nome = req.body.Nome.substring(0,254);
  const Cod_Setor = req.body.Cod_Setor;
  const Medico = req.body.Medico;
  execSQLQuery(`UPDATE Employee SET Nome='${Nome}', Cod_Setor='${Cod_Setor}', Medico='${Medico}' WHERE Cod_Funcionario=${Cod_Funcionario}`, res);
})
//rota get funcionario com setor
router.get('/employee/:Cod_Funcionario/sector', (req, res) =>{
  execSQLQuery('SELECT * FROM Employee e JOIN Sector s ON e.Cod_Setor = s.Cod_Setor WHERE e.Cod_Funcionario=' + parseInt(req.params.Cod_Funcionario), res);
})
//rota lista funcionario com info medico e setor
router.get('/hospital/:Cod_Hospital/employee', (req, res) => {
  execSQLQuery('SELECT e.Cod_Funcionario, e.Nome, e.Data_Admissao, e.Cod_Setor, d.CRM, d.Especialidade, s.Nome_Setor FROM Employee e JOIN Sector s ON e.Cod_Setor = s.Cod_Setor LEFT JOIN Doctor d ON e.Cod_Funcionario = d.Cod_Funcionario WHERE Cod_Hospital =' + parseInt(req.params.Cod_Hospital) + ' ORDER BY e.Nome', res);
})

//------------------------------
//------------MEDICO------------
//------------------------------

//rota cria medico
router.post('/employee/:Cod_Funcionario/doctor', (req, res) =>{
  const CRM = req.body.CRM;
  const Especialidade = req.body.Especialidade.substring(0,254);
  const Cod_Funcionario = parseInt(req.params.Cod_Funcionario);
  execSQLQuery(`INSERT INTO Doctor(CRM, Especialidade, Cod_Funcionario) VALUES('${CRM}','${Especialidade}','${Cod_Funcionario}')`, res);
})
// rota para listar medico por id
router.get('/doctor/:Cod_Funcionario?', (req, res) =>{
  let filter = '';
  if(req.params.Cod_Funcionario) filter = ' WHERE Cod_Funcionario=' + parseInt(req.params.Cod_Funcionario);
  execSQLQuery('SELECT * FROM Doctor' + filter, res);
})
// rota para atualizar um medico
router.patch('/doctor/:Cod_Funcionario', (req, res) =>{
  const CRM = req.body.CRM;
  const Especialidade = req.body.Especialidade.substring(0,254);
  const Cod_Funcionario = parseInt(req.params.Cod_Funcionario);
  execSQLQuery(`UPDATE Doctor SET CRM='${CRM}', Especialidade='${Especialidade}' WHERE Cod_Funcionario=${Cod_Funcionario}`, res);
})

//---------------------------------------------------
//------------ROTAS PARA CRIAR INTERNAÇÃO------------
//---------------------------------------------------

//rota listar paciente
router.get('/patients', (req, res) => {
  execSQLQuery(`SELECT * FROM Patient WHERE Cod_Paciente NOT IN ( SELECT Cod_Paciente FROM Hospitalization WHERE Data_Alta IS NULL )`, res)
})
//rota lista medico
router.get('/hospital/:Cod_Hospital/doctors', (req, res) => {
  execSQLQuery('SELECT e.Cod_Funcionario, e.Nome, d.Especialidade FROM Employee e JOIN Sector s ON e.Cod_Setor = s.Cod_Setor INNER JOIN Doctor d ON e.Cod_Funcionario = d.Cod_Funcionario WHERE Cod_Hospital =' + parseInt(req.params.Cod_Hospital) + ' ORDER BY e.Nome', res);
})
//rota listar quartos livres
router.get('/hospital/:Cod_Hospital/rooms', (req, res) => {
  const Cod_Hospital = parseInt(req.params.Cod_Hospital);
  execSQLQuery('SELECT * FROM room r JOIN sector s ON r.Cod_Setor = s.Cod_Setor WHERE s.Cod_Hospital ='+ Cod_Hospital + ' AND r.Em_Uso = 0', res)
})
//rota lista internações
router.get('/hospital/:Cod_Hospital/hospitalizations', (req, res) => {
  const Cod_Hospital = parseInt(req.params.Cod_Hospital);
  execSQLQuery('SELECT h.Cod_Internacao, p.Nome AS Paciente, e.Nome AS Medico, r.Nome_Quarto AS Quarto, s.Nome_Setor AS Localizacao, i.Nome_Convenio AS PlanoSaude,'+
  ' h.Data_Internacao AS Internacao, h.Data_Alta AS Alta FROM Hospitalization h '+ 
  'JOIN Room r ON h.Cod_Quarto = r.Cod_Quarto '+ 
  'JOIN Sector s ON r.Cod_Setor = s.Cod_Setor '+
  'JOIN Patient p ON h.Cod_Paciente = p.Cod_Paciente '+
  'JOIN Employee e ON h.Cod_Medico =  e.Cod_Funcionario '+
  'JOIN Insurance i ON p.Cod_Convenio = i.Cod_Convenio '+
  'WHERE Cod_Hospital = '+ Cod_Hospital, res)
})
//rota cria internação
router.post('/hospitalization/', (req, res) => {
  const Cod_Paciente = req.body.Cod_Paciente;
  const Cod_Medico = req.body.Cod_Medico;
  const Cod_Quarto = req.body.Cod_Quarto;
  if(req.body.Data_Internacao){
    var Data_Internacao = new Date(req.body.Data_Internacao).toISOString().replace(/\T.+/, '');
  }else{
    var Data_Internacao = new Date().toISOString().replace(/\T.+/, '');
  }    
  execSQLQuery(`INSERT INTO Hospitalization(Cod_Paciente, Cod_Medico, Cod_Quarto, Data_Internacao) VALUES('${Cod_Paciente}','${Cod_Medico}','${Cod_Quarto}','${Data_Internacao}')`, res)
})
//rota finaliza internação
router.patch('/hospitalization/:Cod_Internacao', (req, res) => {
  const Cod_Internacao = parseInt(req.params.Cod_Internacao);
  if(req.body.Data_Alta){
    var Data_Alta = new Date(req.body.Data_Alta).toISOString().replace(/\T.+/, '');
  }else{
    var Data_Alta = new Date().toISOString().replace(/\T.+/, '');
  }
  execSQLQuery(`UPDATE Hospitalization SET Data_Alta = '${Data_Alta}' WHERE Hospitalization.Cod_Internacao = '${Cod_Internacao}'`, res)
})

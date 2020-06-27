const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'HospitalMysql'
});



  function createTable(conn, sql, msg){

    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log(msg);
    });
    
}

function tabelaHospital(connection){
    const sql = "CREATE TABLE IF NOT EXISTS Hospital (\n"+
    "Cod_Hospital int NOT NULL AUTO_INCREMENT,\n"+
    "Nome varchar(255) NOT NULL,\n"+
    "Endereco varchar(255) NOT NULL,\n"+
    "PRIMARY KEY (Cod_Hospital)\n"+
    ");";

    let msg = 'criou a tabela hospital!';
    createTable(connection, sql, msg);
    
}

function tabelaSector(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Sector (\n"+
  "Cod_Setor int NOT NULL AUTO_INCREMENT,\n"+
  "Nome_Setor varchar(255) NOT NULL,\n"+
  "Cod_Hospital int NOT NULL,\n"+
  "PRIMARY KEY (Cod_Setor),\n"+
  "KEY Cod_Hospital (Cod_Hospital),\n"+
  "CONSTRAINT Sector_ibfk_1 FOREIGN KEY (Cod_Hospital) REFERENCES Hospital (Cod_Hospital) ON DELETE CASCADE ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela setor!';
  createTable(connection, sql, msg);
}

function tabelaEmployee(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Employee (\n"+
  "Cod_Funcionario int NOT NULL AUTO_INCREMENT,\n"+
  "Nome varchar(255) NOT NULL,\n"+
  "Data_Admissao datetime NOT NULL,\n"+
  "Cod_Setor int NOT NULL,\n"+
  "Medico tinyint(1) NOT NULL,\n"+
  "PRIMARY KEY (Cod_Funcionario),\n"+
  "KEY Cod_Setor (Cod_Setor),\n"+
  "CONSTRAINT Employee_ibfk_1 FOREIGN KEY (Cod_Setor) REFERENCES Sector (Cod_Setor) ON DELETE CASCADE ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela funcionario!';
  createTable(connection, sql, msg);
}

function tabelaRoom(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Room (\n"+
  "Cod_Quarto int NOT NULL AUTO_INCREMENT,\n"+
  "Nome_Quarto varchar(255) NOT NULL,\n"+
  "Cod_Setor int NOT NULL,\n"+
  "Em_Uso tinyint(1) NOT NULL,\n"+
  "PRIMARY KEY (Cod_Quarto),\n"+
  "KEY Cod_Setor (Cod_Setor),\n"+
  "CONSTRAINT Room_ibfk_1 FOREIGN KEY (Cod_Setor) REFERENCES Sector (Cod_Setor) ON DELETE CASCADE ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela quarto!';
  createTable(connection, sql, msg);
}

function tabelaInsurance(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Insurance (\n"+
  "Cod_Convenio int NOT NULL AUTO_INCREMENT,\n"+
  "Nome_Convenio varchar(255) NOT NULL,\n"+
  "PRIMARY KEY (Cod_Convenio)\n"+
  ");";
  
  let msg = 'criou a tabela convenio!';
  createTable(connection, sql, msg);
}

function tabelaEquip(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Equip (\n"+
  "Cod_Equipamento int NOT NULL AUTO_INCREMENT,\n"+
  "Nome_Equipamento varchar(255) NOT NULL,\n"+
  "Descricao varchar(255) NOT NULL,\n"+
  "PRIMARY KEY (Cod_Equipamento)\n"+
  ");";

  let msg = 'criou a tabela equipamento!';
  createTable(connection, sql, msg);
}

function tabelaLocation(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Location (\n"+
  "Cod_Localizacao int NOT NULL AUTO_INCREMENT,\n"+
  "Cod_Quarto int NOT NULL,\n"+
  "Cod_Equipamento int NOT NULL,\n"+
  "PRIMARY KEY (Cod_Localizacao),\n"+
  "KEY Cod_Quarto (Cod_Quarto),\n"+
  "KEY Cod_Equipamento (Cod_Equipamento),\n"+
  "CONSTRAINT Location_ibfk_1 FOREIGN KEY (Cod_Quarto) REFERENCES Room (Cod_Quarto) ON DELETE CASCADE ON UPDATE CASCADE,\n"+
  "CONSTRAINT Location_ibfk_2 FOREIGN KEY (Cod_Equipamento) REFERENCES Equip (Cod_Equipamento) ON DELETE CASCADE ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela localização!';
  createTable(connection, sql, msg);
}

function tabelaDoctor(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Doctor (\n"+
  "CRM int NOT NULL,\n"+
  "Especialidade varchar(255) NOT NULL,\n"+
  "Cod_Funcionario int NOT NULL,\n"+
  "PRIMARY KEY (CRM),\n"+
  "UNIQUE KEY CRM (CRM),\n"+
  "KEY Cod_Funcionario (Cod_Funcionario),\n"+
  "CONSTRAINT Doctor_ibfk_1 FOREIGN KEY (Cod_Funcionario) REFERENCES Employee (Cod_Funcionario) ON DELETE CASCADE ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela medicos!';
  createTable(connection, sql, msg);
}

function tabelaPatient(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Patient (\n"+
  "Cod_Paciente int NOT NULL AUTO_INCREMENT,\n"+
  "CPF bigint NOT NULL,\n"+
  "Nome varchar(255) NOT NULL,\n"+
  "Cod_Convenio int DEFAULT 1,\n"+
  "PRIMARY KEY (Cod_Paciente),\n"+
  "UNIQUE KEY CPF (CPF),\n"+
  "KEY Cod_Convenio (Cod_Convenio),\n"+
  "CONSTRAINT Patient_ibfk_1 FOREIGN KEY (Cod_Convenio) REFERENCES Insurance (Cod_Convenio) ON DELETE SET DEFAULT ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela paciente!';
  createTable(connection, sql, msg);
}

function tabelaReservation(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Reservation (\n"+
  "Cod_Reserva int NOT NULL AUTO_INCREMENT,\n"+
  "Cod_Paciente int DEFAULT NULL,\n"+
  "Cod_Quarto int NOT NULL,\n"+
  "PRIMARY KEY (Cod_Reserva),\n"+
  "KEY Cod_Paciente (Cod_Paciente),\n"+
  "KEY Cod_Quarto (Cod_Quarto),\n"+
  "CONSTRAINT Reservation_ibfk_1 FOREIGN KEY (Cod_Paciente) REFERENCES Patient (Cod_Paciente) ON DELETE CASCADE ON UPDATE CASCADE,\n"+
  "CONSTRAINT Reservation_ibfk_2 FOREIGN KEY (Cod_Quarto) REFERENCES Room (Cod_Quarto) ON DELETE CASCADE ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela reserva!';
  createTable(connection, sql, msg);
}

function tabelaHospitalization(connection){

  const sql = "CREATE TABLE IF NOT EXISTS Hospitalization (\n"+
  "Cod_Internacao int NOT NULL AUTO_INCREMENT,\n"+
  "Cod_Paciente int NOT NULL,\n"+
  "Cod_Medico int,\n"+
  "Cod_Quarto int NOT NULL,\n"+
  "Data_Internacao datetime NOT NULL,\n"+
  "Data_Alta datetime DEFAULT NULL,\n"+
  "PRIMARY KEY (Cod_Internacao),\n"+
  "KEY Cod_Paciente (Cod_Paciente),\n"+
  "KEY Cod_Medico (Cod_Medico),\n"+
  "KEY Cod_Quarto (Cod_Quarto),\n"+
  "CONSTRAINT Hospitalization_ibfk_1 FOREIGN KEY (Cod_Paciente) REFERENCES Patient (Cod_Paciente) ON DELETE RESTRICT ON UPDATE CASCADE,\n"+
  "CONSTRAINT Hospitalization_ibfk_2 FOREIGN KEY (Cod_Medico) REFERENCES Doctor (Cod_Funcionario) ON DELETE SET NULL ON UPDATE CASCADE,\n"+
  "CONSTRAINT Hospitalization_ibfk_3 FOREIGN KEY (Cod_Quarto) REFERENCES Room (Cod_Quarto) ON DELETE CASCADE ON UPDATE CASCADE\n"+
  ");";

  let msg = 'criou a tabela internacao!';
  createTable(connection, sql, msg);
}

function triggerHospitalization(connection){

  const sql = "CREATE TRIGGER `hospitalization_AFTER_INSERT` AFTER INSERT ON `hospitalization` FOR EACH ROW\n"+
   "BEGIN UPDATE room SET Em_Uso = 1 WHERE room.Cod_Quarto = new.Cod_Quarto; END";

  connection.query(sql, function (error, results, fields){
    if(error) return console.log(error);
    console.log('trigger after insert hospitalization criado!');
  });

  const sql2 = "CREATE TRIGGER `hospitalization_AFTER_UPDATE` AFTER UPDATE ON `hospitalization` FOR EACH ROW\n"+
  "BEGIN IF NEW.Data_Alta IS NOT NULL THEN UPDATE room SET Em_Uso = 0 WHERE room.Cod_Quarto = old.Cod_Quarto; END IF; END";

  connection.query(sql2, function (error, results, fields){
    if(error) return console.log(error);
    console.log('trigger after update hospitalization criado!');
  });
}


// function addRows(conn){
//     const sql = "INSERT INTO Clientes(Nome,CPF) VALUES ?";
//     const values = [
//           ['teste1', '12345678901'],
//           ['teste1', '09876543210'],
//           ['teste3', '12312312399']
//         ];
//     conn.query(sql, [values], function (error, results, fields){
//             if(error) return console.log(error);
//             console.log('adicionou registros!');
//             conn.end();//fecha a conexão
//         });
//   }

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');

    //criando tabelas
    tabelaHospital(connection);
    tabelaSector(connection);
    tabelaEmployee(connection);
    tabelaRoom(connection);
    tabelaInsurance(connection);
    tabelaEquip(connection);
    tabelaLocation(connection);
    tabelaDoctor(connection);
    tabelaPatient(connection);
    tabelaReservation(connection);
    tabelaHospitalization(connection);


    //criando triggers
    triggerHospitalization(connection);

    connection.end();
  })
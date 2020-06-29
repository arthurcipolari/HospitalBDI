const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'HospitalMysql'
});


function populaHospital(connection){
    const sql = "INSERT INTO Hospital(Nome,Endereco) VALUES ?";
    const values = [
          ['Hospital Estadual', 'Av Nações Unidas'],
          ['Hospital Unimed', 'Rua Rio Branco'],
          ['Hospital Beneficencia Portuguesa', 'Rua Julio de Mesquita Filho']
        ];

    let msg = 'populando a tabela hospital!';
    connection.query(sql, [values], function (error, results, fields){
      if(error) return console.log(error);
      console.log('adicionou registros!');
      });
    return populaSector(connection);
}

function populaSector(connection){
  const sql = "INSERT INTO Sector(Nome_Setor,Cod_Hospital) VALUES ?";
  const values = [
        ['Administração', '1'],
        ['Enfermaria', '1'],
        ['Médico', '1'],
        ['RH', '1'],
        ['Administração', '2'],
        ['Enfermaria', '2'],
        ['Médico', '2'],
        ['RH', '2']
      ];

  let msg = 'populando a tabela setor!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaEmployee(connection);
}

function populaEmployee(connection){
  const sql = "INSERT INTO Employee(Nome,Data_Admissao, Cod_Setor, Medico) VALUES ?";
  const values = [
        ['Alex Silva Cardoso', '2018-07-15', '1', '0'],
        ['Diogo Alves Araujo', '2019-05-26', '1', '0'],
        ['Matilde Castro Barbosa', '2020-02-11', '1', '0'],
        ['Bruno Barbosa Rodrigues', '2018-08-10', '2', '0'],
        ['Isabella Rodrigues Oliveira', '2018-11-22', '2', '0'],
        ['Rafaela Cunha Alves', '2020-01-10', '2', '0'],
        ['Manuela Oliveira Azevedo', '2019-02-10', '3', '1'],
        ['Marina Sousa Cunha', '2019-03-12', '4', '0'],
        ['Vitória Melo Lima', '2018-07-15', '5', '0'],
        ['André Castro Martins', '2019-05-26', '5', '0'],
        ['Kauan Fernandes Cardoso', '2020-02-11', '5', '0'],
        ['Leila Sousa Castro', '2018-08-10', '6', '0'],
        ['Vinícius Carvalho Santos', '2018-11-22', '6', '0'],
        ['Aline Correia Goncalves', '2020-01-10', '6', '0'],
        ['Júlia Correia Ferreira', '2019-02-10', '7', '1'],
        ['Thiago Castro Barbosa', '2019-03-12', '8', '0']
      ];

  let msg = 'populando a tabela funcionario!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaRoom(connection);
}

function populaRoom(connection){
  const sql = "INSERT INTO Room(Nome_Quarto,Cod_Setor, Em_Uso) VALUES ?";
  const values = [
        ['Quarto 1', '2', '0'],
        ['Quarto 2', '2', '0'],
        ['Quarto 3', '2', '0'],
        ['Quarto 4', '2', '0'],
        ['Quarto 5', '2', '0'],
        ['Quarto 1', '6', '0'],
        ['Quarto 2', '6', '0'],
        ['Quarto 3', '6', '0'],
        ['Quarto 4', '6', '0']
      ];

  let msg = 'populando a tabela quarto!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaInsurance(connection);
}

function populaInsurance(connection){
  const sql = "INSERT INTO Insurance(Nome_Convenio) VALUES ?";
  const values = [
        ['SUS'],
        ['Unimed'],
        ['Amil'],
        ['SulAmérica']
      ];

  let msg = 'populando a tabela convenio!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaEquip(connection);
}

function populaEquip(connection){
  const sql = "INSERT INTO Equip(Nome_Equipamento,Descricao) VALUES ?";
  const values = [
        ['Kit Reanimação', 'Kit para reanimar paciente'],
        ['Carrinho de emergência', 'Crash Cart - Carrinho contendo diversos itens de emergência']
      ];

  let msg = 'populando a tabela equipamento!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaLocation(connection);
}

function populaLocation(connection){
  const sql = "INSERT INTO Location(Cod_Quarto, Cod_Equipamento) VALUES ?";
  const values = [
        ['1', '1'],
        ['1', '2']
      ];

  let msg = 'populando a tabela localização!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaDoctor(connection);
}

function populaDoctor(connection){
  const sql = "INSERT INTO Doctor(CRM,Especialidade,Cod_Funcionario) VALUES ?";
  const values = [
        ['111894', 'Clínico Geral', '7'],
        ['161821', 'Clínico Geral', '15']
      ];

  let msg = 'populando a tabela medicos!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaPatient(connection);
}

function populaPatient(connection){
  const sql = "INSERT INTO Patient(CPF,Nome,Cod_Convenio) VALUES ?";
  const values = [
        ['25610538904', 'Gabrielly Melo Santos', '1'],
        ['54368568290', 'Letícia Barros Azevedo', '1'],
        ['17306067257', 'Luana Pereira Souza', '1'],
        ['78821166023', 'Gabriel Castro Goncalves', '2'],
        ['71267964472', 'Manuela Rodrigues Sousa', '2'],
        ['82845912439', 'Otávio Cunha Alves', '3'],
        ['31814897607', 'Martim Pereira Correia', '4']
      ];

  let msg = 'populando a tabela paciente!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaReservation(connection);
}

function populaReservation(connection){
  const sql = "INSERT INTO Reservation(Cod_Paciente,Cod_Quarto) VALUES ?";
  const values = [
        ['1', '1'],
        ['2', '2']
      ];

  let msg = 'populando a tabela reserva!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return populaHospitalization(connection);
}

function populaHospitalization(connection){
  const sql = "INSERT INTO Hospitalization(Cod_Paciente,Cod_Medico,Cod_Quarto,Data_Internacao) VALUES ?";
  const values = [
        ['2', '7', '2', '2020-06-15']
      ];

  let msg = 'populando a tabela internacao!';
  connection.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
    });
  return connection.end();
}

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');

    populaHospital(connection);
  })
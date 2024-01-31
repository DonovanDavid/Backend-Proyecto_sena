const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const server = express();
server.use(bodyParser.json());
server.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_lavadero',
});

db.connect(function (error) {
  if (error) {
    console.log('Error Connecting to DB');
  } else {
    console.log('Successfully Connected to DB');
  }
});

server.listen(8085, function check(error) {
  if (error) {
    console.log('Error....!!!!');
  } else {
    console.log('Started....!!!! 8085');
  }
});

// CRUD operations for Ciudad table

// Create Ciudad
server.post('/api/ciudad/add', (req, res) => {
  let details = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };
  let sql = 'INSERT INTO Ciudad SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Ciudad creation failed' });
    } else {
      res.send({ status: true, message: 'Ciudad created successfully' });
    }
  });
});

// Read all Ciudades
server.get('/api/ciudad', (req, res) => {
  var sql = 'SELECT * FROM Ciudad';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read Ciudad by ID
server.get('/api/ciudad/:id', (req, res) => {
  var ciudadId = req.params.id;
  var sql = 'SELECT * FROM Ciudad WHERE id=' + ciudadId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Ciudad by ID
server.put('/api/ciudad/update/:id', (req, res) => {
  let sql =
    "UPDATE Ciudad SET nombre='" +
    req.body.nombre +
    "', descripcion='" +
    req.body.descripcion +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Ciudad update failed' });
    } else {
      res.send({ status: true, message: 'Ciudad updated successfully' });
    }
  });
});

// Delete Ciudad by ID
server.delete('/api/ciudad/delete/:id', (req, res) => {
  let sql = 'DELETE FROM Ciudad WHERE id=' + req.params.id;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'Ciudad deletion failed' });
    } else {
      res.send({ status: true, message: 'Ciudad deleted successfully' });
    }
  });
});


//CRUD SEDE
// Create Sede
server.post('/api/sede/add', (req, res) => {
  let details = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    idCiudad: req.body.idCiudad,
  };
  let sql = 'INSERT INTO Sede SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Sede creation failed' });
    } else {
      res.send({ status: true, message: 'Sede created successfully' });
    }
  });
});

// Read all Sedes
server.get('/api/sede', (req, res) => {
  var sql = 'SELECT * FROM Sede';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read Sede by ID
server.get('/api/sede/:id', (req, res) => {
  var sedeId = req.params.id;
  var sql = 'SELECT * FROM Sede WHERE id=' + sedeId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Sede by ID
server.put('/api/sede/update/:id', (req, res) => {
  let sql =
    "UPDATE Sede SET nombre='" +
    req.body.nombre +
    "', descripcion='" +
    req.body.descripcion +
    "', idCiudad='" +
    req.body.idCiudad +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Sede update failed' });
    } else {
      res.send({ status: true, message: 'Sede updated successfully' });
    }
  });
});

// Delete Sede by ID
server.delete('/api/sede/delete/:id', (req, res) => {
  let sql = 'DELETE FROM Sede WHERE id=' + req.params.id;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'Sede deletion failed' });
    } else {
      res.send({ status: true, message: 'Sede deleted successfully' });
    }
  });
});


//CRUD JEFEOPEACIONES

// Create JefeOperaciones
server.post('/api/jefeoperaciones/add', (req, res) => {
  let details = {
    nombre: req.body.nombre,
    fechaNacimiento: req.body.fechaNacimiento,
    telefono: req.body.telefono,
    correo: req.body.correo,
    contrasenia: req.body.contrasenia,
    tipoUsuario: req.body.tipoUsuario,
    idSede: req.body.idSede,
  };
  let sql = 'INSERT INTO JefeOperaciones SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'JefeOperaciones creation failed' });
    } else {
      res.send({ status: true, message: 'JefeOperaciones created successfully' });
    }
  });
});

// Read all JefeOperaciones
server.get('/api/jefeoperaciones', (req, res) => {
  var sql = 'SELECT * FROM JefeOperaciones';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read JefeOperaciones by ID
server.get('/api/jefeoperaciones/:id', (req, res) => {
  var jefeOperacionesId = req.params.id;
  var sql = 'SELECT * FROM JefeOperaciones WHERE id=' + jefeOperacionesId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update JefeOperaciones by ID
server.put('/api/jefeoperaciones/update/:id', (req, res) => {
  let sql =
    "UPDATE JefeOperaciones SET nombre='" +
    req.body.nombre +
    "', fechaNacimiento='" +
    req.body.fechaNacimiento +
    "', telefono='" +
    req.body.telefono +
    "', correo='" +
    req.body.correo +
    "', contrasenia='" +
    req.body.contrasenia +
    "', tipoUsuario='" +
    req.body.tipoUsuario +
    "', idSede='" +
    req.body.idSede +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'JefeOperaciones update failed' });
    } else {
      res.send({ status: true, message: 'JefeOperaciones updated successfully' });
    }
  });
});

// Delete JefeOperaciones by ID
server.delete('/api/jefeoperaciones/delete/:id', (req, res) => {
  let sql = 'DELETE FROM JefeOperaciones WHERE id=' + req.params.id;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'JefeOperaciones deletion failed' });
    } else {
      res.send({ status: true, message: 'JefeOperaciones deleted successfully' });
    }
  });
});


//CRUD MECANICOS
// Create Mecanico
server.post('/api/mecanico/add', (req, res) => {
  let details = {
    nombre: req.body.nombre,
    fechaNacimiento: req.body.fechaNacimiento,
    telefono: req.body.telefono,
    correo: req.body.correo,
    contrasenia: req.body.contrasenia,
    tipoUsuario: req.body.tipoUsuario,
    nivelEstudios: req.body.nivelEstudios,
    direccion: req.body.direccion,
    idSede: req.body.idSede,
  };
  let sql = 'INSERT INTO Mecanico SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Mecanico creation failed' });
    } else {
      res.send({ status: true, message: 'Mecanico created successfully' });
    }
  });
});

// Read all Mecanicos
server.get('/api/mecanico', (req, res) => {
  var sql = 'SELECT * FROM Mecanico';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read Mecanico by ID
server.get('/api/mecanico/:id', (req, res) => {
  var mecanicoId = req.params.id;
  var sql = 'SELECT * FROM Mecanico WHERE id=' + mecanicoId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Mecanico by ID
server.put('/api/mecanico/update/:id', (req, res) => {
  let sql =
    "UPDATE Mecanico SET nombre='" +
    req.body.nombre +
    "', fechaNacimiento='" +
    req.body.fechaNacimiento +
    "', telefono='" +
    req.body.telefono +
    "', correo='" +
    req.body.correo +
    "', contrasenia='" +
    req.body.contrasenia +
    "', tipoUsuario='" +
    req.body.tipoUsuario +
    "', nivelEstudios='" +
    req.body.nivelEstudios +
    "', direccion='" +
    req.body.direccion +
    "', idSede='" +
    req.body.idSede +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Mecanico update failed' });
    } else {
      res.send({ status: true, message: 'Mecanico updated successfully' });
    }
  });
});

// Delete Mecanico by ID
server.post('/api/mecanico/delete-multiple', (req, res) => {
  const idsToDelete = req.body.ids;

  // Verifica si hay revisiones asociadas a los mecánicos a eliminar
  const checkRevisionsQuery = 'SELECT COUNT(*) AS revisionCount FROM revision WHERE mecanico IN (' + idsToDelete.join(',') + ')';
  db.query(checkRevisionsQuery, (checkError, results) => {
    if (checkError) {
      console.error('Error al verificar revisiones asociadas:', checkError);
      res.send({ status: false, message: 'Error al verificar revisiones asociadas' });
      return;
    }

    const revisionCount = results[0].revisionCount;
    if (revisionCount > 0) {
      // Si hay revisiones asociadas, envía un mensaje informando y no procede con la eliminación
      res.send({ status: false, message: `No se puede eliminar mecánicos porque tienen ${revisionCount} revision(es) asociada(s).` });
    } else {
      // No hay revisiones asociadas, procede con la eliminación de mecánicos
      const deleteMecanicosQuery = 'DELETE FROM Mecanico WHERE id IN (' + idsToDelete.join(',') + ')';
      db.query(deleteMecanicosQuery, (deleteError) => {
        if (deleteError) {
          console.error('Error al eliminar mecánicos:', deleteError);
          res.send({ status: false, message: 'Mecanicos deletion failed' });
        } else {
          res.send({ status: true, message: 'Mecanicos deleted successfully' });
        }
      });
    }
  });
});


//CRUD CLIENTE
// Create Cliente
server.post('/api/cliente/add', (req, res) => {
  let details = {
    nombre: req.body.nombre,
    fechaNacimiento: req.body.fechaNacimiento,
    telefono: req.body.telefono,
    correo: req.body.correo,
    contrasenia: req.body.contrasenia,
    tipoUsuario: req.body.tipoUsuario,
    ciudadResidencia: req.body.ciudadResidencia,
    direccion: req.body.direccion,
    idSede: req.body.idSede,
  };
  let sql = 'INSERT INTO Cliente SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Cliente creation failed' });
    } else {
      res.send({ status: true, message: 'Cliente created successfully' });
    }
  });
});

// Read all Clientes
server.get('/api/cliente', (req, res) => {
  var sql = 'SELECT * FROM Cliente';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read Cliente by ID
server.get('/api/cliente/:id', (req, res) => {
  var clienteId = req.params.id;
  var sql = 'SELECT * FROM Cliente WHERE id=' + clienteId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Cliente by ID
server.put('/api/cliente/update/:id', (req, res) => {
  let sql =
    "UPDATE Cliente SET nombre='" +
    req.body.nombre +
    "', fechaNacimiento='" +
    req.body.fechaNacimiento +
    "', telefono='" +
    req.body.telefono +
    "', correo='" +
    req.body.correo +
    "', contrasenia='" +
    req.body.contrasenia +
    "', tipoUsuario='" +
    req.body.tipoUsuario +
    "', ciudadResidencia='" +
    req.body.ciudadResidencia +
    "', direccion='" +
    req.body.direccion +
    "', idSede='" +
    req.body.idSede +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Cliente update failed' });
    } else {
      res.send({ status: true, message: 'Cliente updated successfully' });
    }
  });
});

// Delete Cliente by ID
server.delete('/api/cliente/delete/:id', (req, res) => {
  let sql = 'DELETE FROM Cliente WHERE id=' + req.params.id;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'Cliente deletion failed' });
    } else {
      res.send({ status: true, message: 'Cliente deleted successfully' });
    }
  });
});
// Delete Cliente by ID
server.post('/api/cliente/delete-multiple', (req, res) => {
  const idsToDelete = req.body.ids;

  // Verifica si hay registros asociados en ClienteVehiculo para los clientes a eliminar
  const checkClienteVehiculoQuery = 'SELECT cv.idCliente, cv.placaVehiculo, v.modelo, v.marca ' +
    'FROM ClienteVehiculo cv ' +
    'JOIN Vehiculo v ON cv.placaVehiculo = v.placa ' +
    'WHERE cv.idCliente IN (' + idsToDelete.join(',') + ')';

  db.query(checkClienteVehiculoQuery, (checkCVError, cvResults) => {
    if (checkCVError) {
      console.error('Error al verificar asociaciones en ClienteVehiculo:', checkCVError);
      res.send({ status: false, message: 'Error al verificar asociaciones en ClienteVehiculo' });
      return;
    }

    // Si hay asociaciones, devuelve un mensaje con la información
    if (cvResults.length > 0) {
      const associationsInfo = cvResults.map(assoc => {
        return {
          clienteId: assoc.idCliente,
          placaVehiculo: assoc.placaVehiculo,
          modeloVehiculo: assoc.modelo,
          marcaVehiculo: assoc.marca
        };
      });

      res.send({
        status: false,
        message: 'No se puede eliminar cliente(s) porque tienen registros asociados en ClienteVehiculo.',
        associationsInfo: associationsInfo
      });
    } else {
      // Si no hay asociaciones, procede con la eliminación de clientes
      const deleteClientesQuery = 'DELETE FROM Cliente WHERE id IN (' + idsToDelete.join(',') + ')';
      db.query(deleteClientesQuery, (deleteError) => {
        if (deleteError) {
          console.error('Error al eliminar clientes:', deleteError);
          res.send({ status: false, message: 'Clientes deletion failed' });
        } else {
          res.send({ status: true, message: 'Clientes deleted successfully' });
        }
      });
    }
  });
});



//CRUD TIPOVEHICULO
// Create TipoVehiculo
server.post('/api/tipovehiculo/add', (req, res) => {
  let details = {
    nombre: req.body.nombre,
  };
  let sql = 'INSERT INTO TipoVehiculo SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'TipoVehiculo creation failed' });
    } else {
      res.send({ status: true, message: 'TipoVehiculo created successfully' });
    }
  });
});

// Read all TipoVehiculos
server.get('/api/tipovehiculo', (req, res) => {
  var sql = 'SELECT * FROM TipoVehiculo';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read TipoVehiculo by ID
server.get('/api/tipovehiculo/:id', (req, res) => {
  var tipoVehiculoId = req.params.id;
  var sql = 'SELECT * FROM TipoVehiculo WHERE id=' + tipoVehiculoId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update TipoVehiculo by ID
server.put('/api/tipovehiculo/update/:id', (req, res) => {
  let sql =
    "UPDATE TipoVehiculo SET nombre='" +
    req.body.nombre +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'TipoVehiculo update failed' });
    } else {
      res.send({ status: true, message: 'TipoVehiculo updated successfully' });
    }
  });
});

// Delete TipoVehiculo by ID
server.delete('/api/tipovehiculo/delete/:id', (req, res) => {
  let sql = 'DELETE FROM TipoVehiculo WHERE id=' + req.params.id;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'TipoVehiculo deletion failed' });
    } else {
      res.send({ status: true, message: 'TipoVehiculo deleted successfully' });
    }
  });
});
//CRUD MARCA
// Create Marca
server.post('/api/marca/add', (req, res) => {
  let details = {
    nombre: req.body.nombre,
  };
  let sql = 'INSERT INTO Marca SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Marca creation failed' });
    } else {
      res.send({ status: true, message: 'Marca created successfully' });
    }
  });
});

// Read all Marcas
server.get('/api/marca', (req, res) => {
  var sql = 'SELECT * FROM Marca';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read Marca by ID
server.get('/api/marca/:id', (req, res) => {
  var marcaId = req.params.id;
  var sql = 'SELECT * FROM Marca WHERE id=' + marcaId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Marca by ID
server.put('/api/marca/update/:id', (req, res) => {
  let sql =
    "UPDATE Marca SET nombre='" +
    req.body.nombre +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Marca update failed' });
    } else {
      res.send({ status: true, message: 'Marca updated successfully' });
    }
  });
});

// Delete Marca by ID
server.delete('/api/marca/delete/:id', (req, res) => {
  let sql = 'DELETE FROM Marca WHERE id=' + req.params.id;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'Marca deletion failed' });
    } else {
      res.send({ status: true, message: 'Marca deleted successfully' });
    }
  });
});

//CURD VEHICULO


// Create Vehiculo
server.post('/api/vehiculo/add', (req, res) => {
  let details = {
    placa: req.body.placa,
    tipoVehiculo: req.body.tipoVehiculo,
    capacidadPasajeros: req.body.capacidadPasajeros,
    descripcion: req.body.descripcion,
    modelo: req.body.modelo,
    marca: req.body.marca,
    estado: req.body.estado,
    idCliente: req.body.idCliente,
  };
  let sql = 'INSERT INTO Vehiculo SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Vehiculo creation failed' });
    } else {
      res.send({ status: true, message: 'Vehiculo created successfully' });
    }
  });
});

// Read all Vehiculos
server.get('/api/vehiculo', (req, res) => {
  var sql = 'SELECT * FROM Vehiculo';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read Vehiculo by Placa
server.get('/api/vehiculo/:placa', (req, res) => {
  var vehiculoPlaca = req.params.placa;
  var sql = 'SELECT * FROM Vehiculo WHERE placa=' + vehiculoPlaca;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB placa');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Vehiculo by Placa
server.put('/api/vehiculo/update/:placa', (req, res) => {
  let sql =
    "UPDATE Vehiculo SET tipoVehiculo='" +
    req.body.tipoVehiculo +
    "', capacidadPasajeros='" +
    req.body.capacidadPasajeros +
    "', descripcion='" +
    req.body.descripcion +
    "', modelo='" +
    req.body.modelo +
    "', marca='" +
    req.body.marca +
    "', estado='" +
    req.body.estado +
    "', idCliente='" +
    req.body.idCliente +
    "' WHERE placa='" +
    req.params.placa +
    "'";

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Vehiculo update failed' });
    } else {
      res.send({ status: true, message: 'Vehiculo updated successfully' });
    }
  });
});

// Delete Vehiculo by Placa
server.delete('/api/vehiculo/delete/:placa', (req, res) => {
  let sql = 'DELETE FROM Vehiculo WHERE placa=' + req.params.placa;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'Vehiculo deletion failed' });
    } else {
      res.send({ status: true, message: 'Vehiculo deleted successfully' });
    }
  });
});
server.post('/api/vehiculo/delete-multiple', (req, res) => {
  const idsToDelete = req.body.ids;

  // Inicia una transacción
  db.beginTransaction((transactionError) => {
    if (transactionError) {
      console.error('Error al iniciar la transacción:', transactionError);
      return res.status(500).json({ status: false, message: 'Error al iniciar la transacción' });
    }

    // Verifica y elimina asociaciones en ClienteVehiculo
    const checkAndDeleteCVQuery = `
      DELETE cv
      FROM ClienteVehiculo cv
      JOIN Vehiculo v ON cv.placaVehiculo = v.placa
      WHERE cv.placaVehiculo IN (${idsToDelete.map(id => `'${id}'`).join(',')})
    `;

    db.query(checkAndDeleteCVQuery, (checkCVError) => {
      if (checkCVError) {
        console.error('Error al verificar y eliminar asociaciones en ClienteVehiculo:', checkCVError);

        // Revierte la transacción en caso de error
        return db.rollback(() => {
          res.status(500).json({ status: false, message: 'Error al verificar y eliminar asociaciones en ClienteVehiculo' });
        });
      }

      // Verifica si hay revisiones asociadas
      const checkRevisionesQuery = `SELECT COUNT(*) AS revisionCount FROM Revision WHERE vehiculo IN (${idsToDelete.map(id => `'${id}'`).join(',')})`;

      db.query(checkRevisionesQuery, (checkRevisionError, revisionResults) => {
        if (checkRevisionError) {
          console.error('Error al verificar revisiones asociadas:', checkRevisionError);

          // Revierte la transacción en caso de error
          return db.rollback(() => {
            res.status(500).json({ status: false, message: 'Error al verificar revisiones asociadas' });
          });
        }

        const revisionCount = revisionResults[0].revisionCount;
        if (revisionCount > 0) {
          // Si hay revisiones asociadas, revierte la transacción y devuelve un mensaje informativo
          return db.rollback(() => {
            res.status(400).json({ status: false, message: `No se puede eliminar vehículo(s) porque tienen ${revisionCount} revisión(es) asociada(s).` });
          });
        }

        // Elimina vehículos
        const deleteVehiculosQuery = `DELETE FROM Vehiculo WHERE placa IN (${idsToDelete.map(id => `'${id}'`).join(',')})`;

        db.query(deleteVehiculosQuery, (deleteError) => {
          if (deleteError) {
            console.error('Error al eliminar vehículos:', deleteError);

            // Revierte la transacción en caso de error
            return db.rollback(() => {
              res.status(500).json({ status: false, message: 'Vehículos deletion failed' });
            });
          }

          // Confirma la transacción
          db.commit((commitError) => {
            if (commitError) {
              console.error('Error al confirmar la transacción:', commitError);
              return res.status(500).json({ status: false, message: 'Error al confirmar la transacción' });
            }

            res.status(200).json({ status: true, message: 'Vehículos deleted successfully' });
          });
        });
      });
    });
  });
});


//CRUD VEICULOCLIENTE

// Create ClienteVehiculo
server.post('/api/clientevehiculo/add', (req, res) => {
  let details = {
    idCliente: req.body.idCliente,
    placaVehiculo: req.body.placaVehiculo,
  };
  let sql = 'INSERT INTO ClienteVehiculo SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'ClienteVehiculo creation failed' });
    } else {
      res.send({ status: true, message: 'ClienteVehiculo created successfully' });
    }
  });
});

// Read all ClienteVehiculos
server.get('/api/clientevehiculo', (req, res) => {
  var sql = 'SELECT * FROM ClienteVehiculo';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read ClienteVehiculo by Cliente ID
server.get('/api/clientevehiculo/:idCliente', (req, res) => {
  var clienteId = req.params.idCliente;
  var sql = 'SELECT * FROM ClienteVehiculo WHERE idCliente=' + clienteId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read all Vehiculos for a specific Cliente
server.get('/api/vehiculos/cliente/:clienteId', (req, res) => {
  var clienteId = req.params.clienteId;
  var sql = `
    SELECT v.*
    FROM Vehiculo v
    INNER JOIN ClienteVehiculo cv ON v.placa = cv.placaVehiculo
    WHERE cv.idCliente = ${clienteId}`;
  
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
      res.send({ status: false, message: 'Error connecting to DB' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Delete ClienteVehiculo by Cliente ID and PlacaVehiculo
server.delete('/api/clientevehiculo/delete/:idCliente/:placaVehiculo', (req, res) => {
  let sql =
    'DELETE FROM ClienteVehiculo WHERE idCliente=' +
    req.params.idCliente +
    ' AND placaVehiculo="' +
    req.params.placaVehiculo +
    '"';
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'ClienteVehiculo deletion failed' });
    } else {
      res.send({ status: true, message: 'ClienteVehiculo deleted successfully' });
    }
  });
});


//CRUD REVISIONES

// Create Revision
server.post('/api/revision/add', (req, res) => {
  let details = {
    vehiculo: req.body.vehiculo,
    mecanico: req.body.mecanico || null,  // Asegura que mecanico sea nulo si no se proporciona
    fecha: req.body.fecha,
    hora: req.body.hora,
    estado: req.body.estado,
    observaciones: req.body.observaciones || null,  // Nueva propiedad observaciones
  };
  let sql = 'INSERT INTO Revision SET ?';
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Revision creation failed' });
    } else {
      res.send({ status: true, message: 'Revision created successfully' });
    }
  });
});
// Read all Revisiones
server.get('/api/revision', (req, res) => {
  var sql = 'SELECT * FROM Revision';
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read Revision by ID
server.get('/api/revision/:id', (req, res) => {
  var revisionId = req.params.id;
  var sql = 'SELECT * FROM Revision WHERE idRevision=' + revisionId;
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Read revisones by idMecanico
server.get('/api/revision/mecanico/:mecanicoId', (req, res) => {
  var mecanicoId = req.params.mecanicoId;
  var sql = `SELECT * FROM Revision WHERE mecanico = ${mecanicoId}`;
  
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
      res.send({ status: false, message: 'Error connecting to DB' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Read revisones by idMecanico
server.get('/api/revision/mecanico/:clienteid', (req, res) => {
  var mecanicoId = req.params.mecanicoId;
  var sql = `SELECT * FROM Revision WHERE mecanico = ${mecanicoId}`;
  
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
      res.send({ status: false, message: 'Error connecting to DB' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Read all Revisiones for a specific Cliente
server.get('/api/revision/cliente/:clienteId', (req, res) => {
  var clienteId = req.params.clienteId;
  var sql = `
    SELECT r.*
    FROM Revision r
    INNER JOIN ClienteVehiculo cv ON r.vehiculo = cv.placaVehiculo
    WHERE cv.idCliente = ${clienteId}`;
  
  db.query(sql, function (error, result) {
    if (error) {
      console.log('Error connecting to DB');
      res.send({ status: false, message: 'Error connecting to DB' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Revision by ID
server.put('/api/revision/update/:id', (req, res) => {
  let sql =
    "UPDATE Revision SET vehiculo='" +
    req.body.vehiculo +
    "', mecanico='" +
    req.body.mecanico +
    "', fecha='" +
    req.body.fecha +
    "', hora='" +
    req.body.hora +
    "', estado='" +
    req.body.estado +
    "', observaciones='" +
    req.body.observaciones +
    "' WHERE idRevision=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Revision update failed' });
    } else {
      res.send({ status: true, message: 'Revision updated successfully' });
    }
  });
});

// Delete Revision by ID
server.delete('/api/revision/delete/:id', (req, res) => {
  let sql = 'DELETE FROM Revision WHERE idRevision=' + req.params.id;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: 'Revision deletion failed' });
    } else {
      res.send({ status: true, message: 'Revision deleted successfully' });
    }
  });
});

// Define la ruta para el servicio de eliminación múltiple de revisiones
server.post('/api/revision/delete-multiple', (req, res) => {
  // Obtén los IDs de las revisiones a eliminar desde el cuerpo de la solicitud
  const idsToDelete = req.body.ids;

  // Procede con la eliminación de las revisiones
  const deleteRevisionesQuery = `DELETE FROM Revision WHERE idRevision IN (${idsToDelete.map(id => `'${id}'`).join(',')})`;

  db.query(deleteRevisionesQuery, (deleteError) => {
    if (deleteError) {
      console.error('Error al eliminar revisiones:', deleteError);
      return res.status(500).json({ status: false, message: 'Revisiones deletion failed' });
    }

    return res.status(200).json({ status: true, message: 'Revisiones deleted successfully' });
  });
});



//Logica del LOGIN

const performAuthentication = (username, password) => {
  return new Promise((resolve, reject) => {
    // Realiza la consulta para el tipo de usuario Mecánico (tipoUsuario = 2)
    const mecanicoQuery = `SELECT * FROM Mecanico WHERE nombre = ? AND contrasenia = ?`;

    // Realiza la consulta para el tipo de usuario Jefe de Operaciones (tipoUsuario = 1)
    const jefeQuery = `SELECT * FROM JefeOperaciones WHERE nombre = ? AND contrasenia = ?`;

    // Realiza la consulta para el tipo de usuario Cliente (tipoUsuario = 3)
    const clienteQuery = `SELECT * FROM Cliente WHERE nombre = ? AND contrasenia = ?`;

    // Ejecuta las consultas en paralelo usando Promise.all
    Promise.all([
      performQuery(mecanicoQuery, [username, password]),
      performQuery(jefeQuery, [username, password]),
      performQuery(clienteQuery, [username, password]),
    ])
      .then((results) => {
        // Busca el primer resultado que no sea null (indicando que las credenciales son válidas)
        const user = results.find((result) => result !== null);

        // Retorna el usuario completo o null si las credenciales son incorrectas
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Función auxiliar para realizar una consulta a la base de datos
const performQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Retorna el resultado o null si no hay coincidencias
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
};

// Función para generar un token
const generateToken = (username, userType) => {
  const secretKey = 'proyecto-sena'; // Debes reemplazar esto con una clave secreta segura
  const token = jwt.sign({ username, userType }, secretKey, { expiresIn: '1h' });
  return token;
};

server.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await performAuthentication(username, password);

    if (user) {
      // Genera el token (puedes utilizar jsonwebtoken para esto)
      const token = generateToken(username, user.tipoUsuario);

      // Aquí puedes incluir más información del usuario si es necesario
      const userInfo = {
        id: user.id,
        nombre: user.nombre,
        tipoUsuario: user.tipoUsuario,
        // Otros campos del usuario...
      };

      res.json({ token, userInfo });
    } else {
      res.status(401).json({ message: 'Autenticación fallida' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ message: 'Error en la autenticación' });
  }
});
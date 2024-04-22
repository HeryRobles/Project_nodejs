import { createConnection } from 'mysql';

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    const con = createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "pos"
    });

    con.connect(function(err) {
      if (err) {
        reject(err);
        return;

      }
      con.query(query, function (err, result, fields) {
          if (err) {
            reject(err);
            return;
          }
            resolve(result);
          
        });
    });
  });
}

export function getUsersData() {
  const query = "SELECT id_usuario, nombre_usuario, ap1_usuario, ap2_usuario, contraseña_usuario FROM usuarios";
  return executeQuery(query);
}

export function getClientesData() {
  const query = "SELECT id_usuario, nombre_usuario, ap1_usuario, ap2_usuario, email, contraseña_usuario FROM clientes";
  return executeQuery(query);
}

export function getProductosData() {
  const query = "SELECT id, nombre, precio FROM productos";
  return executeQuery(query);
}
  

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM productos", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     exit();
//   });
// });
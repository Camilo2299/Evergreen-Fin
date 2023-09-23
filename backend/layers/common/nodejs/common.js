const { Client } = require('pg');

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': '*'
}

// Función para conectar a la base de datos y obtener la instancia de cliente
function connectToDatabase() {
    let client = null;

    if (!client) {
        client = new Client({
            user: 'egfin',
            host: 'my-rds-instance.crxh06k50wtn.us-east-1.rds.amazonaws.com',
            database: 'mydb',
            password: 'egfin123',
            port: 5432, // Puerto por defecto de PostgreSQL
            ssl: true,  // Habilitar SSL/TLS
            autocommit: true
        });
        try {
            client.connect();
            return client;
        } catch (error) {
           console.error(error); 
        }
    }
}

// Función para cerrar la conexión a la base de datos
function closeDatabaseConnection(client) {
    client.end();
}

function buildResponse(statusCode, body, headers = {}) {
    return {
        statusCode,
        headers: {
            ...HEADERS,
            ...headers
        },
        body: JSON.stringify(body)
    }
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
  buildResponse
};
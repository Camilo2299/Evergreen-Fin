const {
  buildResponse,
  connectToDatabase,
  closeDatabaseConnection,
} = require('/opt/nodejs/common.js')

exports.handler = async (event) => {
  const client = connectToDatabase();
  try {
    const result = await client.query('SELECT product_id, product_name FROM products');
    console.log(result.rows)
    closeDatabaseConnection(client);
    const body = {products: result.rows}
    const response = buildResponse(200,body);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Puedes manejar el error como desees
  }
};
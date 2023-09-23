const {
  buildResponse,
  connectToDatabase,
  closeDatabaseConnection,
} = require('/opt/nodejs/common.js')

exports.handler = async (event) => {
  const client = connectToDatabase();
  try {
    const result = await client.query('SELECT center_id, center_name FROM cost_centers');
    console.log(result.rows)
    closeDatabaseConnection(client);
    const body = {cost_centers: result.rows}
    const response = buildResponse(200,body);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Puedes manejar el error como desees
  }
};
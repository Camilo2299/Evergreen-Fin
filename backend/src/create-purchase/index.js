const {
  buildResponse,
  connectToDatabase,
  closeDatabaseConnection,
} = require('/opt/nodejs/common.js')

exports.handler = async (event) => {
  const dataJson = typeof event.body === 'object' ? event.body : JSON.parse(event.body);
  console.log(dataJson);

  const transactionQuery = `INSERT INTO transactions (transaction_date,transaction_type, description, amount)
  VALUES ('${dataJson.expense_date}', 'COMPRA' ,'${dataJson.description}', ${dataJson.amount});`

  const expensesQuery = `INSERT INTO expenses (center_id, expense_date, expense_category, responsible_id, amount, description)
  VALUES (${dataJson.center_id}, '${dataJson.expense_date}', '${dataJson.expense_category}', ${dataJson.responsible_id}, ${dataJson.amount}, '${dataJson.description}');`

  try {
    const client = connectToDatabase();
    await client.query(transactionQuery);

    await client.query(expensesQuery);

    closeDatabaseConnection(client);
    const body = {message: 'The purchase was successfully excecuted'}
    const response = buildResponse(201,body);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Puedes manejar el error como desees
  }
};
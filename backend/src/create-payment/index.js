const {
  buildResponse,
  connectToDatabase,
  closeDatabaseConnection,
} = require('/opt/nodejs/common.js')

exports.handler = async (event) => {
  const dataJson = typeof event.body === 'object' ? event.body : JSON.parse(event.body);
  console.log(dataJson);

  const transactionQuery = `INSERT INTO transactions (transaction_date,transaction_type, description, amount)
  VALUES ('${dataJson.date}', 'VENTA' ,'Venta de productos', ${dataJson.total});`

  const incomeQuery = `INSERT INTO income (income_date, invoice_id, income_source, amount, description, payment_method, income_status, currency, exchange_rate, income_category)
  VALUES ('${dataJson.date}', ${dataJson.invoice_id}, '${dataJson.invoice_number}', ${dataJson.total}, 'Ingreso por venta de productos',
  '${dataJson.payment_method}', 'Cobrado', '${dataJson.currency}', ${dataJson.exchange_rate}, 'Ventas')`
  
  console.log(incomeQuery);

  const invoiceQuery = `UPDATE sales_invoice set payment_status = 'Pagado' where invoice_id = ${dataJson.invoice_id}`
  const client = connectToDatabase();
  try {
    await client.query(transactionQuery);

    await client.query(incomeQuery);

    await client.query(invoiceQuery);

    closeDatabaseConnection(client);
    const body = {message: 'The payment was successfully excecuted'}
    const response = buildResponse(201,body);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Puedes manejar el error como desees
  }
};
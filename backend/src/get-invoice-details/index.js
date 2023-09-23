const {
  buildResponse,
  connectToDatabase,
  closeDatabaseConnection,
} = require('/opt/nodejs/common.js')

exports.handler = async (event) => {
  const id = event.pathParameters.id
  const client = connectToDatabase();
  try {
    const result = await client.query(`SELECT * FROM sales_invoice where invoice_id = ${id}`);
    for (const element of result.rows) {
      const invoiceItemsResult = await client.query(`SELECT * FROM invoice_item where invoice_id = ${element.invoice_id}`);
      // Agrega un campo extra llamado "nuevo_campo" a cada objeto
      element["invoice_items"] = [];

      for (const item of invoiceItemsResult.rows) {
        const productResult = await client.query(`SELECT * FROM products where product_id = ${item.product_id}`);
        // Agrega un campo extra llamado "nuevo_campo" a cada objeto
        item["product_price"] = productResult.rows[0].product_price;
        item["product_name"] = productResult.rows[0].product_name;
        element["invoice_items"].push(item);
    }
  }
    console.log(result.rows)
    closeDatabaseConnection(client);
    const body = result.rows[0]
    const response = buildResponse(200,body);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Puedes manejar el error como desees
  }
};
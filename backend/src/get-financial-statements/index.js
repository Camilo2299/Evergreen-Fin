const {
  buildResponse,
  connectToDatabase,
  closeDatabaseConnection,
} = require('/opt/nodejs/common.js')

exports.handler = async (event) => {
  const client = connectToDatabase();
  const assetQuery = 'SELECT * FROM assets;';
  const liabilitiesQuery = 'SELECT * FROM liabilities;';
  const equityQuery = 'SELECT * FROM equity;';
  const accountingQuery = 'SELECT * FROM accounting_accounts;';

  try {
    const assetResult = await client.query(assetQuery);
    const liabilitiesResult = await client.query(liabilitiesQuery);
    const equityResult = await client.query(equityQuery);
    const accountingResult = await client.query(accountingQuery);

    closeDatabaseConnection(client);
    const body = {
      assets: assetResult.rows,
      liabilities: liabilitiesResult.rows,
      equity: equityResult.rows,
      accounting_accounts: accountingResult.rows
    }
    const response = buildResponse(200,body);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Puedes manejar el error como desees
  }
};
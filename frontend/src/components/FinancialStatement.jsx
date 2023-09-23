import React, { useState, useEffect } from 'react';
import {
  FloatingLabel,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import {set, useForm} from 'react-hook-form'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';

const FinancialStatement = () => {
  const { register, handleSubmit } = useForm();
  const [assetsData, setAssetsData] = useState([]);
  const [liabilitiesData, setLiabilitiesData] = useState([]);
  const [equityData, setEquityData] = useState([]);
  const [accountingAccountsData, setAccountingAccountsData] = useState([]);


  useEffect(() => {
    // Llama a la API para cargar los datos de los clientes
    fetch('https://4dp9b64cd0.execute-api.us-east-1.amazonaws.com/dev/v1/financial/statements')
      .then(response => response.json())
      .then(data => {
        // Filtra los clientes
        const assets = data.assets;
        const liabilities = data.liabilities;
        const equity = data.equity;
        const accountingAccounts = data.accounting_accounts;

        setAssetsData(assets);  
        setLiabilitiesData(liabilities);
        setEquityData(equity);  
        setAccountingAccountsData(accountingAccounts);
      })
      .catch(error => console.error('Error fetching customer data', error));
  }, []);

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{height: "100%"}}>
      <MDBCard className='m-5' style={{maxWidth: '1500px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Financial Statement</h2>

    <table >
      <thead>
        <tr>
          <th> Asset </th>
          <th> Value </th>
          <th> Purchase date </th>
        </tr>
      </thead>
      <tbody>
        {assetsData.map((asset) => (
          <tr key={asset.id}>
            <td>{asset.asset_name}</td>
            <td>{asset.value}</td>
            <td>{Date(asset.purchase_date)}</td>
          </tr>
        ))}
      </tbody>
      <thead>
        <tr>
          <th> Liability Name </th>
          <th> Amount </th>
          <th> Description </th>
        </tr>
      </thead>
      <tbody>
        {liabilitiesData.map((liabilities) => (
          <tr key={liabilities.id}>
            <td>{liabilities.liability_name}</td>
            <td>{liabilities.amount}</td>
            <td>{liabilities.description}</td>
          </tr>
        ))}
      </tbody>
      <thead>
        <tr>
          <th> Description </th>
          <th> Amount </th>
          <th> Date </th>
        </tr>      
      </thead>
      <tbody>
        {equityData.map((equity) => (
          <tr key={equity.id}>
            <td>{equity.description}</td>
            <td>{equity.amount}</td>
            <td>{Date(equity.date)}</td>
          </tr>
        ))}
      </tbody>
      <thead>
        <tr>
          <th> Account name </th>
          <th> Account type </th>
          <th> Date </th>
          <th> Amount </th>
        </tr>
      </thead>
      <tbody>
        {accountingAccountsData.map((accountingAccounts) => (
          <tr key={accountingAccounts.id}>
            <td>{accountingAccounts.account_name}</td>
            <td>{accountingAccounts.account_type}</td>
            <td>{Date(accountingAccounts.date)}</td>
            <td>{accountingAccounts.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>  
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default FinancialStatement;
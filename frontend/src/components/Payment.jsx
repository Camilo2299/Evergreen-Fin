import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol
}
from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Suma 1 porque los meses se indexan desde 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    
    // Aquí puedes construir la solicitud y enviarla
    const requestData = {
      "date": formattedDate,
      "invoice_id": selectedInvoice.invoice_id,
      "invoice_number": selectedInvoice.invoice_number,
      "total": selectedInvoice.total,
      "payment_method": selectedInvoice.payment_method,
      "currency": selectedInvoice.currency,
      "exchange_rate": selectedInvoice.exchange_rate
    };

    try {
      const response = await fetch('https://4dp9b64cd0.execute-api.us-east-1.amazonaws.com/dev/v1/payments', {
        method: 'POST', // Puedes usar el método HTTP necesario
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // La solicitud se completó con éxito
        // Puedes realizar acciones adicionales aquí si es necesario
        console.log('Solicitud exitosa');
        setPaymentSuccess(true);
        toast.success('Pago exitoso', {
          position: 'top-right',
          autoClose: 3000, // Cierra la alerta después de 3 segundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // La solicitud falló, puedes manejar errores aquí
        console.error('Error en la solicitud');
        setPaymentSuccess(false);
        toast.error('El pago ha fallado', {
          position: 'top-right',
          autoClose: 3000, // Cierra la alerta después de 3 segundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      // Maneja errores de red u otros errores aquí
      console.error('Error de red', error);
    }
  };

  const [customersData, setCustomersData] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  useEffect(() => {
    // Llama a la API para cargar los datos de los clientes
    fetch('https://4dp9b64cd0.execute-api.us-east-1.amazonaws.com/dev/v1/customers')
      .then(response => response.json())
      .then(data => {
        // Filtra los clientes
        const customers = data.customers.map(customer => ({
          value: customer.customer_id,
          label: customer.email, // Utiliza el email como etiqueta
        }));

        setCustomersData(customers);
      })
      .catch(error => console.error('Error fetching customer data', error));

    // Llama a la API para cargar los datos de las facturas
    fetch('https://4dp9b64cd0.execute-api.us-east-1.amazonaws.com/dev/v1/invoices')
      .then(response => response.json())
      .then(data => {
        setInvoicesData(data.invoices);
      })
      .catch(error => console.error('Error fetching invoice data', error));
  }, []);
  

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{height: "100%"}}>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Pay your invoices</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dropdown 1 */}
          <select
            {...register("customer_id")}
            className='form-select mb-4'
            onChange={(e) => {
              const selectedCustomerId = parseInt(e.target.value);
              
              // Filtra las facturas basadas en el cliente seleccionado
              const filteredInvoices = invoicesData.filter(invoice => invoice.customer_id === selectedCustomerId 
                                                          && invoice.payment_status != 'Pagado');

              console.log(filteredInvoices)
              
              // Actualiza el estado con las facturas filtradas
              setInvoicesData(filteredInvoices);
            }}
          >
            <option value="">Seleccione un cliente</option>
              {customersData.map(customer => (
                <option key={customer.value} value={customer.value}>
                  {customer.label}
                </option>
              ))}
          </select>

          {/* Dropdown 2 */}
          <select {...register("invoice_id")}
          className='form-select mb-4'
          onChange={(e) => {
            const selectedInvoiceId = parseInt(e.target.value);
            
            // Realiza una llamada a la API para obtener los detalles de la factura seleccionada
            fetch(`https://4dp9b64cd0.execute-api.us-east-1.amazonaws.com/dev/v1/invoices/${selectedInvoiceId}`)
              .then(response => response.json())
              .then(data => {
                // Actualiza el estado con los detalles de la factura
                setSelectedInvoice(data);
              })
              .catch(error => console.error('Error fetching invoice details', error));
          }}>
            <option value="">Seleccione una factura</option>
            {invoicesData.map(invoice => (
              <option key={invoice.invoice_id} value={invoice.invoice_id}>
                {invoice.invoice_number}
              </option>
            ))}
          </select>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {selectedInvoice && (
              <div>
            <MDBCard className='m-5'>
              <MDBCardBody>
                <h4 className="text-center">Detalles de la Factura</h4>
                <p>Invoice Number: {selectedInvoice.invoice_number}</p>
                <p>Issue Date: {selectedInvoice.issue_date}</p>
                <p>Subtotal: {selectedInvoice.subtotal}</p>
                <p>Discounts: {selectedInvoice.discounts}</p>
                <p>Taxes: {selectedInvoice.taxes}</p>
                <p>Total: {selectedInvoice.total}</p>
                <p>Payment Method: {selectedInvoice.payment_method}</p>
                <p>Payment Status: {selectedInvoice.payment_status}</p>
                <p>Currency: {selectedInvoice.currency}</p>
                {/* Otros campos */}
              </MDBCardBody>
            </MDBCard>

              <h4 className="text-center">Invoice Items</h4>

              {selectedInvoice.invoice_items.map((item) => (
                <MDBCard key={item.invoice_item_id} className='mb-3'>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol>
                        <h5 className="card-title">{item.product_name}</h5>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <p className="card-text">Price per unit: ${item.product_price}</p>
                      </MDBCol>
                      {/* Puedes agregar más columnas aquí según sea necesario */}
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              ))}
              </div>
          )}
          </div>

          <MDBBtn type="submit" className='mb-4 w-100 gradient-custom-4' size='lg'>Pay</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Payment;
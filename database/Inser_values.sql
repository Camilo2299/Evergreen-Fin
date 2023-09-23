-- Insertar datos en la tabla de productos
INSERT INTO products (product_name, product_price)
VALUES
    ('Papa', 10.99),
    ('Café', 15.99),
   	('Aguacate', 6.00),
  	('Platano', 4.50);
    
-- Insertar datos en la tabla de clientes
INSERT INTO customers (name, last_name, email, phone_number, adress)
VALUES
    ('Juan', 'Perez', 'juan@example.com', '1234567890', '123 Main St'),
    ('Ana', 'Gomez', 'ana@example.com', '9876543210', '456 Elm St');
    
-- Insertar datos en la tabla de Patrimonio
INSERT INTO equity (month, year, date, amount, description)
VALUES
    (1, 2023, '2023-09-22' ,1109500.00, 'Inversión inicial de los socios'),
    (2, 2023, '2023-09-22' ,1271830.00, 'Ganancias acumuladas');
    
-- Insertar datos en la tabla de Pasivos
INSERT INTO liabilities (liability_name, due_date, amount, description)
VALUES
    ('Préstamo Bancario', '2023-10-01', 5000.00, 'Préstamo para capital de trabajo'),
    ('Facturas por Pagar', '2023-09-30', 2000.00, 'Facturas pendientes de pago');
    
-- Insertar datos en la tabla de Activos
INSERT INTO assets (asset_name, purchase_date, value, description)
VALUES
    ('Computadora', '2023-09-15', 1200.00, 'Computadora de escritorio'),
    ('Vehículo', '2023-09-18', 15000.00, 'Automóvil para la empresa'),
    ('Tractor', '2023-07-18', 750000.00, 'Tractor para el campo'),
    ('Terreno', '2023-05-18', 3500000.00, 'Tractor para el campo'),
    ('Caja', '2023-05-18', 20000.00, 'Tractor para el campo');
    
-- Insertar datos en la tabla de Responsable
INSERT INTO responsibles (responsible_name, contact_info)
VALUES
    ('Eliezer Maduro', 'Correo: eliezer.maduro@evergreen.com, Teléfono: 1234567890'),
    ('Juan Camilo Echeverry', 'Correo: juanc.echeverry@evergreen.com, Teléfono: 9876543210');
    
-- Insertar datos en la tabla de Centro de Costos
INSERT INTO cost_centers (center_name, description)
VALUES
    ('Centro de Costo GRANJA', 'Centro de costos para la granja'),
    ('Centro de Costo SUMINISTRO', 'Centro de costos para suministros');
    
-- Insertar datos en la tabla de Movimientos
INSERT INTO transactions (transaction_date,transaction_type, description, amount)
VALUES
    ('2023-09-20', 'COMPRA' ,'Compra de suministros', 200.00),
    ('2023-09-21', 'VENTA' ,'Venta de productos', 1000.00);
    
-- Insertar datos en la tabla de Accounting Accounts
INSERT INTO accounting_accounts (account_name, account_type, transaction_id, date, amount)
VALUES
    ('Egreso por compra de materiales', 'Pasivo', 1 , '2023-09-20', 200.00),
    ('Ingreso por venta', 'Activo', 2, '2023-09-21', 1000.00);
    
-- Insertar datos en la tabla de Gastos
INSERT INTO expenses (center_id, expense_date, expense_category, responsible_id, amount, description)
VALUES
    (1, '2023-09-20', 'Suministros de Oficina', 1, 50.00, 'Compra de suministros para la oficina'),
    (2, '2023-09-22', 'Alquiler de Oficina', 2, 1000.00, 'Pago mensual de alquiler');
   
select * from expenses;
    
-- Insertar datos en la tabla de Costos
INSERT INTO costs (cost_date, cost_category, amount, description)
VALUES
    ('2023-09-20', 'Materiales de Producción', 200.00, 'Compra de materias primas'),
    ('2023-09-22', 'Servicios Profesionales', 500.00, 'Honorarios legales');
    
-- Insertar datos en la tabla de Comprobante de Egresos
INSERT INTO expense_receipt (receipt_number, issue_date, expense_category, amount, payment_method, payment_status, currency, exchange_rate)
VALUES
    ('REC-2023-001', '2023-09-20', 'Suministros de Oficina', 50.00, 'Tarjeta de crédito', 'Pagado', 'USD', 1.0000),
    ('REC-2023-002', '2023-09-21', 'Alquiler de Oficina', 1000.00, 'Transferencia bancaria', 'Pagado', 'USD', 1.0000);
   
-- Insertar datos en la tabla de Factura de Venta
INSERT INTO sales_invoice (invoice_number, issue_date, customer_id, subtotal, discounts, taxes, total, payment_method, payment_status, currency, exchange_rate)
VALUES
    ('INV-2023-001', '2023-09-20', 1, 29.97, 0.00, 5.39, 35.36, 'Tarjeta de crédito', 'Pagado', 'USD', 1.0000),
    ('INV-2023-002', '2023-09-21', 2, 31.98, 2.00, 5.76, 35.74, 'Efectivo', 'Pendiente', 'USD', 1.0000);
    
-- Insertar datos en la tabla de Ingresos
INSERT INTO income (income_date, invoice_id, income_source, amount, description, payment_method, income_status, currency, exchange_rate, income_category)
VALUES
    ('2023-09-20', 1, 'INV-2023-001', 35.36, 'Ingreso por venta de productos', 'Tarjeta de crédito', 'Cobrado', 'USD', 1.0000, 'Ventas'),
    ('2023-09-22', 2, 'INV-2023-002', 0.00, 'Pago pendiente de factura', 'Efectivo', 'Pendiente', 'USD', 1.0000, 'Cuentas por cobrar');
    
-- Insertar datos en la tabla de invoice_item (Detalles de factura)
INSERT INTO invoice_item (invoice_id, product_id, quantity)
VALUES
    (1, 3, 100),
    (1, 4, 25),
    (2, 5, 75),
    (2, 6, 60);
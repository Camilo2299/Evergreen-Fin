-- Tabla de clientes
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    phone_number VARCHAR(20),
    adress VARCHAR(200)
);

-- Tabla de productos
CREATE TABLE  products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50),
    product_price  NUMERIC(12, 2)
);

-- Tabla de Responsable
CREATE TABLE responsibles (
    responsible_id SERIAL PRIMARY KEY,
    responsible_name VARCHAR(255),
    contact_info TEXT
);

-- Tabla de Activos
CREATE TABLE assets (
    asset_id SERIAL PRIMARY KEY,
    asset_name VARCHAR(255),
    purchase_date DATE,
    value NUMERIC(12, 2),
    description TEXT
);

-- Tabla de Pasivos
CREATE TABLE liabilities (
    liability_id SERIAL PRIMARY KEY,
    liability_name VARCHAR(255),
    due_date DATE,
    amount NUMERIC(12, 2),
    description TEXT
);

-- Tabla de Patrimonio
CREATE TABLE equity (
    equity_id SERIAL PRIMARY KEY,
    month INTEGER,
    year INTEGER,
    date DATE,
    amount NUMERIC(12, 2),
    description TEXT
);

-- Tabla de Movimientos
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    transaction_type VARCHAR(10),
    transaction_date DATE,
    description TEXT,
    amount NUMERIC(12, 2)
);

-- Tabla de Centro de Costos
CREATE TABLE cost_centers (
    center_id SERIAL PRIMARY KEY,
    center_name VARCHAR(255),
    description TEXT
);

-- Tabla de Costos
CREATE TABLE costs (
    cost_id SERIAL PRIMARY KEY,
    cost_date DATE,
    cost_category VARCHAR(100),
    amount NUMERIC(12, 2),
    description TEXT
);

-- Tabla de Gastos
create table expenses (
    expense_id SERIAL PRIMARY KEY,
    center_id SERIAL, 
    expense_date DATE,
    expense_category VARCHAR(100),
    responsible_id SERIAL,
    amount NUMERIC(12, 2),
    description TEXT,
    FOREIGN KEY (center_id) REFERENCES cost_centers(center_id),
    FOREIGN KEY (responsible_id) REFERENCES responsibles(responsible_id)
);

-- Tabla de Cuentas Contables
CREATE TABLE accounting_accounts (
    account_id SERIAL PRIMARY KEY,
    account_name VARCHAR(255),
    account_type VARCHAR(50),
    transaction_id SERIAL,
    date DATE,
    amount NUMERIC(12,2),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

-- Tabla de Comprobante de Egresos
CREATE TABLE expense_receipt (
    receipt_id SERIAL PRIMARY KEY,
    receipt_number VARCHAR(255),
    issue_date DATE,
    expense_category VARCHAR(100),
    amount NUMERIC(12, 2),
    payment_method VARCHAR(100),
    payment_status VARCHAR(50),
    currency VARCHAR(10),
    exchange_rate NUMERIC(10, 4)
);

-- Tabla de Factura de Venta
CREATE TABLE sales_invoice (
    invoice_id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(255),
    issue_date DATE,
    customer_id INTEGER,
    subtotal NUMERIC(12, 2),
    discounts NUMERIC(12, 2),
    taxes NUMERIC(12, 2),
    total NUMERIC(12, 2),
    payment_method VARCHAR(100),
    payment_status VARCHAR(50),
    currency VARCHAR(10),
    exchange_rate NUMERIC(10, 4),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


-- Tabla de Ingresos
CREATE TABLE income (
    income_id SERIAL PRIMARY KEY,
    income_date DATE,
    invoice_id SERIAL,
    income_source VARCHAR(255), --invoice_number
    amount NUMERIC(12, 2),
    description TEXT,
    payment_method VARCHAR(100),
    income_status VARCHAR(50),
    currency VARCHAR(10),
    exchange_rate NUMERIC(10, 4),
    income_category VARCHAR(100),
    FOREIGN KEY (invoice_id) REFERENCES sales_invoice(invoice_id)
);


CREATE TABLE invoice_item (
    invoice_item_id SERIAL PRIMARY KEY,
    invoice_id SERIAL,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (invoice_id) REFERENCES sales_invoice(invoice_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
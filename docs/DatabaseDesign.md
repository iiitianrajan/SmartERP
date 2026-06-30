# SmartERP Database Design

## Database

PostgreSQL

---

# Tables

## Users

| Column | Type |
|---------|------|
| id | SERIAL |
| name | VARCHAR(100) |
| email | VARCHAR(100) |
| password | TEXT |
| role | VARCHAR(20) |
| created_at | TIMESTAMP |

---

## Companies

| Column | Type |
|---------|------|
| id | SERIAL |
| user_id | INTEGER |
| company_name | VARCHAR(100) |
| gst_number | VARCHAR(20) |
| address | TEXT |
| state | VARCHAR(50) |
| financial_year | VARCHAR(20) |

---

## Customers

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| name | VARCHAR(100) |
| phone | VARCHAR(20) |
| gst_number | VARCHAR(20) |
| address | TEXT |
| balance | NUMERIC |

---

## Suppliers

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| name | VARCHAR(100) |
| phone | VARCHAR(20) |
| gst_number | VARCHAR(20) |
| balance | NUMERIC |

---

## Groups

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| group_name | VARCHAR(100) |

---

## Stock Groups

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| group_name | VARCHAR(100) |

---

## Units

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| unit_name | VARCHAR(20) |

---

## Stock Items

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| stock_group_id | INTEGER |
| name | VARCHAR(100) |
| sku | VARCHAR(30) |
| purchase_price | NUMERIC |
| selling_price | NUMERIC |
| quantity | INTEGER |
| gst_percentage | NUMERIC |

---

## Sales

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| customer_id | INTEGER |
| invoice_number | VARCHAR(50) |
| invoice_date | DATE |
| subtotal | NUMERIC |
| gst | NUMERIC |
| grand_total | NUMERIC |

---

## Purchase

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| supplier_id | INTEGER |
| purchase_number | VARCHAR(50) |
| purchase_date | DATE |
| total | NUMERIC |

---

## Ledger

| Column | Type |
|---------|------|
| id | SERIAL |
| company_id | INTEGER |
| ledger_name | VARCHAR(100) |
| ledger_type | VARCHAR(50) |
| balance | NUMERIC |

---

# Relationships

- One User → Many Companies
- One Company → Many Customers
- One Company → Many Suppliers
- One Company → Many Products
- One Company → Many Ledgers
- One Customer → Many Sales
- One Supplier → Many Purchases

---

# Future Tables

- Invoice Items
- Purchase Items
- Voucher Entries
- Inventory Transactions
- GST Records
- Audit Logs

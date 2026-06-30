# SmartERP Project Flow

## User Authentication

User

↓

Login

↓

JWT Authentication

↓

Company Selection

↓

Dashboard

---

## Dashboard Modules

Dashboard

├── Masters

│ ├── Ledger

│ ├── Groups

│ ├── Stock Groups

│ ├── Stock Items

│ └── Units

│

├── Customer

├── Supplier

├── Inventory

├── Sales

├── Purchase

├── Banking

├── GST

├── Reports

└── Settings

---

## Sales Flow

Customer

↓

Create Sales Voucher

↓

Invoice Generated

↓

Inventory Reduced

↓

Ledger Updated

↓

GST Calculated

↓

Reports Updated

---

## Purchase Flow

Supplier

↓

Purchase Voucher

↓

Inventory Increased

↓

Supplier Ledger Updated

↓

GST Calculated

↓

Reports Updated

---

## Inventory Flow

Stock In

↓

Available Stock

↓

Stock Out

↓

Closing Stock

---

## Report Generation

Transactions

↓

Ledger

↓

GST

↓

Inventory

↓

Financial Reports

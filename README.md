# OdooxNMIT-EcoFinds
EcoFinds – Empowering Sustainable Consumption through a Second-Hand Marketplace


# EcoFinds Database

This folder contains the database schema, demo data, and queries for the EcoFinds project.

## 1. Setup

1. Open **pgAdmin 4** and connect to your local PostgreSQL server.
2. Open `schema.sql` in the Query Tool and run it.
   - This will create the database, tables, and indexes.

## 2. Insert Demo Data

1. Open `demo_data.sql` in the Query Tool (make sure you are connected to the `ecofinds_db`).
2. Run the file to insert sample users, products, carts, and purchases.

## 3. Test Queries

- Run `test_queries.sql` to validate the setup.
- Example outputs:
  - View products
  - Search products by keyword
  - View a user’s cart with quantities and total price
  - View purchase history

## 4. Notes

- Default database: `ecofinds_db`
- Default user: `ecofinds` (password: `ecofinds_pass`)
- You can modify these in `schema.sql` if needed.

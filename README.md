# 📖 EcoFinds – E-Commerce Platform
video link -https://drive.google.com/file/d/1bQFD3g82URwdA_P-epRnvlLcTgjC8MaT/view?usp=drive_link
EcoFinds is a simple **eco-friendly product marketplace** where users can:

* Register & login securely
* Browse and upload products
* Add items to their cart
* Complete purchases

Built with **Node.js, Express, and PostgreSQL**.

---

## 🚀 Features

* 👤 **User Authentication** – Register & login with JWT
* 📦 **Product Management** – Add, view, update, and delete products
* 🛒 **Cart System** – Add/remove products from cart
* 💳 **Purchases** – Checkout and complete orders
* 🔐 **Protected Routes** – Role-based access with JWT middleware

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (via Sequelize ORM)
* **Auth:** JWT (JSON Web Token)
* **Other:** dotenv, bcrypt, middleware for error handling

---

## 📂 Project Structure

```
EcoFinds/
 ├── backend/
 │   ├── config/        # DB config
 │   ├── controllers/   # Auth, Cart, Product, Purchase logic
 │   ├── middleware/    # JWT Auth, Error handler
 │   ├── models/        # Sequelize models (User, Product, Cart, Order)
 │   ├── server.js      # Main entry point
 │   ├── package.json
 │   └── .env
 └── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone repo

```bash
git clone <your-repo-url>
cd EcoFinds/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file in `backend/` with:

```env
PORT=5000
DB_NAME=ecofinds
DB_USER=postgres
DB_PASS=yourpassword
DB_HOST=localhost
JWT_SECRET=superSecretKey
```

### 4. Setup Database

* Make sure PostgreSQL is installed and running.
* Create a database:

```sql
CREATE DATABASE ecofinds;
```

### 5. Run the server

```bash
npm start
```

Server runs at: **[http://localhost:5000](http://localhost:5000)**

---

## 🔎 API Endpoints

### Auth

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login & get JWT

### Products

* `POST /api/products` → Add product (requires token)
* `GET /api/products` → View all products

### Cart

* `POST /api/cart` → Add to cart
* `GET /api/cart` → View cart

### Purchase

* `POST /api/purchase` → Checkout cart

---

## 🧪 Testing with Postman

1. Register → Login → Copy JWT token
2. Add a product (with Authorization header)
3. Add product to cart
4. Checkout purchase

---

## 📌 Future Improvements

* ✅ Frontend with React
* ✅ Product image upload with Cloudinary
* ✅ Admin dashboard


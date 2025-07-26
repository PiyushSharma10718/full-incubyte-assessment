# 🍬 Sweet Shop Management System - Incubyte Assessment

This project is a backend system for managing a sweet shop. It supports operations like listing sweets, searching, sorting, purchasing, and restocking — built using **Node.js**, **Express**, and **MongoDB** (Atlas). Tests are written using **Jest** and **Supertest**.

---

## 🚀 Tech Stack

- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **MongoDB Atlas** (Cloud DB)
- **Mongoose** (ODM)
- **Jest** (Unit testing)
- **Supertest** (API testing)
- **Dotenv** (Environment config)

---

## 📁 Project Structure

```
kata-backend/
│
├── app.js                # Express app
├── server.js             # Entry point
├── models/
│   └── Sweet.js          # Mongoose model
├── routes/
│   └── sweetRoutes.js    # All endpoints
├── tests/
│   ├── addSweets.test.js
│   ├── purchaseSweets.test.js
│   ├── restockSweets.test.js
│   ├── sortSweets.test.js
│   └── searchSweets.test.js
├── .env                  # MongoDB URI
└── package.json
```

---

## ⚙️ Installation

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/kata-backend.git
cd kata-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sweets-db
```

---

## ▶️ Run the Server

```bash
npm run dev
```

---

## 🧪 Run Tests

All routes are tested with Jest & Supertest.

```bash
npm test
```

You can also test specific files:

```bash
npx jest tests/purchaseSweet.test.js
```

---

## 🧁 Core Features

| Feature         | Method | Endpoint                      | Description                                |
|----------------|--------|-------------------------------|--------------------------------------------|
| Get all sweets | GET    | `/api/sweets`                 | Returns all sweet items                    |
| Search         | GET    | `/api/sweets/search`          | Search by `name`, `category`, `price`      |
| Sort           | GET    | `/api/sweets/sort`            | Sort by `name`, `price`, `quantity`, etc.  |
| Purchase       | POST   | `/api/sweets/purchase`        | Decrease quantity after purchase           |
| Restock        | POST   | `/api/sweets/restock`         | Increase stock quantity                    |
| Add Sweet      | POST   | `/api/sweets`                 | Add new sweet item                         |

---

## 🧪 Sample Test Coverage

- ✅ Sweet purchasing with quantity check
- ✅ Restocking and validation
- ✅ Sorting sweets by multiple fields
- ✅ Searching by name, category, price range
- ✅ MongoDB Atlas tested directly (real DB)

---

## 🙌 Author

**Piyush Sharma**  
_MCA | L.D. College of Engineering_  
📧 sharmapiyush10718@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/piyushsharma10718/) | [GitHub](https://github.com/PiyushSharma10718/)

---

## 📄 License

This project is licensed under the MIT License.

---

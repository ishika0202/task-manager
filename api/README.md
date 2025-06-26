
### 🔧 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** Supabase (PostgreSQL)
* **Environment Variables:** Managed via `dotenv`

---

### 📁 Project Structure

```
backend/
├── server.js               # Main server entry point
├── routes/
│   └── tasks.js            # All task-related API routes
├── controllers/
│   └── taskController.js   # Logic for each route (CRUD functions)
├── db/
│   └── supabase.js         # Supabase client setup
└── .env                    # Contains Supabase credentials and PORT
```

---

### 📌 API Endpoints

1. **GET /tasks**
   → Returns all tasks
   **Response:**

   ```json
   [
     {
       "id": 1,
       "title": "Read book",
       "status": "pending",
       "createdAt": "2025-06-19T10:00:00Z"
     }
   ]
   ```

2. **GET /tasks/\:id**
   → Returns a single task by ID

3. **POST /tasks**
   → Creates a new task
   **Request body:**

   ```json
   {
     "title": "New Task",
     "status": "pending"
   }
   ```

4. **PUT /tasks/\:id**
   → Updates an existing task (title or status)

5. **DELETE /tasks/\:id**
   → Deletes a task by ID

---

### 🌐 How It Works

* Express routes are modular and cleanly separated from business logic.
* Supabase handles all DB interactions using SQL via the client library.
* CORS is enabled for development (`localhost:3000`).
* Error handling and JSON responses included in all endpoints.

---

### ▶️ How to Run Locally

1. Navigate to the backend directory:
   `cd backend`

2. Install dependencies:
   `npm install`

3. Add a `.env` file:

   ```
   PORT=5000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-service-role-key
   ```

4. Start the server:
   `npx nodemon server.js`

5. Test: Open `http://localhost:5000/tasks` in your browser or Postman.

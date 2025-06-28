
### 🔧 Tech Stack

* **Frontend:** Next.js, Tailwind CSS, SWR
* **Backend:** Express.js (Node.js), Supabase (PostgreSQL)

---

### 🖥️ Frontend

* Built with **Next.js** (App Router)
* Styled using **Tailwind CSS** for responsive and clean design
* **SWR** used for fetching and updating data without `useEffect` or `useState`
* Core Features:

  * List all tasks from backend
  * Add new tasks via a form
  * Edit task title or status (pending/done)
  * Delete tasks
  * Auto UI updates using SWR revalidation

---

### 🛠️ Backend

* Developed using **Express.js**
* Handles all task-related **CRUD operations**
* Connected to **Supabase PostgreSQL** for persistent storage
* Includes:

  * `GET /tasks` → fetch all tasks
  * `GET /tasks/:id` → fetch a single task
  * `POST /tasks` → create a new task
  * `PUT /tasks/:id` → update a task
  * `DELETE /tasks/:id` → delete a task
* Returns JSON responses for seamless frontend integration
* CORS enabled to allow frontend requests from `localhost:3000`

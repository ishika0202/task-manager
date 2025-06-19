
## 📌 Task Manager App

A simple full-stack Task Manager using **Next.js**, **Tailwind CSS**, **SWR**, **Express**, and **Supabase**.

---

### 🔧 Tech Stack

* **Frontend:** Next.js (App Router), Tailwind CSS, SWR
* **Backend:** Node.js (Express), Supabase (PostgreSQL)

---

### 🚀 Features

* Add, view, toggle, and delete tasks
* Realtime UI updates with SWR
* Minimal, responsive UI with Tailwind CSS
* No `useEffect` or `useState` used
* Fully connected to Express backend

---

### ▶️ Run Locally

#### 📦 Backend

```bash
cd backend
npm install
# Create .env with your Supabase URL and KEY
npx nodemon server.js
```

#### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)
Backend must be running at: [http://localhost:5000](http://localhost:5000)

---

### 📁 Main File

Frontend entry: `app/page.tsx`
Uses:

* `useRef` for input
* `SWR` for data fetching
* `axios` for API calls


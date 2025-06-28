'use client'

import useSWR from 'swr';
import axios from 'axios';
import { useRef } from 'react';

interface Task {
  id: number;
  title: string;
  status: string;
}
const fetcher = (url: string) => axios.get(url).then(res => res.data);
// const baseBackendUrl = "https://task-manager-backend-45b0.onrender.com/api"
// const baseBackendUrl = 'http://192.168.29.187:5000/tasks'
const baseBackendUrl = 'https://task-manager-aukb.onrender.com/tasks'

export default function Home() {
  const { data: tasks, mutate } = useSWR(baseBackendUrl, fetcher);
  const titleRef = useRef<HTMLInputElement>(null);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    if (!title) return;
    await axios.post(baseBackendUrl, { title });
    if (titleRef.current == null) {
      return;
    }
    titleRef.current.value = '';
    mutate();
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`${baseBackendUrl}/${id}`);
    mutate();
  };

  const toggleStatus = async (task: Task) => {
    const updated = {
      ...task,
      status: task.status === 'pending' ? 'done' : 'pending',
    };
    await axios.put(`${baseBackendUrl}/${task.id}`, updated);
    mutate();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl mx-auto bg-white/90 shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-700 tracking-tight flex items-center gap-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#3B82F6" opacity="0.1" />
            <path d="M7 13l3 3 7-7" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Task Manager
        </h1>
        <form onSubmit={addTask} className="flex mb-6 gap-3">
          <input
            ref={titleRef}
            type="text"
            placeholder="Add a new task..."
            className="flex-1 border-2 border-blue-100 rounded-lg px-4 py-2 text-lg transition focus:outline-none focus:border-blue-400 bg-blue-50/50"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-2 rounded-lg font-semibold shadow active:scale-95"
          >
            Add
          </button>
        </form>

        {tasks?.length === 0 && (
          <p className="text-gray-400 text-center py-8">No tasks yet. ✨</p>
        )}

        <ul className="space-y-4">
          {tasks?.map((task: Task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center border rounded-xl px-4 py-3 shadow-sm bg-white transition hover:shadow-lg hover:bg-blue-50/60 group`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStatus(task)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                    ${task.status === 'done'
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-blue-300 bg-white hover:bg-blue-100'}
                  `}
                  aria-label="Toggle status"
                >
                  {task.status === 'done' && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <div>
                  <p className={`text-lg ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'} transition`}>
                    {task.title}
                  </p>
                  <span className="text-xs text-gray-400">Status: {task.status}</span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-600 transition text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                title="Delete"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        ::selection {
          background: #dbeafe;
        }
      `}</style>
    </main>
  );

}

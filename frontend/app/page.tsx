'use client'

import useSWR from 'swr';
import axios from 'axios';
import { useRef } from 'react';

interface Task{
  id: number;
  title: string;
  status: string;
}
const fetcher = (url: string) => axios.get(url).then(res => res.data);
const baseBackendUrl = "https://task-manager-backend-45b0.onrender.com/tasks"
// const baseBackendUrl = 'http://192.168.29.187:5000/tasks'

export default function Home() {
  const { data: tasks, mutate } = useSWR(baseBackendUrl, fetcher);
  const titleRef = useRef<HTMLInputElement>(null);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    if (!title) return;
    await axios.post(baseBackendUrl, { title });
    if(titleRef.current == null){
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
    await axios.put(`${baseBackendUrl}${task.id}`, updated);
    mutate();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        <form onSubmit={addTask} className="flex mb-4">
          <input
            ref={titleRef}
            type="text"
            placeholder="Add a new task"
            className="flex-1 border rounded px-3 py-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>

        {tasks?.length === 0 && <p className="text-gray-500">No tasks yet.</p>}

        <ul className="space-y-3">
          {tasks?.map((task: Task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border p-3 rounded hover:bg-gray-50"
            >
              <div>
                <p className={task.status === 'done' ? 'line-through text-gray-400' : ''}>{task.title}</p>
                <small className="text-sm text-gray-500">Status: {task.status}</small>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(task)}
                  className="text-sm text-green-600 hover:underline"
                >
                  Toggle
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

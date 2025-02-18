import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TaskPage from './pages/TaskPage';
import MyCalendar from './pages/MyCalender';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import TaskFlowHero from './pages/TaskFlowHero';

function App() {
  return (
    <div className="w-screen h-full flex">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskFlowHero/>} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/calendar" element={<MyCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

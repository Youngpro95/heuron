import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full">
        <nav className="bg-gray-50 border-b border-gray-200 px-5 py-4">
          <ul className="flex gap-5">
            <li>
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Main
              </a>
            </li>
            <li>
              <a href="/task1" className="text-gray-700 hover:text-blue-600 font-medium">
                Task 1 - Image Gallery
              </a>
            </li>
            <li>
              <a href="/task2" className="text-gray-700 hover:text-blue-600 font-medium">
                Task 2 - Card Game
              </a>
            </li>
            <li>
              <a href="/task3" className="text-gray-700 hover:text-blue-600 font-medium">
                Task 3 - String Processing
              </a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/task1" element={<Task1Page />} />
          <Route path="/task2" element={<Task2Page />} />
          <Route path="/task3" element={<Task3Page />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

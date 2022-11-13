import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components";
import { TaskOne, TaskTwo } from "./pages";
import { routes } from "./utils/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="md:flex">
        <Sidebar />
        <Routes>
          <Route path={routes.HOME} element={<TaskOne />} />
          <Route path={routes.TASKONE} element={<TaskOne />} />
          <Route path={routes.TASKTWO} element={<TaskTwo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

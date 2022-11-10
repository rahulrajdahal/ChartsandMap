import React from "react";

import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { TaskOne, TaskTwo, Home } from "./pages";
import { routes } from "./utils/routes";

function App() {
  const [curentPath, setCurrentPath] = React.useState<string>("/taskone");

  const handleLinkOnClick = (path: string) =>
    setCurrentPath((currentPath: string) => path);

  return (
    <BrowserRouter>
      <div className="flex">
        <div className="min-w-[240px] py-2 px-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold">
            <Link
              to={routes.HOME}
              onClick={() => handleLinkOnClick(routes.TASKONE)}
            >
              Tasks
            </Link>
          </h3>
          <ul className="flex flex-col gap-2">
            <li
              className={`${
                curentPath === routes.TASKONE
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-400 hover:text-white"
              } px-4 py-2 rounded-sm`}
            >
              <Link
                to={routes.TASKONE}
                onClick={() => handleLinkOnClick(routes.TASKONE)}
              >
                Task One
              </Link>
            </li>
            <li
              className={`${
                curentPath === routes.TASKTWO
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-400 hover:text-white"
              }
            px-4 py-2 rounded-sm
            `}
            >
              <Link
                to={routes.TASKTWO}
                onClick={() => handleLinkOnClick(routes.TASKTWO)}
              >
                Task Two
              </Link>
            </li>
          </ul>
        </div>
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

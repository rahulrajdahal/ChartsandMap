import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../utils/routes";

/**
 * @description Renders the sidebar for the application
 * @returns {JSX.Element}
 */
function Sidebar() {
  /**
   * @description state to store the current url
   */
  const [curentPath, setCurrentPath] = React.useState<string>("/taskone");

  /**
   *
   * @description This function is used to set the current path
   * @param path  - path to be set as current path
   * @returns
   */
  const handleLinkOnClick = (path: string) =>
    setCurrentPath((currentPath: string) => path);

  return (
    <div className="min-w-[240px] py-2 px-8 flex flex-col gap-4 bg-blue-100">
      <h3 className="text-xl font-bold">
        <Link
          to={routes.HOME}
          onClick={() => handleLinkOnClick(routes.TASKONE)}
        >
          Tasks
        </Link>
      </h3>
      <ul className="flex md:flex-col gap-2">
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
  );
}

export default Sidebar;

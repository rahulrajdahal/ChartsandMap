import { Link } from "@tanstack/react-router";

// Links for the pages.
const links = [
  { id: 1, title: "Task One", to: "/" },
  { id: 2, title: "Task Two", to: "/task-two" },
];

export default function Sidebar() {
  return (
    <div className="max-w-[15rem] h-screen w-full py-6 px-4 flex items-center flex-col gap-4 bg-blue-100">
      <Link className="text-2xl font-bold" to={"/"}>
        Tasks
      </Link>
      <div className="flex md:flex-col gap-2 w-full">
        {links.map(({ id, title, to }) => (
          <Link
            key={id}
            to={to}
            className="[&.active]:bg-blue-800 [&.active]:text-white rounded-md hover:bg-blue-400 hover:text-white px-8 py-2"
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
}

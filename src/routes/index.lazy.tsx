import { useQueries } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const Route = createLazyFileRoute("/")({
  component: TaskOne,
});

function TaskOne() {
  const [
    { data, isLoading },
    { data: projectsData, isLoading: projectsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["taskOne"],
        queryFn: async () => {
          const response = await fetch(
            "https://bipadportal.gov.np/api/v1/organization"
          );
          return response.json();
        },
      },
      {
        queryKey: ["taskTwo"],
        queryFn: async () => {
          const response = await fetch(
            "https://bipadportal.gov.np/api/v1/project"
          );
          return response.json();
        },
      },
    ],
  });

  const pieData = useMemo(
    () =>
      data?.results
        .map(
          (organization: {
            id: number;
            shortName: string;
            responsibleFor: number[];
          }) => {
            const projects = projectsData?.results.filter(
              (project: { organization: number }) =>
                organization.responsibleFor.includes(project.organization)
            );

            if (projects.length > 0) {
              return { name: organization.shortName, value: projects.length };
            }
          }
        )
        .filter(
          (organization: { name: string; value: number }) =>
            organization !== undefined
        ),
    [data, projectsData]
  );

  console.log(pieData, "pei");
  const pieColors = pieData?.map((_: number, index: number) => {
    return `hsl(${index * 40}, 100%, 50%)`;
  });

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="text-4xl font-bold mt-8 mb-32">Task One</h1>

      {isLoading || projectsLoading ? (
        "Loading...."
      ) : (
        <ResponsiveContainer width={750} height={350}>
          <PieChart className="w-full h-full">
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              label
              fill="#8884d8"
            >
              {pieData.map((_: number, index: number) => (
                <Cell
                  key={`cell-${index.toPrecision()}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Pie>
            <Legend height={100} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

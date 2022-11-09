import { Api } from "../app/api";
import { queries } from "../utils/queries";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components";

import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

function TaskOne() {
  const api = new Api();

  /**
   * @description This is the query to fetch the organizations data from the api
   */
  const { data: organizations, isLoading: organizationLoading } = useQuery(
    [queries.GET_ALL_ORGANIZATIONS],
    api.getAllOrganizations
  );

  /**
   * @description This is the query to fetch the projects data from the api
   */
  const { data: projects, isLoading: projectsLoading } = useQuery(
    [queries.GET_ALL_PROJECTS],
    api.getAllProjects
  );

  /**
   * @description This maps the organizations projects
   * @returns {Array} Array of objects containing the organization name and the number of projects
   */
  const organizationsWithProjects = useMemo(() => {
    return organizations?.results.map((org: any) => {
      const projectsOfOrg = projects?.results.filter(
        (project: any) => project.oid === org.oid
      );

      return { name: org.oname, value: projectsOfOrg?.length };
    });
  }, [organizations, projects]);

  /**
   * @description Returns data to be displayed in the pie chart based on the selected organization whose projects are greater than 0
   */
  const pieData = useMemo(() => {
    return organizationsWithProjects?.filter(
      (pieData: any) => pieData.value > 0
    );
  }, [organizationsWithProjects]);

  /**
   * @description Returns the color of the pie chart based on the index
   */
  const pieColors = organizationsWithProjects?.map((_: any, index: number) => {
    return `hsl(${index * 40}, 100%, 50%)`;
  });

  /**
   * @description Renders the UI for TaskOne page
   * @returns {JSX.Element}
   */
  return (
    <>
      <h1 className="text-3xl text-center mb-4">Task One</h1>

      <div className="flex flex-col items-center gap-2">
        {organizationLoading || projectsLoading ? (
          <Loader />
        ) : (
          <div className="w-full h-screen">
            <ResponsiveContainer>
              <PieChart width={100} height={100}>
                <Pie
                  dataKey="value"
                  data={pieData}
                  innerRadius={100}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Legend height={100} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default TaskOne;

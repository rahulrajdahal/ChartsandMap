import { createLazyFileRoute } from "@tanstack/react-router";

import Map from "../components/Map";

export const Route = createLazyFileRoute("/task-two")({
  component: About,
});

function About() {
  return (
    <>
      <Map />
    </>
  );
}

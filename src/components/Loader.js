import React from "react";
import { leapfrog } from "ldrs";
const Loader = () => {
  leapfrog.register();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <l-leapfrog size="80" speed="2.5" color="black"></l-leapfrog>{" "}
    </div>
  );
};

export default Loader;

import { useStore } from "effector-react";
import * as React from "react";
import { $height, $width, updateWidth } from "./model";

export const App = () => {
  const width = useStore($width);
  const height = useStore($height);

  React.useEffect(() => {
    updateWidth(window);
    window.addEventListener("resize", () => updateWidth(window));
    return () =>
      window.removeEventListener("resize", () => updateWidth(window));
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Updates on width/height changes every 200ms</h3>
      <h1>Width: {width}</h1>
      <h1>Height: {height}</h1>
    </div>
  );
};

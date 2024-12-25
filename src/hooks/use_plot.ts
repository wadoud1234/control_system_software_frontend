import { Axis } from "@/types";
import { useState } from "react";

export default function usePlot(
  {
    default_x_axis = [0, 10],
    default_y_axis = [0, 2],
    default_plotSrc = "",
  }: {
    default_x_axis?: Axis;
    default_y_axis?: Axis;
    default_plotSrc?: string;
  } = {
    default_x_axis: [0, 10],
    default_y_axis: [0, 2],
    default_plotSrc: "",
  }
) {
  const [plotSrc, setPlotSrc] = useState(default_plotSrc);
  const [x_axis, setX_axis] = useState<Axis>(default_x_axis);
  const [y_axis, setY_axis] = useState<Axis>(default_y_axis);

  function downloadPlot(name: string) {
    if (!plotSrc) {
      alert("No plot available to download.");
      return;
    }

    const currentDate = new Date();

    // Format as "YYYY-MM-DD_HH-MM-SS"
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate
      .toTimeString()
      .split(" ")[0]
      .replace(/:/g, "-");

    // Combine date and time
    const timestamp = `${formattedDate}_${formattedTime}`;

    // Generate filename with the timestamp
    const filename = `plot_${name}_${timestamp}.svg`;

    // Create a temporary <a> element
    const a = document.createElement("a");
    a.href = plotSrc;
    a.download = filename; // Default filename for the downloaded file
    document.body.appendChild(a);

    // Trigger download and clean up
    a.click();
    document.body.removeChild(a);
  }

  return {
    plotSrc,
    x_axis,
    y_axis,
    setPlotSrc,
    setX_axis,
    setY_axis,
    downloadPlot,
  };
}

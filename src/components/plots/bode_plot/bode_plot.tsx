import StateSpaceApi from "@/api/state_space/state_space";
import TransferFunctionApi from "@/api/transfer_function/transfer_function";
import { useFormContext } from "@/components/contexts/plots_context";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePlot from "@/hooks/use_plot";
import { DownloadIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";

const transfer_function_api = TransferFunctionApi.getInstance();
const state_space_api = StateSpaceApi.getInstance();

export default function BodePlot({ t_max }: { t_max: number }) {
  const { type, state } = useFormContext();

  const [performanceSpecs, setPerformanceSpecs] = useState<
    { key: string; value: number }[]
  >([]);

  const { plotSrc, setPlotSrc, x_axis, setX_axis, downloadPlot } = usePlot({
    default_x_axis: [-1, 2],
  });

  async function handlePlot() {
    try {
      let response;
      if (type === "tf")
        response = await transfer_function_api.bode({
          ...state,
          t_max,
          x_axis,
        });
      else response = await state_space_api.bode({ ...state, t_max, x_axis });

      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setPlotSrc(imageUrl);
      } else alert("ERROR");
    } catch (error) {
      alert(error);
    }
  }

  async function fetchPerformanceSpecs() {
    try {
      let response;
      if (type === "tf")
        response = await transfer_function_api.bode_performance(state);
      else response = await state_space_api.bode_performance(state);

      if (response.ok) {
        const data = await response.json();
        setPerformanceSpecs(data);
      } else alert("ERROR");
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchPerformanceSpecs();
  }, []);

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <div className="flex items-center justify-end w-full gap-2 p-2">
        {plotSrc && (
          <Button
            onClick={() => downloadPlot("bode")}
            variant="secondary"
            className="font-semibold"
          >
            <DownloadIcon className="size-5" />
            Download
          </Button>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="font-semibold">
              <SettingsIcon className="size-5" />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Label>X axis</Label>
              <Input
                type="number"
                value={x_axis[0]}
                max={x_axis[1]}
                onChange={(e) => setX_axis([Number(e.target.value), x_axis[1]])}
                className="w-20 no-spinner"
              />
              <Input
                type="number"
                value={x_axis[1]}
                min={x_axis[0]}
                onChange={(e) => setX_axis([x_axis[0], Number(e.target.value)])}
                className="w-20 no-spinner"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button className="w-20 font-semibold" onClick={handlePlot}>
          Plot
        </Button>
      </div>
      <div className="svg-container" />
      {plotSrc && (
        <img
          className="bg-red-500 mx-auto object-cover object-center h-[500px]"
          src={plotSrc}
          alt={"bode plot"}
        />
      )}
      {performanceSpecs && (
        <DataTable
          caption="Performance Specifications"
          data={performanceSpecs}
        />
      )}
    </div>
  );
}

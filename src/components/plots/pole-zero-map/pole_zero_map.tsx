import StateSpaceApi from "@/api/state_space/state_space";
import TransferFunctionApi from "@/api/transfer_function/transfer_function";
import { useFormContext } from "@/components/contexts/plots_context";
import { Button } from "@/components/ui/button";
import usePlot from "@/hooks/use_plot";
import { DownloadIcon } from "lucide-react";

const transfer_function_api = TransferFunctionApi.getInstance();
const state_space_api = StateSpaceApi.getInstance();

export default function PoleZeroMapPlot() {
  const { type, state } = useFormContext();
  const { downloadPlot, setPlotSrc, plotSrc } = usePlot();

  async function handlePlot() {
    try {
      let response;
      if (type === "tf")
        response = await transfer_function_api.poles_zeros_map(state);
      else response = await state_space_api.poles_zeros_map(state);

      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setPlotSrc(imageUrl);
      } else alert("ERROR");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <div className="flex items-center justify-end w-full gap-2 p-2">
        {plotSrc && (
          <Button
            onClick={() => downloadPlot("poles_zeros_map")}
            variant="secondary"
            className="font-semibold"
          >
            <DownloadIcon className="size-5" />
            Download
          </Button>
        )}
        <Button className="w-20 font-semibold" onClick={handlePlot}>
          Plot
        </Button>
      </div>
      {plotSrc && (
        <img
          className="bg-red-500 mx-auto object-cover object-center h-[500px]"
          src={plotSrc}
          alt={"poles_zeros_map plot"}
        />
      )}
    </div>
  );
}

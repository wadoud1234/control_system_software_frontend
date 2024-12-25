import BodePlot from "@/components/plots/bode_plot/bode_plot";
import ImpulseResponse from "@/components/plots/impulse_response/impulse_response";
import NyquistPlot from "@/components/plots/nyquist_plot/nyquist_plot";
import PoleZeroMapPlot from "@/components/plots/pole-zero-map/pole_zero_map";
import RampResponse from "@/components/plots/ramp_response/ramp_response";
import StepResponse from "@/components/plots/step_response/step_response";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// type Data = TF | (SS & { t_max: number });

// interface Props {
//   name: PlotsName;
//   data: Data;
// }

// export function PlotOption({ name, data }: Props) {
//   const [plotSrc, setPlotSrc] = useState<string>("");
//   const [x_axis, setX_axis] = useState<[number, number]>([0, 10]);
//   const [y_axis, setY_axis] = useState<[number, number]>([0, 2]);

//   async function handlePlot() {
//     // will contain 4 matrices or num/den with t_max , x_axis and y_axis
//     const plotData = { ...data, x_axis, y_axis };
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/state_space/" + name.toLowerCase(),
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(plotData),
//         }
//       );
//       if (response.ok) {
//         const imageBlob = await response.blob();
//         const imageUrl = URL.createObjectURL(imageBlob);
//         setPlotSrc(imageUrl);
//       } else {
//         alert("ERROR");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   }

//   function handleDownload() {
//     if (!plotSrc) {
//       alert("No plot available to download.");
//       return;
//     }

//     const currentDate = new Date();

//     // Format as "YYYY-MM-DD_HH-MM-SS"
//     const formattedDate = currentDate.toISOString().split("T")[0];
//     const formattedTime = currentDate
//       .toTimeString()
//       .split(" ")[0]
//       .replace(/:/g, "-");

//     // Combine date and time
//     const timestamp = `${formattedDate}_${formattedTime}`;

//     // Generate filename with the timestamp
//     const filename = `plot_${name.toLowerCase()}_${timestamp}.svg`;

//     // Create a temporary <a> element
//     const a = document.createElement("a");
//     a.href = plotSrc;
//     a.download = filename; // Default filename for the downloaded file
//     document.body.appendChild(a);

//     // Trigger download and clean up
//     a.click();
//     document.body.removeChild(a);
//   }
//   return (
//     <AccordionItem value={name}>
//       <AccordionTrigger>{name}</AccordionTrigger>
//       <AccordionContent>
//         <div className="flex flex-col items-start w-full gap-2">
//           <div className="flex items-center justify-end w-full gap-2 p-2">
//             {plotSrc && (
//               <Button
//                 onClick={handleDownload}
//                 variant="secondary"
//                 className="font-semibold"
//               >
//                 <DownloadIcon className="size-5" />
//                 Download
//               </Button>
//             )}
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="secondary" className="font-semibold">
//                   <SettingsIcon className="size-5" />
//                   Settings
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="flex flex-col gap-2">
//                 <div className="flex items-center gap-2 flex-1">
//                   <Label>X axis</Label>
//                   <Input
//                     type="number"
//                     value={x_axis[0]}
//                     max={x_axis[1]}
//                     onChange={(e) =>
//                       setX_axis([Number(e.target.value), x_axis[1]])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                   <Input
//                     type="number"
//                     value={x_axis[1]}
//                     min={x_axis[0]}
//                     onChange={(e) =>
//                       setX_axis([x_axis[0], Number(e.target.value)])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2 flex-1">
//                   <Label>Y axis</Label>
//                   <Input
//                     type="number"
//                     value={y_axis[0]}
//                     max={y_axis[1]}
//                     onChange={(e) =>
//                       setY_axis([Number(e.target.value), y_axis[1]])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                   <Input
//                     type="number"
//                     value={y_axis[1]}
//                     min={y_axis[0]}
//                     onChange={(e) =>
//                       setY_axis([y_axis[0], Number(e.target.value)])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                 </div>
//               </PopoverContent>
//             </Popover>
//             <Button className="w-20 font-semibold" onClick={handlePlot}>
//               {name}
//             </Button>
//           </div>
//           {plotSrc && (
//             <img
//               className="bg-red-500 mx-auto object-cover object-center h-[500px]"
//               src={plotSrc}
//               alt={name + "plot"}
//             />
//           )}
//         </div>
//       </AccordionContent>
//     </AccordionItem>
//   );
// }

// export default function PlotsSection({ A, B, C, D }: Record<string, Matrix>) {
//   const plots: PlotsName[] = ["STEP", "IMPULSE", "RAMP", "BODE", "NYQUIST"];
//   const [t_max, setT_max] = useState(10);
//   const data: Data = { A, B, C, D, t_max };
//   return (
//     <section id="plots" className="my-10 flex flex-col space-y-2 h-[85vh]">
//       <div className="flex items-center gap-2 justify-between w-full">
//         <h2 className="text-2xl font-bold">Plots</h2>
//         <div className="flex items-center gap-2">
//           <Label>T_max :</Label>
//           <Input
//             type="number"
//             min={1}
//             value={t_max}
//             onChange={(e) => setT_max(Number(e.target.value))}
//             className="w-20"
//           />
//         </div>
//       </div>
//       <p>Select the plots you need</p>
//       <Accordion type="single" collapsible>
//         {plots.map((plot) => (
//           <PlotOption key={plot} name={plot} data={data} />
//         ))}
//       </Accordion>
//     </section>
//   );
// }

export function PlotsSection() {
  //   const plots: PlotsName[] = ["STEP", "IMPULSE", "RAMP", "BODE", "NYQUIST"];
  const [t_max, setT_max] = useState(10);
  return (
    <section id="plots" className="my-10 flex flex-col space-y-2">
      <div className="flex items-center gap-2 justify-between w-full">
        <h2 className="text-2xl font-bold">Plots</h2>
        <div className="flex items-center gap-2">
          <Label>T_max :</Label>
          <Input
            type="number"
            min={1}
            value={t_max}
            onChange={(e) => setT_max(Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>
      <p>Select the plots you need</p>
      <Accordion type="multiple">
        <AccordionItem value="step">
          <AccordionTrigger>Step Response</AccordionTrigger>
          <AccordionContent>
            <StepResponse t_max={t_max} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="impulse">
          <AccordionTrigger>Impulse Response</AccordionTrigger>
          <AccordionContent>
            <ImpulseResponse t_max={t_max} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ramp">
          <AccordionTrigger>Ramp Response</AccordionTrigger>
          <AccordionContent>
            <RampResponse t_max={t_max} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bode">
          <AccordionTrigger>Bode Plot</AccordionTrigger>
          <AccordionContent>
            <BodePlot t_max={t_max} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="nyquist">
          <AccordionTrigger>Nyquist Plot</AccordionTrigger>
          <AccordionContent>
            <NyquistPlot t_max={t_max} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pzm">
          <AccordionTrigger>Poles Zeros Map</AccordionTrigger>
          <AccordionContent>
            <PoleZeroMapPlot />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

// type IIProps = Omit<IProps, "type"> & {
//   name: PlotsName;
//   t_max: number;
//   type: string;
// };

// export function PlotsOption({ name, data, type, t_max }: IIProps) {
//   const [plotSrc, setPlotSrc] = useState<string>("");
//   const [x_axis, setX_axis] = useState<[number, number]>([0, 10]);
//   const [y_axis, setY_axis] = useState<[number, number]>([0, 2]);

//   async function handlePlot() {
//     const endpoint = `http://127.0.0.1:5000/${
//       type === "ss" ? "state_space" : "transfer_function"
//     }/${name.toLowerCase()}`;
//     const plotData = { ...data, x_axis, y_axis, t_max };
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(plotData),
//       });
//       if (response.ok) {
//         const imageBlob = await response.blob();
//         const imageUrl = URL.createObjectURL(imageBlob);
//         setPlotSrc(imageUrl);
//       } else {
//         alert("ERROR");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   }

//   function handleDownload() {
//     if (!plotSrc) {
//       alert("No plot available to download.");
//       return;
//     }

//     const currentDate = new Date();

//     // Format as "YYYY-MM-DD_HH-MM-SS"
//     const formattedDate = currentDate.toISOString().split("T")[0];
//     const formattedTime = currentDate
//       .toTimeString()
//       .split(" ")[0]
//       .replace(/:/g, "-");

//     // Combine date and time
//     const timestamp = `${formattedDate}_${formattedTime}`;

//     // Generate filename with the timestamp
//     const filename = `plot_${name.toLowerCase()}_${timestamp}.svg`;

//     // Create a temporary <a> element
//     const a = document.createElement("a");
//     a.href = plotSrc;
//     a.download = filename; // Default filename for the downloaded file
//     document.body.appendChild(a);

//     // Trigger download and clean up
//     a.click();
//     document.body.removeChild(a);
//   }
//   return (
//     <AccordionItem value={name}>
//       <AccordionTrigger>{name}</AccordionTrigger>
//       <AccordionContent>
//         <div className="flex flex-col items-start w-full gap-2">
//           <div className="flex items-center justify-end w-full gap-2 p-2">
//             {plotSrc && (
//               <Button
//                 onClick={handleDownload}
//                 variant="secondary"
//                 className="font-semibold"
//               >
//                 <DownloadIcon className="size-5" />
//                 Download
//               </Button>
//             )}
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="secondary" className="font-semibold">
//                   <SettingsIcon className="size-5" />
//                   Settings
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="flex flex-col gap-2">
//                 <div className="flex items-center gap-2 flex-1">
//                   <Label>X axis</Label>
//                   <Input
//                     type="number"
//                     value={x_axis[0]}
//                     max={x_axis[1]}
//                     onChange={(e) =>
//                       setX_axis([Number(e.target.value), x_axis[1]])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                   <Input
//                     type="number"
//                     value={x_axis[1]}
//                     min={x_axis[0]}
//                     onChange={(e) =>
//                       setX_axis([x_axis[0], Number(e.target.value)])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                 </div>
//                 <div className="flex items-center gap-2 flex-1">
//                   <Label>Y axis</Label>
//                   <Input
//                     type="number"
//                     value={y_axis[0]}
//                     max={y_axis[1]}
//                     onChange={(e) =>
//                       setY_axis([Number(e.target.value), y_axis[1]])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                   <Input
//                     type="number"
//                     value={y_axis[1]}
//                     min={y_axis[0]}
//                     onChange={(e) =>
//                       setY_axis([y_axis[0], Number(e.target.value)])
//                     }
//                     className="w-20 no-spinner"
//                   />
//                 </div>
//               </PopoverContent>
//             </Popover>
//             <Button className="w-20 font-semibold" onClick={handlePlot}>
//               {name}
//             </Button>
//           </div>
//           {plotSrc && (
//             <img
//               className="bg-red-500 mx-auto object-cover object-center h-[500px]"
//               src={plotSrc}
//               alt={name + "plot"}
//             />
//           )}
//         </div>
//       </AccordionContent>
//     </AccordionItem>
//   );
// }

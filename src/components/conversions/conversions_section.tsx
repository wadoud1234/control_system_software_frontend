import { useFormContext } from "../contexts/plots_context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ClosedLoop from "./closed_loop/closed_loop";
import TF_SS_Conversion from "./tf_ss_conversion";

export default function ConversionsSection() {
  const { type } = useFormContext();
  return (
    <section id="plots" className="my-10 flex flex-col space-y-2">
      <h2 className="text-2xl font-bold">Conversions</h2>
      <Accordion type="multiple">
        <AccordionItem value="step">
          <AccordionTrigger>Closed Loop</AccordionTrigger>
          <AccordionContent>
            <ClosedLoop />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tf_ss_conversion">
          <AccordionTrigger>
            {type === "ss" ? "Transfer Function" : "State Space"}
          </AccordionTrigger>
          <AccordionContent>
            <TF_SS_Conversion />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

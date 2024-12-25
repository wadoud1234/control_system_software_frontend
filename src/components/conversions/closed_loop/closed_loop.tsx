import StateSpaceApi from "@/api/state_space/state_space";
import TransferFunctionApi from "@/api/transfer_function/transfer_function";
import { useFormContext } from "@/components/contexts/plots_context";
import MatrixLatex from "@/components/forms/state_space/matrix_latex";
import TransferFunctionLatex from "@/components/forms/state_space/transfer_function_latex";
import { SS, TF } from "@/types";
import { useEffect, useState } from "react";

export default function ClosedLoop() {
  const { type, state } = useFormContext();
  const [tf_data, setTF_data] = useState<TF>({ num: [], den: [] });
  const [ss_data, setSS_data] = useState<SS>({ A: [], B: [], C: [], D: [] });

  async function fetchClosedLoop() {
    let response;
    if (type === "ss") {
      response = await StateSpaceApi.getInstance().close_loop(state);
      const data = await response.json();
      setSS_data({ A: data.A, B: data.B, C: data.C, D: data.D });
    } else {
      response = await TransferFunctionApi.getInstance().close_loop(state);
      const data = await response.json();
      setTF_data({ num: data.num, den: data.den });
    }
  }
  useEffect(() => {
    fetchClosedLoop();
  }, []);
  if (type === "ss") {
    return (
      <MatrixLatex A={ss_data.A} B={ss_data.B} C={ss_data.C} D={ss_data.D} />
    );
  } else {
    return (
      <TransferFunctionLatex
        showLabel={false}
        num={tf_data.num}
        den={tf_data.den}
      />
    );
  }
}

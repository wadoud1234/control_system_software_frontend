import StateSpaceApi from "@/api/state_space/state_space";
import { useFormContext } from "../contexts/plots_context";
import MatrixLatex from "../forms/state_space/matrix_latex";
import TransferFunctionLatex from "../forms/state_space/transfer_function_latex";
import TransferFunctionApi from "@/api/transfer_function/transfer_function";
import { SS, TF } from "@/types";
import { useEffect, useState } from "react";

export default function TF_SS_Conversion() {
  const { type, state } = useFormContext();
  const [tf_data, setTF_data] = useState<TF>({ num: [], den: [] });
  const [ss_data, setSS_data] = useState<SS>({ A: [], B: [], C: [], D: [] });
  console.log({ tf_data, ss_data });
  async function fetchConversion() {
    let response;
    if (type === "ss") {
      response = await StateSpaceApi.getInstance().conversion_to_tf(state);
      const data = await response.json();
      setTF_data({ num: data.num, den: data.den });
    } else {
      response = await TransferFunctionApi.getInstance().conversion_to_ss(
        state
      );
      const data = await response.json();
      setSS_data({ A: data.A, B: data.B, C: data.C, D: data.D });
    }
  }

  useEffect(() => {
    fetchConversion();
  }, []);

  if (type === "ss") {
    return (
      <TransferFunctionLatex
        showLabel={false}
        num={tf_data.num}
        den={tf_data.den}
      />
    );
  } else {
    return (
      <MatrixLatex A={ss_data.A} B={ss_data.B} C={ss_data.C} D={ss_data.D} />
    );
  }
}

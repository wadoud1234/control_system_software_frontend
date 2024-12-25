import { createContext, PropsWithChildren, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { StateSpaceSchema } from "./schema";
import { TransferFunctionSchema } from "../transfer_function/schema";

interface StateSpaceMatrixInputContext {
  type?: "ss";
  width: number;
  height: number;
  name: "A" | "B" | "C" | "D";
  form: UseFormReturn<StateSpaceSchema>;
}

interface TransferFunctionMatrixInputContext {
  type?: "tf";
  width: number;
  height: number;
  name: "num" | "den";
  form: UseFormReturn<TransferFunctionSchema>;
}

const ss_matrixContext = createContext<StateSpaceMatrixInputContext | null>(
  null
);
const tf_matrixContext =
  createContext<TransferFunctionMatrixInputContext | null>(null);
// function useMatrixInput(form:UseFormReturn,name:string){
//     const {fields,append,remove} = useFieldArray({
//         control:form.control,
//         name
//     })
// }

export function useMatrixContext(type: "tf" | "ss") {
  let context;
  if (type === "ss") {
    context = useContext(ss_matrixContext);
  } else {
    context = useContext(tf_matrixContext);
  }

  if (!context) {
    throw new Error(
      "useMatrixContext should be used within MatrixInputContextProvider"
    );
  }
  return context;
}

type Props =
  | { type: "tf"; context: TransferFunctionMatrixInputContext }
  | { type: "ss"; context: StateSpaceMatrixInputContext };

export default function MatrixInputContextProvider({
  type,
  context,
  children,
}: PropsWithChildren<Props>) {
  if (type === "tf") {
    return (
      <tf_matrixContext.Provider value={context}>
        {children}
      </tf_matrixContext.Provider>
    );
  }
  return (
    <ss_matrixContext.Provider value={context}>
      {children}
    </ss_matrixContext.Provider>
  );
}

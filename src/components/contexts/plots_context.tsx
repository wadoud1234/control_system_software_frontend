import { SS_Input } from "@/api/state_space/ss_inputs";
import { TF_Input } from "@/api/transfer_function/tf_inputs";
import { createContext, PropsWithChildren, useContext } from "react";

type FormContext =
  | {
      type: "tf";
      state: TF_Input;
    }
  | {
      type: "ss";
      state: SS_Input;
    };

const formContext = createContext<FormContext | null>(null);

export default function FormContextProvider({
  context,
  children,
}: PropsWithChildren<{ context: FormContext }>) {
  return (
    <formContext.Provider value={context}>{children}</formContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(formContext);
  if (!context)
    throw new Error("useFormContext must be used within a FormContextProvider");
  return context;
}

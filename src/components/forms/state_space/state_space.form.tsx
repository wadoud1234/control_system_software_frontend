import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { state_space_schema, StateSpaceSchema } from "./schema";
import { useTransition } from "react";
import MatrixInputContextProvider from "./matrix.context";
import MatrixInput from "./matrix_input";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import MatrixLatex from "./matrix_latex";
import FormContextProvider from "@/components/contexts/plots_context";
import { PlotsSection } from "./plots_section";
import ConversionsSection from "@/components/conversions/conversions_section";

function useStateSpaceForm() {
  const form = useForm<StateSpaceSchema>({
    resolver: zodResolver(state_space_schema),
    defaultValues: {
      A_size: 2,
      D_size: 1,
      A: [
        [-2, 0],
        [0, -3],
      ],
      B: [[1], [1]],
      C: [[1, 0]],
      D: [[0]],
    },
  });

  const [pending, startTransition] = useTransition();

  function onSubmit(_: StateSpaceSchema) {
    startTransition(() => {});
  }
  function setMatrixSize(
    name: "A_size" | "D_size",
    op: "increase" | "decrease"
  ) {
    form.setValue(
      name,
      op === "increase" ? form.watch(name) + 1 : form.watch(name) - 1
    );
  }

  return { form, onSubmit, pending, setMatrixSize } as const;
}

interface SetSizeButtonsProps {
  form: UseFormReturn<StateSpaceSchema>;
  setMatrixSize: (
    name: "A_size" | "D_size",
    op: "increase" | "decrease"
  ) => void;
}

function SetASizeButtons({ form, setMatrixSize }: SetSizeButtonsProps) {
  const equivalent_size = form.watch("A_size") == form.watch("D_size");
  return (
    <div className="flex items-center gap-2">
      <p>
        A Size : <b>{form.watch("A_size")}</b>
      </p>
      <Button
        size="icon"
        className="h-8 w-8"
        onClick={() => setMatrixSize("A_size", "increase")}
      >
        <PlusIcon className="size-4" />
      </Button>
      <Button
        size="icon"
        className="h-8 w-8"
        disabled={form.watch("A_size") == 1 || equivalent_size}
        onClick={() => setMatrixSize("A_size", "decrease")}
      >
        <MinusIcon className="size-5" />
      </Button>
    </div>
  );
}
function SetDSizeButtons({ form, setMatrixSize }: SetSizeButtonsProps) {
  const equivalent_size = form.watch("A_size") == form.watch("D_size");
  return (
    <div className="flex items-center gap-2">
      <p>
        D Size : <b>{form.watch("D_size")}</b>
      </p>
      <Button
        size="icon"
        className="h-8 w-8"
        disabled={equivalent_size}
        onClick={() => setMatrixSize("D_size", "increase")}
      >
        <PlusIcon className="size-4" />
      </Button>
      <Button
        size="icon"
        className="h-8 w-8"
        disabled={form.watch("D_size") == 1}
        onClick={() => setMatrixSize("D_size", "decrease")}
      >
        <MinusIcon className="size-5" />
      </Button>
    </div>
  );
}

export default function StateSpaceForm() {
  const { form, onSubmit, setMatrixSize } = useStateSpaceForm();
  const state = {
    A: form.getValues("A"),
    B: form.getValues("B"),
    C: form.getValues("C"),
    D: form.getValues("D"),
  };
  return (
    <>
      <p className="text-center my-4">
        Change the size of matrix <b>A</b> and <b>D</b> ,then enter the matrices
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section id="ss" className="flex items-stretch gap-4 h-fit">
            <div className="flex flex-col flex-1 gap-4 h-full items-center">
              <div className="flex flex-col gap-4">
                <SetASizeButtons form={form} setMatrixSize={setMatrixSize} />
                <SetDSizeButtons form={form} setMatrixSize={setMatrixSize} />
              </div>
              <div className="flex items-center gap-10 flex-1">
                {/* Matrix A */}
                <MatrixInputContextProvider
                  type="ss"
                  context={{
                    form,
                    name: "A",
                    width: form.watch("A_size"),
                    height: form.watch("A_size"),
                  }}
                >
                  <MatrixInput type="ss" />
                </MatrixInputContextProvider>

                {/* Matrix B */}
                <MatrixInputContextProvider
                  type="ss"
                  context={{
                    form,
                    name: "B",
                    width: form.watch("D_size"),
                    height: form.watch("A_size"),
                  }}
                >
                  <MatrixInput type="ss" />
                </MatrixInputContextProvider>
              </div>
              <div className="flex items-center gap-10 flex-1">
                {/* Matrix C */}
                <MatrixInputContextProvider
                  type="ss"
                  context={{
                    form,
                    name: "C",
                    width: form.watch("A_size"),
                    height: form.watch("D_size"),
                  }}
                >
                  <MatrixInput type="ss" />
                </MatrixInputContextProvider>

                {/* Matrix D */}
                <MatrixInputContextProvider
                  type="ss"
                  context={{
                    form,
                    name: "D",
                    width: form.watch("D_size"),
                    height: form.watch("D_size"),
                  }}
                >
                  <MatrixInput type="ss" />
                </MatrixInputContextProvider>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start min-h-full ">
              <MatrixLatex
                A={form.watch("A")}
                B={form.watch("B")}
                C={form.watch("C")}
                D={form.watch("D")}
              />
            </div>
          </section>
          {/* <PlotsSection 
                    A={form.getValues('A')}
                    B={form.getValues('B')}
                    C={form.getValues('C')}
                    D={form.getValues('D')}
                /> */}
          <FormContextProvider context={{ type: "ss", state }}>
            <PlotsSection />
            <ConversionsSection />
          </FormContextProvider>
        </form>
      </Form>
    </>
  );
}

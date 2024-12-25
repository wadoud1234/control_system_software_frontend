import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Input } from "../../ui/input";
import { transfer_function_schema, TransferFunctionSchema } from "./schema";
import MatrixInputContextProvider from "../state_space/matrix.context";
import MatrixInput from "../state_space/matrix_input";
import TransferFunctionLatex from "../state_space/transfer_function_latex";
import { PlotsSection } from "../state_space/plots_section";
import FormContextProvider from "@/components/contexts/plots_context";
import ConversionsSection from "@/components/conversions/conversions_section";

function useTransferFunctionForm() {
  const form = useForm<TransferFunctionSchema>({
    resolver: zodResolver(transfer_function_schema),
    defaultValues: {
      num_size: 1,
      den_size: 2,
      num: [1],
      den: [1, 1],
    },
  });

  const [pending, startTransition] = useTransition();

  function onSubmit(_: TransferFunctionSchema) {
    startTransition(() => {});
  }

  return {
    form,
    onSubmit,
    pending,
  } as const;
}

export default function TransferFunctionForm() {
  const { form, onSubmit } = useTransferFunctionForm();
  const state = { num: form.getValues("num"), den: form.getValues("den") };

  return (
    <Form {...form}>
      <div className="flex flex-col">
        <p>Enter numerator and denumerator coefficients</p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2"
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="num_size"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-20">Num size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="border-zinc-400 w-16 h-16"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="den_size"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-20">Den size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="border-zinc-400 w-16 h-16"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <MatrixInputContextProvider
            type="tf"
            context={{
              form,
              name: "num",
              width: form.watch("num_size"),
              height: 1,
            }}
          >
            <MatrixInput type="tf" className="flex-row items-center gap-10" />
          </MatrixInputContextProvider>
          <MatrixInputContextProvider
            type="tf"
            context={{
              form,
              name: "den",
              width: form.watch("den_size"),
              height: 1,
            }}
          >
            <MatrixInput type="tf" className="flex-row items-center gap-10" />
          </MatrixInputContextProvider>
          <TransferFunctionLatex
            num={form.watch("num")}
            den={form.watch("den")}
          />
        </form>

        <FormContextProvider
          context={{
            type: "tf",
            state,
          }}
        >
          <PlotsSection />
          <ConversionsSection />
        </FormContextProvider>
      </div>
    </Form>
  );
}

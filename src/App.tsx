import StateSpaceForm from "./components/forms/state_space/state_space.form";
import TransferFunctionForm from "./components/forms/transfer_function/transfert_function.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export default function App() {
  return (
    <div className="max-w-6xl py-8 flex flex-col items-center gap-2 h-full min-h-screen w-screen mx-auto">
      <h1 className="font-extrabold text-3xl">Control Systems Software</h1>
      <p className="text-muted-foreground">
        Fill the inputs below , and choose what do you need to plot
      </p>
      <Tabs defaultValue="tf" className="w-[800px]">
        <TabsList className="w-full">
          <TabsTrigger value="tf" className="flex-1">
            Transfer Function
          </TabsTrigger>
          <TabsTrigger value="ss" className="flex-1">
            State Space
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tf">
          <TransferFunctionForm />
        </TabsContent>
        <TabsContent value="ss">
          <StateSpaceForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

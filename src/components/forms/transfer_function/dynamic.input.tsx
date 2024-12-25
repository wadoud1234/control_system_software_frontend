
// import { FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { PlusIcon, Trash2 } from "lucide-react"

// export default function DynamicInput(){
//     const {fields,handleAppend,handleRemove} = useDynamicInput(name,form)
//     function handleWheel(event:React.WheelEvent<HTMLInputElement>) {
//        (event.target as HTMLInputElement).blur();
//     }
//     function handleKeyDown (event:React.KeyboardEvent<HTMLInputElement>)  {
//         if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
//           event.preventDefault();
//         }
//     }
//     return (
//         <div className="flex items-center gap-4 flex-1">
//             <p className="text-xl w-20">{name} =</p>
//             <div className="flex items-center gap-1">
//                 {fields.map(({id},index)=>{
//                     return (    
//                         <FormField 
//                             key={id} 
//                             name={`${name}.${index}.value`} 
//                             control={form.control} 
//                             render={({field})=>(
//                                 <FormItem>
//                                     <FormControl>
//                                         <Input type="number" onKeyDown={handleKeyDown} onWheel={handleWheel} {...field} className="no-spinner w-10 bg-yellow-500"/>
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />    
//                     )
//                 })}
//             </div>
//             <div className="flex gap-2 ml-auto">
//                 <Button  size="icon" variant="default" onClick={handleAppend}>
//                     <PlusIcon /> 
//                 </Button>
//                 <Button variant="destructive" size="icon" onClick={handleRemove}>
//                     <Trash2 /> 
//                 </Button>
//             </div>
//         </div>
//     )
// }
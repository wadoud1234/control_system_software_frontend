import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMatrixContext } from "./matrix.context"
import { StateSpaceFormSchema } from "./schema"
import { UseFormReturn } from "react-hook-form"
import { TransferFunctionSchema } from "../transfer_function/schema"
import { ClassValue } from "clsx"
import { cn } from "@/lib/utils"

type Type="ss"|"tf"

function Field({width,height}:{width:number,height:number}){
    const { form ,name} = useMatrixContext("ss") as {form:UseFormReturn<StateSpaceFormSchema>,name:"A"|"B"|"C"|"D"}
    return (
        <FormField name={`${name}.${height}.${width}`} control={form.control} render={({field})=>(
            <FormItem>
                <FormControl>
                    <Input className="w-16 h-16 no-spinner text-center p-1.5 border-zinc-400" type="number" defaultValue={0}  {...field}/>
                </FormControl>
            </FormItem>
        )}/>
    )
}

function TF_Field({width}:{width:number}){
    const { form , name } = useMatrixContext("tf") as {form:UseFormReturn<TransferFunctionSchema>,name:"den"|"num"}
    return (
        <FormField name={`${name}.${width}`} control={form.control} render={({field})=>(
            <FormItem>
                <FormControl>
                    <Input className="w-16 h-16 no-spinner text-center p-1.5 border-zinc-400" type="number" defaultValue={0}  {...field} onChange={(e)=>field.onChange(Number(e.target.value))}/>
                </FormControl>
            </FormItem>
        )}/>
)}

function MatrixRow({currentHeight,type}:{currentHeight:number,type:Type}){
    const { width }= useMatrixContext(type)
    return (
        <div className="flex items-center gap-1">
            {Array.from({length:width}).map((_,index)=>{
                if(type==="ss") return <Field width={index} height={currentHeight} key={index} />
                return <TF_Field width={index} key={index}/> 
            })}
        </div>
    )
}

export default function MatrixInput({type,className}:{type:Type,className?:ClassValue}){
    const { height,name } = useMatrixContext(type)
    return (
        <div className={cn("flex flex-col gap-1",className)}>
            <p className="text-start font-semibold w-10">{name}</p>
            {
                Array.from({length:height}).map((_,index)=>{
                    return (<MatrixRow currentHeight={index} key={index} type={type}/>)
                })
            }
        </div>
    )
}
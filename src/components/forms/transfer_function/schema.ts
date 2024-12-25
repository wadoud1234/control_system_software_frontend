import { z } from "zod"

export const transfer_function_schema = z.object({
    den_size:z.number().int().max(5),
    num_size:z.number().int().max(5),
    num:z.array(z.number()),
    den:z.array(z.number()),
}) 

export type TransferFunctionSchema = z.infer<typeof transfer_function_schema>

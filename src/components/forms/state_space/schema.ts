import { z } from "zod";

export const state_space_schema = z.object({
    A_size:z.number().int().max(5),
    D_size:z.number().int().max(5),
    A:z.array(z.array(z.number())),
    B:z.array(z.array(z.number())),
    C:z.array(z.array(z.number())),
    D:z.array(z.array(z.number())),
}) 

const plots_schema = z.object({
    step:z.boolean().default(true).optional(),
    impulse:z.boolean().default(true).optional(),
    ramp:z.boolean().default(true).optional(),
    bode:z.boolean().default(false).optional(),
    nyquist:z.boolean().default(false).optional(),
    black:z.boolean().default(false).optional()
})

const state_space_form_schema = z.union([state_space_schema,plots_schema])
export type StateSpaceFormSchema = z.infer<typeof state_space_form_schema>

export type StateSpaceSchema = z.infer<typeof state_space_schema>
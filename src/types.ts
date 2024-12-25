export type Vector = number[]
export type Matrix = Vector[];
export interface TF {num:Vector,den:Vector}
export interface SS {A:Matrix,B:Matrix,C:Matrix,D:Matrix}
export type PlotsName = "STEP"|"IMPULSE"|"RAMP"|"BODE"|"NYQUIST"
export type Axis = [number,number]
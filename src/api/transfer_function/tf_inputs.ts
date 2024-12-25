import { Axis, TF } from "@/types";

export interface TF_Plot_Input extends TF {
  t_max: number;
  x_axis?: Axis;
  y_axis?: Axis;
}
export interface TF_Input extends TF {}

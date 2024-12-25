import { Axis, SS } from "@/types";

export interface SS_Plot_Input extends SS {
  t_max: number;
  x_axis?: Axis;
  y_axis?: Axis;
}
export interface SS_Input extends SS {}

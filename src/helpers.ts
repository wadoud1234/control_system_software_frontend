import { SS, TF } from "./types";

type Data = { type: "ss"; data: SS } | { type: "tf"; data: TF };

export function isSSData(data: Data): data is { type: "ss"; data: SS } {
  return data.type === "ss";
}

export function isTFData(data: Data): data is { type: "tf"; data: TF } {
  return data.type === "tf";
}

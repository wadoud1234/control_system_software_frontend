import BaseApi from "../base_api";
import { TF_Input, TF_Plot_Input } from "./tf_inputs";

export default class TransferFunctionApi extends BaseApi {
  private static instance: TransferFunctionApi;

  constructor() {
    super("tf");
  }

  public static getInstance(): TransferFunctionApi {
    if (!TransferFunctionApi.instance) {
      TransferFunctionApi.instance = new TransferFunctionApi();
    }
    return TransferFunctionApi.instance;
  }

  async step(data: TF_Plot_Input) {
    return this.post({ endpoint: "/step", body: JSON.stringify(data) });
  }

  async step_performance(data: TF_Input) {
    return this.post({
      endpoint: "/step/performance",
      body: JSON.stringify(data),
    });
  }

  async impulse(data: TF_Plot_Input) {
    return this.post({ endpoint: "/impulse", body: JSON.stringify(data) });
  }

  async ramp(data: TF_Plot_Input) {
    return this.post({ endpoint: "/ramp", body: JSON.stringify(data) });
  }

  async bode(data: TF_Plot_Input) {
    return this.post({ endpoint: "/bode", body: JSON.stringify(data) });
  }

  async bode_performance(data: TF_Input) {
    return this.post({
      endpoint: "/bode/performance",
      body: JSON.stringify(data),
    });
  }

  async nyquist(data: TF_Plot_Input) {
    return this.post({ endpoint: "/nyquist", body: JSON.stringify(data) });
  }

  async poles_zeros_map(data: TF_Input) {
    return this.post({
      endpoint: "/poles_zeros_map",
      body: JSON.stringify(data),
    });
  }

  async conversion_to_ss(data: TF_Input) {
    return this.post({
      endpoint: "/tf_to_ss",
      body: JSON.stringify(data),
    });
  }

  async close_loop(data: TF_Input) {
      return this.post({
        endpoint: "/close_loop",
        body: JSON.stringify(data),
      });
    }
}

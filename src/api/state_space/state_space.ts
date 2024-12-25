import BaseApi from "../base_api";
import { TF_Input } from "../transfer_function/tf_inputs";
import { SS_Plot_Input, SS_Input } from "./ss_inputs";

export default class StateSpaceApi extends BaseApi {
  private static instance: StateSpaceApi;

  constructor() {
    super("ss");
  }

  public static getInstance(): StateSpaceApi {
    if (!StateSpaceApi.instance) {
      StateSpaceApi.instance = new StateSpaceApi();
    }
    return StateSpaceApi.instance;
  }

  async step(data: SS_Plot_Input) {
    return this.post({ endpoint: "/step", body: JSON.stringify(data) });
  }

  async step_performance(data: SS_Input) {
    return this.post({
      endpoint: "/step/performance",
      body: JSON.stringify(data),
    });
  }

  async impulse(data: SS_Plot_Input) {
    return this.post({ endpoint: "/impulse", body: JSON.stringify(data) });
  }

  async ramp(data: SS_Plot_Input) {
    return this.post({ endpoint: "/ramp", body: JSON.stringify(data) });
  }

  async bode(data: SS_Plot_Input) {
    return this.post({ endpoint: "/bode", body: JSON.stringify(data) });
  }

  async bode_performance(data: SS_Input) {
    return this.post({
      endpoint: "/bode/performance",
      body: JSON.stringify(data),
    });
  }

  async nyquist(data: SS_Plot_Input) {
    return this.post({ endpoint: "/nyquist", body: JSON.stringify(data) });
  }

  async poles_zeros_map(data: SS_Input) {
    return this.post({
      endpoint: "/poles_zeros_map",
      body: JSON.stringify(data),
    });
  }

  async conversion_to_tf(data: SS_Input) {
    return this.post({
      endpoint: "/ss_to_tf",
      body: JSON.stringify(data),
    });
  }

  async close_loop(data: SS_Input) {
    return this.post({
      endpoint: "/close_loop",
      body: JSON.stringify(data),
    });
  }
}

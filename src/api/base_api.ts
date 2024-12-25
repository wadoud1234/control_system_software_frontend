type Api_Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
interface RequestArgs {
  method: Api_Method;
  endpoint: string;
  headers?: HeadersInit;
  body?: BodyInit;
}
interface GetArgs {
  endpoint: string;
  headers?: HeadersInit;
}
interface CommandArgs extends GetArgs {
  body: BodyInit;
}

export default class BaseApi {
  protected url: string;

  constructor(url: string) {
    this.url = `${import.meta.env.VITE_API_URL}/${url}`;
  }

  private request({ method, endpoint, headers, body }: RequestArgs) {
    return fetch(`${this.url}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body,
    });
  }

  protected async get({ endpoint, headers }: GetArgs) {
    return this.request({ method: "GET", endpoint, headers });
  }
  protected async post({ endpoint, headers, body }: CommandArgs) {
    return this.request({ method: "POST", endpoint, headers, body });
  }
  protected async patch({ endpoint, headers, body }: CommandArgs) {
    return this.request({ method: "PATCH", endpoint, headers, body });
  }
  protected async put({ endpoint, headers, body }: CommandArgs) {
    return this.request({ method: "PUT", endpoint, headers, body });
  }
  protected async delete({ endpoint, headers, body }: CommandArgs) {
    return this.request({ method: "DELETE", endpoint, headers, body });
  }
}

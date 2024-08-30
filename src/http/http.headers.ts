export class BasicAuthHeader {
  private headers: any;
  constructor(username: string, password: string, headers: any) {
    this.headers = headers;
    const auth =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
    this.headers.Authorization = auth;
  }
  get _headers(): any {
    return this.headers;
  }
}

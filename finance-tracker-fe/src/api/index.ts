import { API_BASE_URL } from './config';

export type HttpApiRequestInitT = Omit<RequestInit, 'body'> & {
  body?: unknown;
};
export type HttpApiResponseT<ResponseBodyT> = Omit<Response, 'json'> & {
  json: () => Promise<ResponseBodyT>;
};

export type RequestInfoT = {
  path: string;
  url: string;
  init?: HttpApiRequestInitT;
};

function HttpAPi(baseRoute: string) {
  let authToken: string | undefined = undefined;
  let authType: 'Basic' | 'Bearer' | undefined = undefined;

  const requestCallbacks: ((requestInfo: RequestInfoT) => void)[] = [];
  const responseCallbacks: ((
    response: Response,
    requestInfo: RequestInfoT
  ) => void)[] = [];

  return {
    setAuthToken,
    setBearerToken,
    makeRequest,
    makeAuthenticatedRequest,
    onRequest,
    onResponse,
  };

  function onRequest(callback: (requestInfo: RequestInfoT) => void) {
    requestCallbacks.push(callback);
  }

  function onResponse(
    callback: (response: Response, requestInfo: RequestInfoT) => void
  ) {
    responseCallbacks.push(callback);
  }

  function setBearerToken(token: string) {
    authToken = token;
    authType = 'Bearer';
  }

  function setAuthToken(token: string | undefined, type: 'Basic' | 'Bearer') {
    authToken = token;
    authType = type;
  }

  async function makeRequest<ResponseBodyT>(
    path: string,
    init?: HttpApiRequestInitT
  ): Promise<HttpApiResponseT<ResponseBodyT>> {
    const url = createUrl(baseRoute, path);
    const [body, contentType] = (() => {
      const body = init?.body as unknown;
      if (!body) return [undefined, undefined];
      if (typeof body === 'object')
        return [JSON.stringify(body), 'application/json'];
      if (body instanceof FormData) return [body, 'multipart/form-data'];
      return [undefined, undefined];
    })();
    const patchedInit = {
      ...(init || {}),
      body,
      headers: contentType
        ? cloneAndAddToHeaders(init?.headers || {}, 'Content-Type', contentType)
        : init?.headers,
    };
    const requestInfo: RequestInfoT = { path, url, init: patchedInit };
    requestCallbacks.forEach(cb => cb(requestInfo));
    const response: HttpApiResponseT<ResponseBodyT> = await fetch(
      url,
      patchedInit
    );

    responseCallbacks.forEach(cb => cb(response, requestInfo));
    if (!response.ok) {
      throw new HttpApiResponseError(response);
    }
    return response;
  }

  function makeAuthenticatedRequest<ResponseBodyT>(
    path: string,
    init?: HttpApiRequestInitT
  ) {
    const headers = authToken
      ? cloneAndAddToHeaders(
          init?.headers || {},
          'Authorization',
          `${authType} ${authToken}`
        )
      : init?.headers;
    const patchedInit: HttpApiRequestInitT = init
      ? { ...init, headers }
      : { headers };
    return makeRequest<ResponseBodyT>(path, patchedInit);
  }
}

function cloneAndAddToHeaders(
  headers: HttpApiRequestInitT['headers'],
  name: string,
  value: string
) {
  if (!headers) return { [name]: value };
  const headerTuple: [string, string] = [name, value];
  if (headers instanceof Headers) {
    return [...Array.from(headers.entries()), headerTuple];
  }
  if (Array.isArray(headers)) {
    return [...headers, headerTuple];
  }
  return {
    ...headers,
    [name]: value,
  };
}

function createUrl(base: string, path: string) {
  return base + path;
}

export class HttpApiResponseError extends Error {
  protected fetchResponse: Response;

  constructor(fetchResponse: Response) {
    super();
    this.fetchResponse = fetchResponse;
  }

  async describeError() {
    const jsonError = (await this.json()) || {};
    return JSON.stringify({
      statusText: this.statusText,
      status: this.status,
      body: jsonError,
    });
  }

  async json() {
    try {
      return await this.fetchResponse.json();
    } catch (e) {
      return null;
    }
  }

  get status() {
    return this.fetchResponse.status;
  }

  get statusText() {
    return this.fetchResponse.statusText;
  }

  get isNotFound() {
    return this.fetchResponse.status === 404;
  }

  get isUnauthorized() {
    return this.fetchResponse.status === 401;
  }

  get isForbidden() {
    return this.fetchResponse.status === 403;
  }

  get isBadRequest() {
    return this.fetchResponse.status === 400;
  }

  get isRequestTimeout() {
    return this.fetchResponse.status === 408;
  }

  get isUnprocessableEntity() {
    return this.fetchResponse.status === 422;
  }

  get isTooManyRequests() {
    return this.fetchResponse.status === 429;
  }
}

export const httpApiInstance = HttpAPi(API_BASE_URL);

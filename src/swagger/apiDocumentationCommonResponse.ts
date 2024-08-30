import { HttpStatus } from "@nestjs/common";

function commonResponse(exampleParams) {
  const { codeDesc, exampleData: params } = exampleParams;
  const { httpCode } = params;
  let example: {
    code: string | number;
    message?: string;
    description?: string;
    error?: any;
    data?: any;
    metaData?: any;
  };

  example = {
    code:
      httpCode < 300
        ? httpCode
        : `${httpCode}.${params.apiCode}.${params.errorCode}`
  };
  example.message = params.message ? params.message : codeDesc;
  if (params.description) {
    example.description = params.description;
  }
  if (params.error) {
    example.error = params.error;
  }
  if (params.data) {
    example.data = params.data;
  }
  if (params.metaData) {
    example.metaData = params.metaData;
  }

  const schema = { example };
  return { description: codeDesc, schema };
}

/**
 * @param params - Object:
 * @apiCode API ID on ApiGee
 * @httpCode http status code
 * @errorCode Internal error code
 * @message response message - example
 * @description response description - example
 * @data response data - example
 *
 * @returns schema Object
 */
export function commonBadRequest(params) {
  let exampleData = { ...params, httpCode: HttpStatus.BAD_REQUEST };
  exampleData.errorCode = params.errorCode ? params.errorCode : "010";
  const codeDesc = "Bad request";

  return commonResponse({ codeDesc, exampleData });
}

/**
 * @param params - Object:
 * @apiCode API ID on ApiGee
 * @httpCode http status code
 * @errorCode Internal error code
 * @message response message - example
 * @description response description - example
 * @data response data - example
 *
 * @returns schema Object
 */
export function commonForbidden(params) {
  let exampleData = { ...params, httpCode: HttpStatus.FORBIDDEN };
  exampleData.errorCode = params.errorCode ? params.errorCode : "003";
  const codeDesc = "Forbidden";

  return commonResponse({ codeDesc, exampleData });
}

/**
 * @param params - Object:
 * @apiCode API ID on ApiGee
 * @httpCode http status code
 * @errorCode Internal error code
 * @message response message - example
 * @description response description - example
 * @data response data - example
 *
 * @returns schema Object
 */
export function commonInternalServerError(params) {
  let exampleData = { ...params, httpCode: HttpStatus.INTERNAL_SERVER_ERROR };
  exampleData.errorCode = params.errorCode ? params.errorCode : "000";
  const codeDesc = "Internal Server Error";

  return commonResponse({ codeDesc, exampleData });
}

/**
 * @param params - Object:
 * @apiCode API ID on ApiGee
 * @httpCode http status code
 * @errorCode Internal error code
 * @message response message - example
 * @description response description - example
 * @data response data - example
 *
 * @returns schema Object
 */
export function commonNotFound(params) {
  let exampleData = { ...params, httpCode: HttpStatus.NOT_FOUND };
  exampleData.errorCode = params.errorCode ? params.errorCode : "004";
  const codeDesc = "Not Found";

  return commonResponse({ codeDesc, exampleData });
}

/**
 * @param params - Object:
 * @apiCode API ID on ApiGee
 * @httpCode http status code
 * @errorCode Internal error code
 * @message response message - example
 * @description response description - example
 * @data response data - example
 *
 * @returns schema Object
 */
export function commonNotAuthorized(params) {
  let exampleData = { ...params, httpCode: HttpStatus.UNAUTHORIZED };
  exampleData.errorCode = params.errorCode ? params.errorCode : "001";
  const codeDesc = "Not Authorized";

  return commonResponse({ codeDesc, exampleData });
}

/**
 *
 * @description Response description
 * @message response message
 * @data responseBody - `not required`
 *
 * @returns
 */
export function commonOK(params) {
  const { description } = params;

  if (params.message || params.data || params.metaData) {
    let exampleData: any;
    exampleData = { httpCode: HttpStatus.OK };
    exampleData.message = params.message ? params.message : "OK";
    exampleData.data = params.data ? params.data : null;
    exampleData.metaData = params.metaData ? params.metaData : null;
    return commonResponse({ codeDesc: description, exampleData });
  } else {
    return { description };
  }
}

/**
 *
 * @description Response description
 * @message response message
 * @data responseBody - `not required`
 *
 * @returns
 */
export function commonCreated(params) {
  const { description } = params;

  if (params.message || params.data) {
    let exampleData: any;
    exampleData = { httpCode: HttpStatus.CREATED };
    exampleData.message = params.message ? params.message : "Created";
    exampleData.data = params.data ? params.data : null;

    return commonResponse({ codeDesc: description, exampleData });
  } else {
    return { description };
  }
}

/**
 *
 * @description Response description
 * @message response message
 * @data responseBody - `not required`
 *
 * @returns
 */
export function commonAccepted(params) {
  const { description } = params;

  if (params.message || params.data) {
    let exampleData: any;
    exampleData = { httpCode: HttpStatus.ACCEPTED };
    exampleData.message = params.message ? params.message : "OK";
    exampleData.data = params.data ? params.data : null;

    return commonResponse({ codeDesc: description, exampleData });
  } else {
    return { description };
  }
}

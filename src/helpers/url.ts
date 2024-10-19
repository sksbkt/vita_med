export function generateQueryParams(obj: { [key: string]: any }): string {
  const paramsArray = Object.keys(obj).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
  );
  return "?" + paramsArray.join("&");
}

export function parseQueryParams(queryString: string): { [key: string]: any } {
  const params = {} as { [key: string]: any };
  if (queryString.startsWith("?")) {
    // ? we remove the leading "?""
    queryString = queryString.substring(1);
  }

  const pairs = queryString.split("&");
  for (let pair of pairs) {
    const [key, value] = pair.split("=").map((s) => decodeURIComponent(s));
    params[key] = value;
  }

  return params;
}

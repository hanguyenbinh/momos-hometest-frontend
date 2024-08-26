import { FetchJsonData } from "./types/fetch-json-data";

async function wrapperFetchJsonData<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonResponse: any
): Promise<FetchJsonData<T>> {
  const status = jsonResponse.data.status as FetchJsonData<T>["status"];
  console.log("wrapperFetchJsonData", jsonResponse.data);
  return {
    status,
    data: status ? jsonResponse.data.data : {},
    message: jsonResponse.data.message,
  };
}

export default wrapperFetchJsonData;

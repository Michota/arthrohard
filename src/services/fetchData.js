import { settings } from "./fetchSettings";

export let savedData = [];

export async function fetchData() {
  const { pageNumber, pageSize, api: api_link } = settings;
  const parameters = `pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const response = await fetch(`${api_link}?${parameters}`).then((res) =>
    res.json()
  );
  savedData.push(...response.data);
  settings.pageNumber++;
  return response;
}

const api_link = "https://brandstestowy.smallhost.pl/api/random";
let pageNumber = 1;
const pageSize = 8;

export async function fetchData() {
  const parameters = `pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const response = await fetch(`${api_link}?${parameters}`).then((res) =>
    res.json()
  );
  pageNumber++;
  return response;
}

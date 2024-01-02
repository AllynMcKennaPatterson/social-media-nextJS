async function handler(req, res) {
  console.log("Posting data to database");
  const response = await fetch("http://localhost:8081/getUsers", {
    // const response = await fetch("http://cicd-main:8081/getUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.json(data);
}

export default handler;

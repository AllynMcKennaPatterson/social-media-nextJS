
async function handler(req, res) {
  console.log("Posting data to database");
  const response = await fetch("http://localhost:8081/post", {
  // const response = await fetch("http://cicd-main:8081/post", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(JSON.stringify(data))
  res.json(data);
}

export default handler;

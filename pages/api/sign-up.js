async function handler(req, res) {
  console.log("Posting data to database");
  const response = await fetch("http://localhost:8081/signup", {
  // const response = await fetch("http://cicd-main:8081/signup", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.json(data);
}

export default handler;

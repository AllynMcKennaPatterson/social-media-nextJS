async function handler(req, res) {
  console.log("Posting data to database");
  const response = await fetch("http://localhost:8081/addPost", {
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

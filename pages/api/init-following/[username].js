async function handler(req, res) {
  const {username} = req.query
  console.log("Initializing user's following list");
  const response = await fetch(`http://localhost:8081/initFollow/${username}`, {
  // const response = await fetch(`http://cicd-main:8081/initFollow/${username}`, {
    method: "POST",
  });
  const data = await response.json()
  console.log(data)
  res.json(data)
}

export default handler;

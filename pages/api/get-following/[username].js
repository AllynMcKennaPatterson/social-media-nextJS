async function handler(req, res) {
  const {username} = req.query
  console.log("Getting user's following list");
  // const response = await fetch(`http://localhost:8081/getFollowList/${username}`, {
  const response = await fetch(`http://cicd-main:8081/getFollowList/${username}`, {
    method: "GET",
    
  });
  const data = await response.json()
  console.log(data)
  res.json(data)
}

export default handler;

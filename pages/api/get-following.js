async function handler(req, res) {
  const username = req.query
  console.log("Getting user's following list");
  // const response = await fetch("http://cicd-main:8081/main/${username}", {
  const response = await fetch(`http://cicd-main:8081/getFollowList/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.json(data);
}

export default handler;

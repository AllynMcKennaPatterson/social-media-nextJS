import CompareHashandPlain from "@/functions/Bcrypt/CompareHashandPlain";
async function handler(req, res) {
  const { username } = req.query

  const response = await fetch(`http://localhost:8081/getPassword/${username}`, {
    method: "GET"
  });
  const data = await response.json();
  res.json(data);
}

export default handler;

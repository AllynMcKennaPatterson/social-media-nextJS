import { compare } from "bcryptjs"

const CompareHashandPlain = async (plainPassword, hashedPassword) => {
  const match = await compare(plainPassword, hashedPassword)
  return match;
}

export default CompareHashandPlain
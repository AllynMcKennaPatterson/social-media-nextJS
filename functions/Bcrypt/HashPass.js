import { hash } from "bcryptjs"
const HashPass = async (password, saltRounds = 10) => {
  try {
    const hashedpass = await hash(password, saltRounds)
    return hashedpass
  }
  catch(error){
    console.error("Error hashing password",error)
    throw new Error("Could not hash password")
  }
}

export default HashPass

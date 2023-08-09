import bcrypt from "bcrypt";

//hash password
export const hashPassword = async (password:string) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log("password error");
  }
};


//compare password

export const comparePassword = async (password:string,hashedPassword:string)=>{
  return await bcrypt.compare(password,hashedPassword)
}
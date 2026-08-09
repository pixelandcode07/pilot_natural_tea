import { User } from "./user.model";
import { IUser } from "./user.interface";

const createUser = async (payload: Partial<IUser>) => {
  const result = await User.create(payload);
  return result;
};

const findUserByEmail = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

export const UserService = {
  createUser,
  findUserByEmail,
};
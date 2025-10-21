import { Admin } from "../models/admin";
import { AuthRequest, AuthData } from "../types/types";
import bcrypt from "bcryptjs";

const PASSWORD_SIZE_LIMIT = 12

export class AuthService {
  async login(login: AuthRequest): Promise<AuthData | null> {
    const admin = await Admin.findOne({ where: { username: login.username.toLowerCase() } });
    if (!admin) return null;

    if(login.password.length > PASSWORD_SIZE_LIMIT) return null;

    const isValid = await bcrypt.compare(login.password, admin.password);
    if (!isValid) return null;

    // token gerado no controller
    return { token: null, message: "Login successful" };
  }
}

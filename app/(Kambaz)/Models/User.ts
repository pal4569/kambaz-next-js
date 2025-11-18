export default interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

export type CreateUserType = Omit<
  User,
  "_id" | "lastActivity" | "totalActivity" | "dob" | "loginId"
>;
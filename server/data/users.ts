import { hashSync } from "bcrypt-ts";

interface User {
  name: string;
  email: string;
  password: string;
}

const users: User[] = [
  {
    name: "Abed",
    email: "negokamgaing@gmail.com",
    password: hashSync("todo123", 10),
  },
  {
    name: "Armelle",
    email: "armelle@gmail.com",
    password: hashSync("123456", 10),
  },
];

export default users;

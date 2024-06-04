import express, { json } from "express";
import { prisma } from "./lib/prisma";
import { z } from "zod";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/create-user", async (req, res) => {
  const createAdminUser = z.object({
    fullName: z.string(),
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
    password: z.string(),
  });

  const { fullName, email, password } = createAdminUser.parse(req.body);

  try {
    const createdUser = await prisma.adminUsers.create({
      data: {
        fullName,
        email,
        password,
      },
    });

    return res.json(createdUser);
  } catch (error) {
    return res.json(error);
  }
});

app.listen(3333, () => console.log("Server is running on port 3333"));

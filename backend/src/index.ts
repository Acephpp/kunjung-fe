import express, { Application, Request, Response } from "express";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the Kunjung Booking App API!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});

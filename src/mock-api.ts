import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { taskSchema } from "./app/data/schema";

export const getTasks = async () => {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
};

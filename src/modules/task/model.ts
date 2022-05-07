import { Document, Schema, Model, model } from "mongoose";

export interface TaskDocument extends Document {
  name: string;
}

export interface TaskModel extends TaskDocument {}

export const TaskSchema: Schema = new Schema(
  {
    name: String,
  },
  { collection: "tasks" }
);

export const Task: Model<TaskModel> = model<TaskModel>("Task", TaskSchema);

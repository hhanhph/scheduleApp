export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  createSchedule: Schedule;
  createTodo: TodoMvc;
  deleteSchedule: Schedule;
  updateSchedule?: Maybe<Schedule>;
  updateTodo?: Maybe<TodoMvc>;
};

export type MutationCreateScheduleArgs = {
  scheduleDate: Scalars["String"];
  title: Scalars["String"];
};

export type MutationCreateTodoArgs = {
  description: Scalars["String"];
};

export type MutationDeleteScheduleArgs = {
  scheduleId: Scalars["ID"];
};

export type MutationUpdateScheduleArgs = {
  data: UpdateScheduleInput;
  scheduleId: Scalars["ID"];
};

export type MutationUpdateTodoArgs = {
  data: UpdateTodoInput;
  todoId: Scalars["ID"];
};

export type Query = {
  Appointment?: Maybe<Schedule>;
  Todo?: Maybe<TodoMvc>;
  allTodos: Array<TodoMvc>;
  getSchedules: Array<Schedule>;
};

export type QueryAppointmentArgs = {
  scheduleId: Scalars["ID"];
};

export type QueryTodoArgs = {
  todoId: Scalars["ID"];
};

export type QueryGetSchedulesArgs = {
  scheduleDate: Scalars["String"];
};

export type Schedule = {
  scheduleDate: Scalars["String"];
  scheduleId: Scalars["ID"];
  title: Scalars["String"];
};

export type TodoMvc = {
  completed: Scalars["Boolean"];
  description: Scalars["String"];
  todoId: Scalars["ID"];
};

export type UpdateScheduleInput = {
  title: Scalars["String"];
};

export type UpdateTodoInput = {
  completed?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
};

import { ObjectID } from "mongodb";
export type ScheduleDbObject = {
  scheduleDate: string;
  _id: ObjectID;
  title: string;
};

export type TodoMvcDbObject = {
  completed: boolean;
  description: string;
  _id: ObjectID;
};

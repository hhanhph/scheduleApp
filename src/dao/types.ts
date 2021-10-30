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
  updateTodo?: Maybe<TodoMvc>;
};

export type MutationCreateScheduleArgs = {
  endDate: Scalars["Date"];
  startDate: Scalars["Date"];
  title: Scalars["String"];
};

export type MutationCreateTodoArgs = {
  description: Scalars["String"];
};

export type MutationUpdateTodoArgs = {
  data: UpdateTodoInput;
  todoId: Scalars["ID"];
};

export type Query = {
  Todo?: Maybe<TodoMvc>;
  allSchedules: Array<Schedule>;
  allTodos: Array<TodoMvc>;
};

export type QueryTodoArgs = {
  todoId: Scalars["ID"];
};

export type Schedule = {
  endDate?: Maybe<Scalars["Date"]>;
  scheduleId: Scalars["ID"];
  startDate?: Maybe<Scalars["Date"]>;
  title: Scalars["String"];
};

export type TodoMvc = {
  completed: Scalars["Boolean"];
  description: Scalars["String"];
  todoId: Scalars["ID"];
};

export type UpdateTodoInput = {
  completed?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
};

import { ObjectId } from "mongodb";
export type ScheduleDbObject = {
  endDate?: Maybe<any>;
  _id: ObjectId;
  startDate?: Maybe<any>;
  title: string;
};

export type TodoMvcDbObject = {
  completed: boolean;
  description: string;
  _id: ObjectId;
};

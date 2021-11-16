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
  deleteSchedule: Schedule;
  updateSchedule?: Maybe<Schedule>;
};

export type MutationCreateScheduleArgs = {
  imgSource?: Maybe<Scalars["String"]>;
  scheduleDate: Scalars["String"];
  scheduleTime?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Scalars["String"];
};

export type MutationDeleteScheduleArgs = {
  scheduleId: Scalars["ID"];
};

export type MutationUpdateScheduleArgs = {
  data: UpdateScheduleInput;
  scheduleId: Scalars["ID"];
};

export type Query = {
  Appointment?: Maybe<Schedule>;
  getSchedules: Array<Schedule>;
};

export type QueryAppointmentArgs = {
  scheduleId: Scalars["ID"];
};

export type QueryGetSchedulesArgs = {
  scheduleDate: Scalars["String"];
};

export type Schedule = {
  imgSource?: Maybe<Scalars["String"]>;
  scheduleDate: Scalars["String"];
  scheduleId: Scalars["ID"];
  scheduleTime?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Scalars["String"];
};

export type UpdateScheduleInput = {
  scheduleTime?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Scalars["String"];
};

import { ObjectID } from "mongodb";
export type ScheduleDbObject = {
  imgSource?: Maybe<string>;
  scheduleDate: string;
  _id: ObjectID;
  scheduleTime?: Maybe<Array<Maybe<string>>>;
  title: string;
};

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
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
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
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
  scheduleTime?: Maybe<Array<Maybe<Scalars["String"]>>>;
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
  scheduleTime?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Scalars["String"];
};

export type TodoMvc = {
  completed: Scalars["Boolean"];
  description: Scalars["String"];
  todoId: Scalars["ID"];
};

export type UpdateScheduleInput = {
  scheduleTime?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Scalars["String"];
};

export type UpdateTodoInput = {
  completed?: Maybe<Scalars["Boolean"]>;
  description?: Maybe<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Schedule: ResolverTypeWrapper<Schedule>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  TodoMVC: ResolverTypeWrapper<TodoMvc>;
  UpdateScheduleInput: UpdateScheduleInput;
  UpdateTodoInput: UpdateTodoInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Date: Scalars["Date"];
  ID: Scalars["ID"];
  Mutation: {};
  Query: {};
  Schedule: Schedule;
  String: Scalars["String"];
  TodoMVC: TodoMvc;
  UpdateScheduleInput: UpdateScheduleInput;
  UpdateTodoInput: UpdateTodoInput;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createSchedule?: Resolver<
    ResolversTypes["Schedule"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateScheduleArgs, "scheduleDate" | "title">
  >;
  createTodo?: Resolver<
    ResolversTypes["TodoMVC"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTodoArgs, "description">
  >;
  deleteSchedule?: Resolver<
    ResolversTypes["Schedule"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteScheduleArgs, "scheduleId">
  >;
  updateSchedule?: Resolver<
    Maybe<ResolversTypes["Schedule"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateScheduleArgs, "data" | "scheduleId">
  >;
  updateTodo?: Resolver<
    Maybe<ResolversTypes["TodoMVC"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTodoArgs, "data" | "todoId">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  Appointment?: Resolver<
    Maybe<ResolversTypes["Schedule"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAppointmentArgs, "scheduleId">
  >;
  Todo?: Resolver<
    Maybe<ResolversTypes["TodoMVC"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTodoArgs, "todoId">
  >;
  allTodos?: Resolver<
    Array<ResolversTypes["TodoMVC"]>,
    ParentType,
    ContextType
  >;
  getSchedules?: Resolver<
    Array<ResolversTypes["Schedule"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSchedulesArgs, "scheduleDate">
  >;
};

export type ScheduleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Schedule"] = ResolversParentTypes["Schedule"]
> = {
  scheduleDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  scheduleId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  scheduleTime?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoMvcResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TodoMVC"] = ResolversParentTypes["TodoMVC"]
> = {
  completed?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  todoId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  TodoMVC?: TodoMvcResolvers<ContextType>;
};

export type IndexQueryVariables = Exact<{ [key: string]: never }>;

export type IndexQuery = { allTodos: Array<{ todoId: string }> };

export type IndexCreateTodoMutationVariables = Exact<{
  description: Scalars["String"];
}>;

export type IndexCreateTodoMutation = { createTodo: { todoId: string } };

export type GetScheduleQueryVariables = Exact<{
  scheduleDate: Scalars["String"];
}>;

export type GetScheduleQuery = {
  getSchedules: Array<{
    scheduleId: string;
    title: string;
    scheduleDate: string;
  }>;
};

export type IndexCreateScheduleMutationVariables = Exact<{
  title: Scalars["String"];
  scheduleDate: Scalars["String"];
  scheduleTime: Array<Maybe<Scalars["String"]>> | Maybe<Scalars["String"]>;
}>;

export type IndexCreateScheduleMutation = {
  createSchedule: { scheduleId: string };
};

export type AppointmentQueryVariables = Exact<{
  scheduleId: Scalars["ID"];
}>;

export type AppointmentQuery = {
  Appointment?:
    | {
        title: string;
        scheduleDate: string;
        scheduleTime?: Array<string | null | undefined> | null | undefined;
      }
    | null
    | undefined;
};

export type DeleteScheduleMutationVariables = Exact<{
  scheduleId: Scalars["ID"];
}>;

export type DeleteScheduleMutation = {
  deleteSchedule: { title: string; scheduleDate: string };
};

export type UpdateScheduleMutationVariables = Exact<{
  scheduleId: Scalars["ID"];
  data: UpdateScheduleInput;
}>;

export type UpdateScheduleMutation = {
  updateSchedule?:
    | {
        title: string;
        scheduleTime?: Array<string | null | undefined> | null | undefined;
      }
    | null
    | undefined;
};

export type TodoQueryVariables = Exact<{
  todoId: Scalars["ID"];
}>;

export type TodoQuery = {
  Todo?: { description: string; completed: boolean } | null | undefined;
};

export type UpdateTodoMutationVariables = Exact<{
  todoId: Scalars["ID"];
  data: UpdateTodoInput;
}>;

export type UpdateTodoMutation = {
  updateTodo?: { description: string; completed: boolean } | null | undefined;
};

export const IndexDocument = gql`
  query Index {
    allTodos {
      todoId
    }
  }
`;

/**
 * __useIndexQuery__
 *
 * To run a query within a React component, call `useIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    IndexQuery,
    IndexQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<IndexQuery, IndexQueryVariables>(
    IndexDocument,
    options
  );
}
export function useIndexLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    IndexQuery,
    IndexQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<IndexQuery, IndexQueryVariables>(
    IndexDocument,
    options
  );
}
export type IndexQueryHookResult = ReturnType<typeof useIndexQuery>;
export type IndexLazyQueryHookResult = ReturnType<typeof useIndexLazyQuery>;
export type IndexQueryResult = ApolloReactCommon.QueryResult<
  IndexQuery,
  IndexQueryVariables
>;
export const IndexCreateTodoDocument = gql`
  mutation IndexCreateTodo($description: String!) {
    createTodo(description: $description) {
      todoId
    }
  }
`;
export type IndexCreateTodoMutationFn = ApolloReactCommon.MutationFunction<
  IndexCreateTodoMutation,
  IndexCreateTodoMutationVariables
>;

/**
 * __useIndexCreateTodoMutation__
 *
 * To run a mutation, you first call `useIndexCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIndexCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [indexCreateTodoMutation, { data, loading, error }] = useIndexCreateTodoMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useIndexCreateTodoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    IndexCreateTodoMutation,
    IndexCreateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    IndexCreateTodoMutation,
    IndexCreateTodoMutationVariables
  >(IndexCreateTodoDocument, options);
}
export type IndexCreateTodoMutationHookResult = ReturnType<
  typeof useIndexCreateTodoMutation
>;
export type IndexCreateTodoMutationResult =
  ApolloReactCommon.MutationResult<IndexCreateTodoMutation>;
export type IndexCreateTodoMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    IndexCreateTodoMutation,
    IndexCreateTodoMutationVariables
  >;
export const GetScheduleDocument = gql`
  query GetSchedule($scheduleDate: String!) {
    getSchedules(scheduleDate: $scheduleDate) {
      scheduleId
      title
      scheduleDate
    }
  }
`;

/**
 * __useGetScheduleQuery__
 *
 * To run a query within a React component, call `useGetScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduleQuery({
 *   variables: {
 *      scheduleDate: // value for 'scheduleDate'
 *   },
 * });
 */
export function useGetScheduleQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetScheduleQuery,
    GetScheduleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetScheduleQuery, GetScheduleQueryVariables>(
    GetScheduleDocument,
    options
  );
}
export function useGetScheduleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetScheduleQuery,
    GetScheduleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetScheduleQuery,
    GetScheduleQueryVariables
  >(GetScheduleDocument, options);
}
export type GetScheduleQueryHookResult = ReturnType<typeof useGetScheduleQuery>;
export type GetScheduleLazyQueryHookResult = ReturnType<
  typeof useGetScheduleLazyQuery
>;
export type GetScheduleQueryResult = ApolloReactCommon.QueryResult<
  GetScheduleQuery,
  GetScheduleQueryVariables
>;
export const IndexCreateScheduleDocument = gql`
  mutation IndexCreateSchedule(
    $title: String!
    $scheduleDate: String!
    $scheduleTime: [String]!
  ) {
    createSchedule(
      title: $title
      scheduleDate: $scheduleDate
      scheduleTime: $scheduleTime
    ) {
      scheduleId
    }
  }
`;
export type IndexCreateScheduleMutationFn = ApolloReactCommon.MutationFunction<
  IndexCreateScheduleMutation,
  IndexCreateScheduleMutationVariables
>;

/**
 * __useIndexCreateScheduleMutation__
 *
 * To run a mutation, you first call `useIndexCreateScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIndexCreateScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [indexCreateScheduleMutation, { data, loading, error }] = useIndexCreateScheduleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      scheduleDate: // value for 'scheduleDate'
 *      scheduleTime: // value for 'scheduleTime'
 *   },
 * });
 */
export function useIndexCreateScheduleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    IndexCreateScheduleMutation,
    IndexCreateScheduleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    IndexCreateScheduleMutation,
    IndexCreateScheduleMutationVariables
  >(IndexCreateScheduleDocument, options);
}
export type IndexCreateScheduleMutationHookResult = ReturnType<
  typeof useIndexCreateScheduleMutation
>;
export type IndexCreateScheduleMutationResult =
  ApolloReactCommon.MutationResult<IndexCreateScheduleMutation>;
export type IndexCreateScheduleMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    IndexCreateScheduleMutation,
    IndexCreateScheduleMutationVariables
  >;
export const AppointmentDocument = gql`
  query Appointment($scheduleId: ID!) {
    Appointment(scheduleId: $scheduleId) {
      title
      scheduleDate
      scheduleTime
    }
  }
`;

/**
 * __useAppointmentQuery__
 *
 * To run a query within a React component, call `useAppointmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppointmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppointmentQuery({
 *   variables: {
 *      scheduleId: // value for 'scheduleId'
 *   },
 * });
 */
export function useAppointmentQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    AppointmentQuery,
    AppointmentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<AppointmentQuery, AppointmentQueryVariables>(
    AppointmentDocument,
    options
  );
}
export function useAppointmentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AppointmentQuery,
    AppointmentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    AppointmentQuery,
    AppointmentQueryVariables
  >(AppointmentDocument, options);
}
export type AppointmentQueryHookResult = ReturnType<typeof useAppointmentQuery>;
export type AppointmentLazyQueryHookResult = ReturnType<
  typeof useAppointmentLazyQuery
>;
export type AppointmentQueryResult = ApolloReactCommon.QueryResult<
  AppointmentQuery,
  AppointmentQueryVariables
>;
export const DeleteScheduleDocument = gql`
  mutation DeleteSchedule($scheduleId: ID!) {
    deleteSchedule(scheduleId: $scheduleId) {
      title
      scheduleDate
    }
  }
`;
export type DeleteScheduleMutationFn = ApolloReactCommon.MutationFunction<
  DeleteScheduleMutation,
  DeleteScheduleMutationVariables
>;

/**
 * __useDeleteScheduleMutation__
 *
 * To run a mutation, you first call `useDeleteScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScheduleMutation, { data, loading, error }] = useDeleteScheduleMutation({
 *   variables: {
 *      scheduleId: // value for 'scheduleId'
 *   },
 * });
 */
export function useDeleteScheduleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteScheduleMutation,
    DeleteScheduleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteScheduleMutation,
    DeleteScheduleMutationVariables
  >(DeleteScheduleDocument, options);
}
export type DeleteScheduleMutationHookResult = ReturnType<
  typeof useDeleteScheduleMutation
>;
export type DeleteScheduleMutationResult =
  ApolloReactCommon.MutationResult<DeleteScheduleMutation>;
export type DeleteScheduleMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    DeleteScheduleMutation,
    DeleteScheduleMutationVariables
  >;
export const UpdateScheduleDocument = gql`
  mutation UpdateSchedule($scheduleId: ID!, $data: UpdateScheduleInput!) {
    updateSchedule(scheduleId: $scheduleId, data: $data) {
      title
      scheduleTime
    }
  }
`;
export type UpdateScheduleMutationFn = ApolloReactCommon.MutationFunction<
  UpdateScheduleMutation,
  UpdateScheduleMutationVariables
>;

/**
 * __useUpdateScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScheduleMutation, { data, loading, error }] = useUpdateScheduleMutation({
 *   variables: {
 *      scheduleId: // value for 'scheduleId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateScheduleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateScheduleMutation,
    UpdateScheduleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateScheduleMutation,
    UpdateScheduleMutationVariables
  >(UpdateScheduleDocument, options);
}
export type UpdateScheduleMutationHookResult = ReturnType<
  typeof useUpdateScheduleMutation
>;
export type UpdateScheduleMutationResult =
  ApolloReactCommon.MutationResult<UpdateScheduleMutation>;
export type UpdateScheduleMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    UpdateScheduleMutation,
    UpdateScheduleMutationVariables
  >;
export const TodoDocument = gql`
  query Todo($todoId: ID!) {
    Todo(todoId: $todoId) {
      description
      completed
    }
  }
`;

/**
 * __useTodoQuery__
 *
 * To run a query within a React component, call `useTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoQuery({
 *   variables: {
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useTodoQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<TodoQuery, TodoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<TodoQuery, TodoQueryVariables>(
    TodoDocument,
    options
  );
}
export function useTodoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TodoQuery,
    TodoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<TodoQuery, TodoQueryVariables>(
    TodoDocument,
    options
  );
}
export type TodoQueryHookResult = ReturnType<typeof useTodoQuery>;
export type TodoLazyQueryHookResult = ReturnType<typeof useTodoLazyQuery>;
export type TodoQueryResult = ApolloReactCommon.QueryResult<
  TodoQuery,
  TodoQueryVariables
>;
export const UpdateTodoDocument = gql`
  mutation UpdateTodo($todoId: ID!, $data: UpdateTodoInput!) {
    updateTodo(todoId: $todoId, data: $data) {
      description
      completed
    }
  }
`;
export type UpdateTodoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTodoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >(UpdateTodoDocument, options);
}
export type UpdateTodoMutationHookResult = ReturnType<
  typeof useUpdateTodoMutation
>;
export type UpdateTodoMutationResult =
  ApolloReactCommon.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;

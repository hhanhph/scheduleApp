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
    RequireFields<MutationCreateScheduleArgs, "endDate" | "startDate" | "title">
  >;
  createTodo?: Resolver<
    ResolversTypes["TodoMVC"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTodoArgs, "description">
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
  Todo?: Resolver<
    Maybe<ResolversTypes["TodoMVC"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTodoArgs, "todoId">
  >;
  allSchedules?: Resolver<
    Array<ResolversTypes["Schedule"]>,
    ParentType,
    ContextType
  >;
  allTodos?: Resolver<
    Array<ResolversTypes["TodoMVC"]>,
    ParentType,
    ContextType
  >;
};

export type ScheduleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Schedule"] = ResolversParentTypes["Schedule"]
> = {
  endDate?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
  scheduleId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
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

export type AllSchedulesQueryVariables = Exact<{ [key: string]: never }>;

export type AllSchedulesQuery = { allSchedules: Array<{ scheduleId: string }> };

export type CreateScheduleMutationVariables = Exact<{
  title: Scalars["String"];
  startDate: Scalars["Date"];
  endDate: Scalars["Date"];
}>;

export type CreateScheduleMutation = { createSchedule: { scheduleId: string } };

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
export const AllSchedulesDocument = gql`
  query AllSchedules {
    allSchedules {
      scheduleId
    }
  }
`;

/**
 * __useAllSchedulesQuery__
 *
 * To run a query within a React component, call `useAllSchedulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSchedulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSchedulesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSchedulesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllSchedulesQuery,
    AllSchedulesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    AllSchedulesQuery,
    AllSchedulesQueryVariables
  >(AllSchedulesDocument, options);
}
export function useAllSchedulesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllSchedulesQuery,
    AllSchedulesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    AllSchedulesQuery,
    AllSchedulesQueryVariables
  >(AllSchedulesDocument, options);
}
export type AllSchedulesQueryHookResult = ReturnType<
  typeof useAllSchedulesQuery
>;
export type AllSchedulesLazyQueryHookResult = ReturnType<
  typeof useAllSchedulesLazyQuery
>;
export type AllSchedulesQueryResult = ApolloReactCommon.QueryResult<
  AllSchedulesQuery,
  AllSchedulesQueryVariables
>;
export const CreateScheduleDocument = gql`
  mutation CreateSchedule($title: String!, $startDate: Date!, $endDate: Date!) {
    createSchedule(title: $title, startDate: $startDate, endDate: $endDate) {
      scheduleId
    }
  }
`;
export type CreateScheduleMutationFn = ApolloReactCommon.MutationFunction<
  CreateScheduleMutation,
  CreateScheduleMutationVariables
>;

/**
 * __useCreateScheduleMutation__
 *
 * To run a mutation, you first call `useCreateScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScheduleMutation, { data, loading, error }] = useCreateScheduleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useCreateScheduleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateScheduleMutation,
    CreateScheduleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateScheduleMutation,
    CreateScheduleMutationVariables
  >(CreateScheduleDocument, options);
}
export type CreateScheduleMutationHookResult = ReturnType<
  typeof useCreateScheduleMutation
>;
export type CreateScheduleMutationResult =
  ApolloReactCommon.MutationResult<CreateScheduleMutation>;
export type CreateScheduleMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    CreateScheduleMutation,
    CreateScheduleMutationVariables
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

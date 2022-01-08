import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  deleteSchedule: Schedule;
  updateSchedule?: Maybe<Schedule>;
};

export type MutationCreateScheduleArgs = {
  imgSource?: InputMaybe<Scalars["String"]>;
  location?: InputMaybe<Scalars["String"]>;
  scheduleDate: Scalars["String"];
  scheduleTime?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  location?: Maybe<Scalars["String"]>;
  scheduleDate: Scalars["String"];
  scheduleId: Scalars["ID"];
  scheduleTime?: Maybe<Array<Maybe<Scalars["String"]>>>;
  title: Scalars["String"];
};

export type UpdateScheduleInput = {
  scheduleTime?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  title: Scalars["String"];
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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  UpdateScheduleInput: UpdateScheduleInput;
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
  UpdateScheduleInput: UpdateScheduleInput;
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
  imgSource?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
};

export type GetScheduleQueryVariables = Exact<{
  scheduleDate: Scalars["String"];
}>;

export type GetScheduleQuery = {
  getSchedules: Array<{
    scheduleId: string;
    title: string;
    scheduleDate: string;
    imgSource?: string | null | undefined;
    location?: string | null | undefined;
  }>;
};

export type IndexCreateScheduleMutationVariables = Exact<{
  title: Scalars["String"];
  scheduleDate: Scalars["String"];
  scheduleTime:
    | Array<InputMaybe<Scalars["String"]>>
    | InputMaybe<Scalars["String"]>;
  imgSource?: InputMaybe<Scalars["String"]>;
  location?: InputMaybe<Scalars["String"]>;
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
        imgSource?: string | null | undefined;
        location?: string | null | undefined;
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

export const GetScheduleDocument = gql`
  query GetSchedule($scheduleDate: String!) {
    getSchedules(scheduleDate: $scheduleDate) {
      scheduleId
      title
      scheduleDate
      imgSource
      location
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
    $imgSource: String
    $location: String
  ) {
    createSchedule(
      title: $title
      scheduleDate: $scheduleDate
      scheduleTime: $scheduleTime
      imgSource: $imgSource
      location: $location
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
 *      imgSource: // value for 'imgSource'
 *      location: // value for 'location'
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
      imgSource
      location
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

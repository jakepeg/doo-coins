import type { Principal } from '@dfinity/principal';
export interface Child { 'id' : string, 'name' : string }
export interface ChildCall { 'name' : string }
export type Error = { 'NotFound' : null } |
  { 'BalanceNotEnough' : null } |
  { 'NotAuthorized' : null } |
  { 'AlreadyExists' : null };
export interface Goal { 'id' : bigint, 'value' : bigint, 'name' : string }
export interface GoalCall { 'value' : bigint, 'name' : string }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Array<Transaction> } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<Task> } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Array<Goal> } |
  { 'err' : Error };
export type Result_4 = { 'ok' : Array<Child> } |
  { 'err' : Error };
export type Result_5 = { 'ok' : Child } |
  { 'err' : Error };
export interface Task { 'id' : bigint, 'value' : bigint, 'name' : string }
export interface TaskCall { 'value' : bigint, 'name' : string }
export interface Transaction {
  'id' : bigint,
  'completedDate' : string,
  'transactionType' : string,
  'value' : bigint,
  'name' : string,
}
export interface _SERVICE {
  'addChild' : (arg_0: ChildCall) => Promise<Result_5>,
  'addGoal' : (arg_0: GoalCall, arg_1: string) => Promise<Result_3>,
  'addTask' : (arg_0: TaskCall, arg_1: string) => Promise<Result_2>,
  'approveTask' : (arg_0: string, arg_1: bigint, arg_2: string) => Promise<
      Result
    >,
  'claimGoal' : (arg_0: string, arg_1: bigint, arg_2: string) => Promise<
      Result
    >,
  'currentGoal' : (arg_0: string, arg_1: bigint) => Promise<Result>,
  'getBalance' : (arg_0: string) => Promise<bigint>,
  'getChildren' : () => Promise<Result_4>,
  'getCurrentGoal' : (arg_0: string) => Promise<bigint>,
  'getGoals' : (arg_0: string) => Promise<Result_3>,
  'getTasks' : (arg_0: string) => Promise<Result_2>,
  'getTransactions' : (arg_0: string) => Promise<Result_1>,
  'updateChild' : (arg_0: string, arg_1: Child) => Promise<Result>,
  'updateTask' : (arg_0: string, arg_1: bigint, arg_2: Task) => Promise<Result>,
}

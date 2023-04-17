import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
  'addChild' : ActorMethod<[ChildCall], Result_5>,
  'addGoal' : ActorMethod<[GoalCall, string], Result_3>,
  'addTask' : ActorMethod<[TaskCall, string], Result_2>,
  'approveTask' : ActorMethod<[string, bigint, string], Result>,
  'claimGoal' : ActorMethod<[string, bigint, string], Result>,
  'currentGoal' : ActorMethod<[string, bigint], Result>,
  'getBalance' : ActorMethod<[string], bigint>,
  'getChildren' : ActorMethod<[], Result_4>,
  'getCurrentGoal' : ActorMethod<[string], bigint>,
  'getGoals' : ActorMethod<[string], Result_3>,
  'getTasks' : ActorMethod<[string], Result_2>,
  'getTransactions' : ActorMethod<[string], Result_1>,
  'updateChild' : ActorMethod<[string, Child], Result>,
  'updateTask' : ActorMethod<[string, bigint, Task], Result>,
}

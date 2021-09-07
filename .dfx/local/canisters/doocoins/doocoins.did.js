export const idlFactory = ({ IDL }) => {
  const ChildCall = IDL.Record({ 'name' : IDL.Text });
  const Child = IDL.Record({ 'id' : IDL.Text, 'name' : IDL.Text });
  const Error = IDL.Variant({
    'NotFound' : IDL.Null,
    'BalanceNotEnough' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
  });
  const Result_5 = IDL.Variant({ 'ok' : Child, 'err' : Error });
  const GoalCall = IDL.Record({ 'value' : IDL.Nat, 'name' : IDL.Text });
  const Goal = IDL.Record({
    'id' : IDL.Nat,
    'value' : IDL.Nat,
    'name' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Vec(Goal), 'err' : Error });
  const TaskCall = IDL.Record({ 'value' : IDL.Nat, 'name' : IDL.Text });
  const Task = IDL.Record({
    'id' : IDL.Nat,
    'value' : IDL.Nat,
    'name' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Vec(Task), 'err' : Error });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Vec(Child), 'err' : Error });
  const Transaction = IDL.Record({
    'id' : IDL.Nat,
    'completedDate' : IDL.Text,
    'transactionType' : IDL.Text,
    'value' : IDL.Nat,
    'name' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(Transaction), 'err' : Error });
  return IDL.Service({
    'addChild' : IDL.Func([ChildCall], [Result_5], []),
    'addGoal' : IDL.Func([GoalCall, IDL.Text], [Result_3], []),
    'addTask' : IDL.Func([TaskCall, IDL.Text], [Result_2], []),
    'approveTask' : IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [Result], []),
    'claimGoal' : IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [Result], []),
    'currentGoal' : IDL.Func([IDL.Text, IDL.Nat], [Result], []),
    'getBalance' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'getChildren' : IDL.Func([], [Result_4], []),
    'getCurrentGoal' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'getGoals' : IDL.Func([IDL.Text], [Result_3], []),
    'getTasks' : IDL.Func([IDL.Text], [Result_2], []),
    'getTransactions' : IDL.Func([IDL.Text], [Result_1], []),
    'updateChild' : IDL.Func([IDL.Text, Child], [Result], []),
    'updateTask' : IDL.Func([IDL.Text, IDL.Nat, Task], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };

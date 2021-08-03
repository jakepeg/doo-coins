export default ({ IDL }) => {
  return IDL.Service({
    'get' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    'length' : IDL.Func([], [IDL.Nat], ['query']),
    'removeChild' : IDL.Func([IDL.Text], [], ['oneway']),
    'set' : IDL.Func([IDL.Text, IDL.Text], [IDL.Opt(IDL.Text)], []),
  });
};
export const init = ({ IDL }) => { return []; };
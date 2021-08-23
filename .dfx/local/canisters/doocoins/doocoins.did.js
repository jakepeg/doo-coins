export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addChild' : IDL.Func([IDL.Text, IDL.Text], [IDL.Opt(IDL.Text)], []),
    'getChild' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    'getChildren' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
    'length' : IDL.Func([], [IDL.Nat], ['query']),
    'parent' : IDL.Func([], [IDL.Principal], []),
    'removeChild' : IDL.Func([IDL.Text], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };

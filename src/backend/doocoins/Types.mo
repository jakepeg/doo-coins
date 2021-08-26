module {
  public type Child = {
    name: Text;
    child_id: Text;
    wallet_balance: Nat;
  };

  public type Parent = {
    name: Text;
    parent_id: Principal;
    children : [Child];
  };
}


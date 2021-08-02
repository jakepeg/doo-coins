module {
  public type Child = {
    name: Text;
    child_id: Text;
  };

  public type Parent = {
    name: Text;
    parent_id: Principal;
  };
}
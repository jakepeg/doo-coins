import HM "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Types "./Types";

actor {

  type Child = Types.Child;
  type Parent = Types.Parent;

  stable var entries : [(Text, Text)] = [];

  let store: HM.HashMap<Text, Text> = HM.fromIter(entries.vals(), 16, Text.equal, Text.hash);

  /// returns null if there was no previous value, else returns previous value
  public shared func set(key:Text,val:Text): async ?Text {
    if(key == ""){
      throw Error.reject("Empty string is not a valid key");
    };
    return store.replace(key, val);
    // return store.put(key, val);
  };

  public query func get(key: Text): async ?Text {
    return store.get(key);
  };

  public func removeChild(key: Text) {
    return store.delete(key);
  };

  // public query func list(): async Child {
  //   return Iter.toArray(store.entries());
  // };

  // public shared(msg) func getChildList(): async [Child] {
  //   return store.entries();
  // };

  system func preupgrade() {
    entries := Iter.toArray(store.entries());
  };

  system func postupgrade() {
    entries := [];
  };

};
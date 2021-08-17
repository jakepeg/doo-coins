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

  // count children
  public query func length(): async Nat {
    return store.size();
  };

  // Read the wallet balance

  // TODO - need to specify which child this is

  // public query func getBalance() : async Nat {
  //   return walletBalance;
  // };

  // update the wallet balance
  // TODO - need to specify which child this is

  // public func updateBalance(key:Text,n: Nat) : async () {
  //   return currentValue := n;
  // };

  // add a child
  // TODO - init wallet balance zero
  // returns null if there was no previous value, else returns previous value
  public shared func addChild(key:Text,val:Text): async ?Text {
    if(key == ""){
      throw Error.reject("Empty string is not a valid key");
    };
    return store.replace(key, val);
    // return store.put(key, val);
  };

  public query func getChild(key: Text): async ?Text {
    return store.get(key);
  };

  public func removeChild(key: Text) {
    return store.delete(key);
  };

  public query func getChildren(): async [(Text, Text)] {
    return Iter.toArray(store.entries());
  };

  system func preupgrade() {
    entries := Iter.toArray(store.entries());
  };

  system func postupgrade() {
    entries := [];
  };

};
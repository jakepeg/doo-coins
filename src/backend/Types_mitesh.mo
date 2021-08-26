import Trie "mo:base/Trie";
module{
    public type Child ={
        name:Text;
        balance:? Nat;
        id:Text;
    };

    public type ChildCall={
        name:Text;
        balance:? Nat;
    };

    public type Task = {
        name:Text;
        value:Nat;
        status:Bool;
        createdDate:Text;
        completedDate:?Text;
    };

    public type Profile = Trie.Trie<Principal,Trie.Trie<Text,Child>>;

    public type TaskMap = Trie.Trie<Text,Trie.Trie<Nat,Task>>;

    public type Error={//this is expected by result library and this is called variant
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
    };

    public type Success={
        #Success;
    };
}
            
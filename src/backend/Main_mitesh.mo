
import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Result "mo:base/Result";//for better error handling
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Types "./Types"

actor trial {
    stable var profiles : Types.Profile = Trie.empty();
    stable var childNumber : Nat = 1;
    stable var childToTasks : Types.TaskMap = Trie.empty();
    stable var childToTaskNumber: Trie.Trie<Text,Nat> = Trie.empty();

    public shared(msg) func addChild(child:Types.ChildCall):async Result.Result<(),Types.Error>{
        let callerId=msg.caller;
        
        let childId = Principal.toText(callerId) # "-" # Nat.toText(childNumber);
        childNumber +=1;
        let finalChild:Types.Child = {
            name = child.name;
            balance = ?0;
            id = childId;
        };

        //Initializing task number to this child

        let (newChildToTaskNumber,existing)= Trie.put(
            childToTaskNumber,
            keyText(childId),
            Text.equal,
            1
        );

        childToTaskNumber := newChildToTaskNumber;

        let newProfiles = Trie.put2D(
            profiles,
            keyPrincipal(callerId),
            Principal.equal,
            keyText(childId),
            Text.equal,
            finalChild
        );
        profiles:=newProfiles;
        return #ok(());
    };

    public shared(msg) func assignTaskToChildren(task:Types.Task,childId:Text):async Result.Result<(),Types.Error>{
        let callerId=msg.caller;

        //Getting pointer of current task number of the child
        let currentTaskNumberPointer = Trie.find(
            childToTaskNumber,
            keyText(childId),
            Text.equal
        );
        
        let finalPointer:Nat = Option.get(currentTaskNumberPointer,0);

        switch(finalPointer){
            case 0{
                #err(#NotFound);
            };
            case (v){
                let (newMap,existing) = Trie.put(
                    childToTaskNumber,
                    keyText(childId),
                    Text.equal,
                    finalPointer+1
                );

                childToTaskNumber:= newMap;

                let newChildToTasks=Trie.put2D(
                    childToTasks, 
                    keyText(childId),
                    Text.equal,
                    keyNat(finalPointer),
                    Nat.equal,
                    task
                );

                childToTasks:= newChildToTasks;
                #ok(());
            };
        };
        
        
    };
    
    public shared(msg) func getMyChildren():async Result.Result<[Types.Child],Types.Error>{
        let callerId=msg.caller;
        let allChildren = Trie.find(
            profiles,
            keyPrincipal(callerId),
            Principal.equal
        );

        let allChildrenFormatted = Option.get(allChildren,Trie.empty());
        return #ok(Trie.toArray(allChildrenFormatted,extractChildren));  
    };

    public shared(msg) func getMyChildTasks(childId:Text):async Result.Result<[Types.Task],Types.Error>{
        let callerId = msg.caller;

        let myChildTasks = Trie.find(
            childToTasks,
            keyText(childId),
            Text.equal
        );
        let myChildTasksFormatted = Option.get(myChildTasks,Trie.empty());
        return #ok(Trie.toArray(myChildTasksFormatted,extractTasks));
    };

  
    public shared(msg) func updateMyChild(childId:Text,child:Types.Child):async Result.Result<(),Types.Error> {
        let callerId=msg.caller;

        let profilesUpdate = Trie.put2D(
            profiles,
            keyPrincipal(callerId),
            Principal.equal,
            keyText(childId),
            Text.equal,
            child
        );
        profiles:= profilesUpdate;
        return #ok(());
    };

    public shared(msg) func updateTaskOfMyChild(childId:Text,taskNumber:Nat,updatedTask:Types.Task):async Result.Result<(),Types.Error>{

        let callerId=msg.caller;

        let updatedChildToTasks = Trie.put2D(
            childToTasks,
            keyText(childId),
            Text.equal,
            keyNat(taskNumber),
            Nat.equal,
            updatedTask
        );
        childToTasks:=updatedChildToTasks;
        return #ok(());
    };

    private func keyPrincipal(x:Principal):Trie.Key<Principal>{
        return {key = x;hash=Principal.hash(x)}
    };

    private func keyText(x:Text):Trie.Key<Text>{
        return {key = x;hash=Text.hash(x)}
    };

    private func keyNat(x:Nat):Trie.Key<Nat>{
        return {key = x;hash= Hash.hash(x)}
    };

    private func extractChildren(k:Text,v:Types.Child):Types.Child{
        return v;
    };

    private func extractTasks(k:Nat,v:Types.Task):Types.Task{
        return v;
    };
}
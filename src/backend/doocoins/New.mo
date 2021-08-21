import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

// this is something I started to work on but never completed - 
// Need to work out better data structure

actor DooCoins {
    type ChildProfile = {
        displayName: ?Text;
        walletBalance: ?Nat;
        profilePic: ?Text;
    };

    type Child = {
        childProfile: ChildProfile;
    };

    // Application state
    stable var children : Trie.Trie<Nat, Child> = Trie.empty();
    stable var next : Nat = 1;

    // Add a child
    public func addChild (child: Child) : async Bool {
        let childId = next;
        next += 1;

        let (newChildren, existing) = Trie.put(
            children,         // Target trie
            key(childId),     // Key
            Nat.equal,        // Equality checker for finding
            child
        );

        // If there is an original value, do not update
        switch(existing) {
            // If there are no matches, update children
            case null {
                children := newChildren;
            };
            // Matches pattern of type - opt Child
            case (? v) {
                return false;
            };
        };

        return true;
    };

    private func key(x : Nat) : Trie.Key<Nat> {
        return { key = x; hash = Hash.hash(x) }
    };
}








// addChild

// getChild

// getChildren

// removeChild

// countChildren

// getBalance

// updateBalance

// setGoal

// getGoal

// addTask

// getTask

// getTasks

// updateTask

// removeTask

// addTransaction (complete task or claim goal)

// getTransactions


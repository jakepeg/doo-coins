import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as demo_idl,
  canisterId as demo_id,
} from "dfx-generated/doocoins";

const agent = new HttpAgent();
const actor = Actor.createActor(demo_idl, { agent, canisterId: demo_id });

// this hack fixes certificate verification agent error when running localhost. 
// Might need to remove it when deploying to the network
agent.fetchRootKey();

export default actor;
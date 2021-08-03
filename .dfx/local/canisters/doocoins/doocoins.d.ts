import type { Principal } from '@dfinity/agent';
export default interface _SERVICE {
  'get' : (arg_0: string) => Promise<[] | [string]>,
  'length' : () => Promise<bigint>,
  'removeChild' : (arg_0: string) => Promise<undefined>,
  'set' : (arg_0: string, arg_1: string) => Promise<[] | [string]>,
};
import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'addChild' : (arg_0: string, arg_1: string) => Promise<[] | [string]>,
  'getChild' : (arg_0: string) => Promise<[] | [string]>,
  'getChildren' : () => Promise<Array<[string, string]>>,
  'getParentId' : () => Promise<Principal>,
  'length' : () => Promise<bigint>,
  'removeChild' : (arg_0: string) => Promise<undefined>,
}

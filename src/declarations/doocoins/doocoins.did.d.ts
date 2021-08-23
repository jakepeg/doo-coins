import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'addChild' : (arg_0: string, arg_1: string) => Promise<[] | [string]>,
  'getChild' : (arg_0: string) => Promise<[] | [string]>,
  'getChildren' : () => Promise<Array<[string, string]>>,
  'length' : () => Promise<bigint>,
  'parent' : () => Promise<Principal>,
  'removeChild' : (arg_0: string) => Promise<undefined>,
}

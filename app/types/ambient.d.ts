// Minimal ambient types to unblock typecheck without installing undici types.
// Runtime still requires installing the `undici` package for the TLS bypass path.
declare module 'undici' {
  export function setGlobalDispatcher(dispatcher: any): void;
  export class Agent {
    constructor(options?: any);
  }
}


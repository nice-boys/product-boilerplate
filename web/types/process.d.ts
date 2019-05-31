declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }

  export interface Global {
    fetch: typeof fetch;
  }
}

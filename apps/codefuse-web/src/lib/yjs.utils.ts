export const fromBase64 = (str: string) => Uint8Array.from(atob(str), c => c.charCodeAt(0));
export const toBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
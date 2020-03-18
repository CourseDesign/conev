export default function isPureObject(input: any): boolean {
  if (typeof input !== 'object') return false;
  if (input === null || input === undefined || typeof input !== 'object') return false;
  const prototype = Object.getPrototypeOf(input);
  if (!prototype) return true;

  // eslint-disable-next-line no-prototype-builtins
  return prototype.isPrototypeOf(Object);
}

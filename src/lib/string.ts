export function isString(str: unknown): str is string {
  return typeof str === 'string';
}

export function isEmptyString(str: string) {
  return str === '' || str.length === 0;
}

export function getAllUUID(str: string) {
  const UUID_REGEX = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/gi;
  return str.match(UUID_REGEX);
}

export const format = {
  titleCase: (str: string) => str.toLowerCase().replace(/^(.)|\s(.)/g, f => f.toUpperCase()),
};

import camelCase from "lodash/camelCase";

export default function toCamelCase(record: any): any {
  const result: any = {};
  Object.entries(record).forEach((entry) => {
    const [key, value] = entry;
    result[camelCase(key)] = value;
  });
  return result;
}

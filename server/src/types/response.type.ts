export type ResponseType<K extends string, T> = {
  [P in K]: T;
};

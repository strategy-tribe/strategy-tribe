// Extracts the return type of a promise
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

/** Retrieves the type of an element in an array */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type Success<R> = {
  readonly _tag: "success";
  readonly result: R;
};

type Failed<E> = {
  readonly _tag: "failed";
  readonly error: E;
};

console.clear();

export type Try<E, R> = Failed<E> | Success<R>;

export const success = <R>(result: R): Try<never, R> => ({
  _tag: "success",
  result,
});

export const failed = <E>(error: E): Try<E, never> => ({
  _tag: "failed",
  error,
});
export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> =>
  ta._tag === "success";

export const isFailed = <E>(ta: Try<E, unknown>): ta is Failed<E> =>
  ta._tag === "failed";

export const getOrElse = <E, R>(
  ta: Try<E, R>,
  defaultValue: (e: E) => R
): R => {
  if (isFailed(ta)) return defaultValue(ta.error);
  return ta.result;
};

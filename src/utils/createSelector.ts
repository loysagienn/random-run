import { State } from "types";

export type Selector<TResult = any> = (state: State) => TResult;

type Args1<R, R1> = [selector1: Selector<R1>, combiner: (r1: R1) => R];

type Args2<R, R1, R2> = [
  selector1: Selector<R1>,
  selector2: Selector<R2>,
  combiner: (r1: R1, r2: R2) => R
];

type Args<R, R1, R2> = Args1<R, R1> | Args2<R, R1, R2>;

function createSelector1<R, R1>(
  selector1: Selector<R1>,
  combiner: (r1: R1) => R
) {
  return (state: State) => {
    const result1 = selector1(state);

    return combiner(result1);
  };
}

export function createSelector<R = any, R1 = any, R2 = any>(
  ...args: Args<R, R1, R2>
) {
  if (args.length === 2) {
    let [selector1, combiner]: Args1<R, R1> = args;

    return (state: State): R => {
      const result1: R1 = selector1(state);

      return combiner(result1);
    };
  }

  if (args.length === 3) {
    const [selector1, selector2, combiner]: Args2<R, R1, R2> = args;

    return (state: State): R => {
      const result1: R1 = selector1(state);
      const result2: R2 = selector2(state);

      return combiner(result1, result2);
    };
  }
}

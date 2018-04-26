// @flow

type DispatcherHooks<R> = {
  fallback: (...*[]) => R,
  predicate?: (...*[]) => boolean,
  before?: (...*[]) => R,
  after?: (...*[]) => R,
};

function execute<R>(hooks: DispatcherHooks<R>, f: (...*[]) => R, args: *[]): R {
  if (hooks.before) {
    const { before } = hooks;

    if (hooks.after) {
      const { after } = hooks;

      return after(f(before(...args), ...args), ...args);
    }

    return f(before(...args), ...args);
  }

  if (hooks.after) {
    const { after } = hooks;

    return after(f(...args), ...args);
  }

  return f(...args);
}

export function dispatcher<R>(
  hooks: DispatcherHooks<R>,
  ...matchers: [(...*[]) => boolean, (...*[]) => R][]
): (...*[]) => R {
  return (...args) => {
    for (const [predicate, executor] of matchers) {
      const shouldExecute = hooks.predicate
        ? hooks.predicate(...args) && predicate(...args)
        : predicate(...args);

      if (shouldExecute) {
        return execute(hooks, executor, args);
      }
    }

    if (!hooks.fallback) {
      throw new Error("Your dispatcher should provide a fallback procedure");
    }

    return execute(hooks, hooks.fallback, args);
  };
}

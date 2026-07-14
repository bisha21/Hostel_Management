import type { NextFunction } from "express";

type RouteHandler = (req: never, res: never, next: NextFunction) => unknown;

/**
 * Wraps an Express handler so a rejected promise (or thrown error) is forwarded to `next`.
 * Generic over the whole handler type (rather than Req/Res individually) so callers
 * can annotate `req` with a specific `Request<Params, ResBody, ReqBody, Query>` and
 * have that exact signature preserved on the returned handler. Works for both async
 * and plain synchronous handlers.
 */
export function asyncHandler<T extends RouteHandler>(fn: T) {
  return (...args: Parameters<T>): void => {
    const next = args[2];
    // Parameters<T> isn't known to be a tuple to the compiler for a generic T, so
    // fn(...args) is rejected; apply() is the escape hatch for the generic case.
    // eslint-disable-next-line prefer-spread
    Promise.resolve(fn.apply(null, args)).catch(next);
  };
}

export default asyncHandler;

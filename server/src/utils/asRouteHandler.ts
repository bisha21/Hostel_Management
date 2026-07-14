import type { RequestHandler } from "express";

/**
 * Express's router methods type `req.params`/`req.query` as the generic
 * `ParamsDictionary`/`ParsedQs`, so a handler typed with a specific (Zod-inferred)
 * `Request<Params, ...>` shape doesn't structurally satisfy `RequestHandler` by default.
 * `validateParams`/`validateQuery` guarantee the runtime shape matches before the handler
 * runs, so this narrows the handler back to a plain `RequestHandler` for route registration.
 */
export function asRouteHandler<T extends (...args: never[]) => unknown>(handler: T): RequestHandler {
  return handler as unknown as RequestHandler;
}

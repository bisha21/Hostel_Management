import type { NextFunction, Request, Response } from "express";

type AsyncRequestHandler<Req extends Request = Request, Res extends Response = Response> = (
  req: Req,
  res: Res,
  next: NextFunction,
) => Promise<unknown>;

export function asyncHandler<Req extends Request = Request, Res extends Response = Response>(
  fn: AsyncRequestHandler<Req, Res>,
) {
  return (req: Req, res: Res, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
}

export default asyncHandler;

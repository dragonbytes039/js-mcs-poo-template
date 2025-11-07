import type { Request, Response, NextFunction } from "express";


export const timeout = (req:Request, res:Response, next:NextFunction) => {
    req.setTimeout(50000, ()=>{
        if (!res.headersSent) {
            return res.status(503).json({success:false, msg:"Service Unavailable: Request timed out."});
      }
    }); // Set request timeout to seconds
    res.setTimeout(50000, ()=>{
        if (!res.headersSent) {
        return res.status(503).json({success:false, msg:"Service Unavailable: Response timed out."});
      }
    }); // Set response timeout to seconds
    next();
  }
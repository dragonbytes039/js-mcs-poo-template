import type {Request , Response, NextFunction} from "express"

export  function authorizated(  req:Request, res:Response, next:NextFunction) {

    if(!req.headers['x-user-id']) {
        return res.status(403).json({
            success:false
        })
    }

    req.body.id_user = req.headers['x-user-id']

    next()

}
import type { Request, Response, NextFunction } from "express"
import { ZodType } from "zod/v4"

//validate with ZOD and Schemas in validateInpuBody

export  function validate_body( schema:ZodType) {

    return ( req:Request, res:Response, next:NextFunction) => {
        try {
           
            const result = schema.safeParse(req.body)
            if(!result.success){
                return res.status(400).json({
                    success:false,
                    error:process.env.NODE_ENV == "dev"?result.error:"Ha ocurrido un error en la peticion"
                })
            }
            req.body = result.data
            next()

        } catch (error) {
            return res.status(400).json(
                {success:false,
                msg:"ha ocurrido un error al procesar su solicitud"
            })
        }
        
    }

}
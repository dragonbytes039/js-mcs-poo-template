import type { Request, Response , NextFunction } from "express";
import { ExampleCreate } from "../services/example/create.js";


export class ExampleController {

    static async createExample(req:Request, res:Response, next:NextFunction){
        
        try {
            
            const exampleService = new ExampleCreate("insert Models")
            const result = exampleService.execute()

            res.status(200).send("create", result)
            
        } catch (error) {
            res.status(500).send("errror")
        }
        
    }   


}
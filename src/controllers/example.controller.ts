import type { Request, Response , NextFunction } from "express";
import { Example } from "../services/example/Example.js";


export class ExampleController {

    static async createExample(req:Request, res:Response, next:NextFunction){
        
        try {
            
            const exampleService = new Example("insert Models")
            const result = exampleService.createExample()

            res.status(200).send("create", result)
            
        } catch (error) {
            res.status(500).send("errror")
        }
        
    }   


}
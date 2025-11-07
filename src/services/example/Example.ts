import type { IExampleService } from "./interfaces.js";

export class Example implements IExampleService{

    constructor(private model:string) {}
    
    createExample(): Promise<string> {
        throw new Error("Method not implemented.");
    }


  


}
import { Router } from "express";
import { ExampleController } from "../../controllers/example.controller.js";


const ExampleRouter:Router = Router()

ExampleRouter.post("/create" ,ExampleController.createExample)

export default ExampleRouter
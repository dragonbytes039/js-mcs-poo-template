# Template: Model-Controller-Service

**Goal:** Build a robust application based on strict **separation of concerns** through horizontal technical layers.

**Purpose:** To maximize code maintainability and simplicity, ensuring a unidirectional data flow where higher-level layers (HTTP/Controllers) orchestrate lower-level layers (Services/Models) without tight coupling to the framework logic in the business core.

## Global Structure (Shared Infrastructure)

These folders contain the technical foundation that runs the server. They provide the environment for the application layers to operate.

* **`/src/config/DB`**: Shared database configuration and connection setup (e.g., ORM instantiation, Connection Pooling). It is the single source of truth for data access configuration.
* **`/src/api`**: The entry point for the HTTP interface.
    * **Middleware**: Global interceptors (logging, CORS, authentication guards).
    * **Server**: The generic HTTP server implementation (Express/Fastify setup).

## Layered Structure (The Core)

Unlike a modular architecture that slices by feature, this architecture slices by **responsibility**. Each directory represents a specific technical layer in the request lifecycle.

### Layer Anatomy

Every request traverses strictly from the outer layer (Routes) to the inner layer (Model) and back.

#### 1. Data Layer (The Foundation)

* **`/src/model`**: The authoritative representation of the application's data state.
    * Contains **Schemas** and **Data Models** (e.g., Mongoose Models, TypeORM Entities).
    * **Responsibility**: Defines the shape of the data and executes direct database operations (CRUD).
    * **Crucial**: This layer has **zero dependencies** on Controllers or Services. It only knows about the Database.

#### 2. Service Layer (Business Logic)

* **`/src/services/{domain}`**: The heart of the application's intelligence.
    * Contains pure business logic and rule enforcement.
    * **Responsibility**:
        * Receives sanitized data from Controllers.
        * Performs calculations, complex validations, and business decisions.
        * Calls the **Model Layer** to persist or retrieve state.
    * **Isolation**: This layer represents "What the app does" regardless of "How it is accessed". It must **never** reference HTTP objects (`req`, `res`).

#### 3. Controller Layer (Orchestration & Adapters)

* **`/src/controllers`**: The interface between the Web and the Business Logic.
    * Acts as the **Adapter** for the HTTP framework.
    * **Responsibility**:
        * Receives HTTP requests (Body, Params, Query).
        * Orchestrates the flow by calling the appropriate **Service Layer** functions.
        * Transforms the result into a standardized HTTP response (Status Codes, JSON format).
    * **Dependency**: Depends strictly on the Service Layer.

#### 4. Interface Layer (Routing)

* **`/src/api/routes`**: The map of the application.
    * **Responsibility**:
        * Maps specific URL endpoints and HTTP methods (GET, POST) to specific **Controllers**.
        * Does not contain logic; strictly configuration of entry points.

## Main Entry Point

* **`/src/index.ts`** (or `server.ts`): The composition root of the application.
    * It initializes the **Database Connection** from `/src/config`.
    * It mounts the **Routes** onto the main server instance.
    * It binds the port and starts listening for incoming traffic.

## Key Rule for Architectural Integrity

To ensure maintainability and prevent "Spaghetti Code", **Rule #1 is Strict Unidirectional Dependency**:

1.  **Allowed Flow**: `Routes` -> `Controllers` -> `Services` -> `Models`.
2.  **Forbidden**: A lower layer must **never** import a higher layer (e.g., A Model cannot import a Service; A Service cannot import a Controller).
3.  **Forbidden**: A layer should not skip a step (e.g., A Controller should not query a Model directly; it must always go through a Service).

## Chapter 3: Deploying locally using docker-compose

In the previous chapter you understood, how to containerize your .NET Core microservices application. You have created the docker images in your local machine repository. In this chapter you will be understanding how to run the containerized applications using `docker-compose`.

### Prerequisites
-------------------------
* Docker Desktop
* Visual Studio Code
* Docker extension for Visual Studio Code
* .NET Core 2.2

### What is Docker compose ?
Docker compose is a tool for defining and running multi-container applications Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. Compose works in all environments: production, staging, development, testing, as well as CI workflows.
Using Compose is basically a three-step process:
* Define your app’s environment with a `Dockerfile` so it can be reproduced anywhere.
* Define the services that make up your app in `docker-compose.yml` so they can be run together in an isolated environment.
* Run `docker-compose up` and Compose starts and runs your entire app.

### Build your multi-container application
1. Open Visual Studio Code and set `K8S-Microservices` folder as the current working directory. The directory contains the `EventAPI`, `IdentityAPI` and `EventClient`.
2. Create a new file with the name `docker-compose.yml` in the root folder.
3. In docker compose file you need to define the networks and services. The application requires an `SQL Server` container that is used by the `IdentityAPI` and `EventAPI` services. 
4. Add the following code to define the networks in the `docker-compose.yml` file.
   ```
    version: "3"
    networks: 
        frontend:
            driver: bridge
        backend:
            driver: bridge
    ```
5. The above code defines two networks `frontend` and `backend` of type `bridge`. You will be running the `Sql Server` container and the REST service containers - `IdentityAPI` and `EventAPI` - in the `backend` network. You can run the UI service `EventClient` in the `frontend` network.
6. Now, you need to deploy the application containers using `services` in the `docker-compose`.
7. Add the following code below the network defenition in the `docker-compose` file.
    ```
    services: 
        sqlsvc:
            image: mcr.microsoft.com/mssql/server:2017-latest
            container_name: mssql
            ports: 
               - "1433:1433"
            networks: 
               - backend
        environment: 
            SA_PASSWORD: ${SA_PASSWORD}
            ACCEPT_EULA: ${ACCEPT_EULA}
        identitysvc:
            build: ./IdentityAPI/IdentityAPI/
            container_name: identity
            ports: 
               - "5000:80"    
            depends_on: 
               - sqlsvc
            networks: 
               - backend
            environment:
               - ConnectionStrings:IdentityConnection=${IDENTITY_CONNECTION_STRING}
               - Jwt:Secret=${JWT_SECRET}
               - Jwt:Issuer=${JWT_ISSUER}
               - Jwt:Audience=${JWT_AUDIENCE}
        eventsvc:
            build: ./EventAPI/EventAPI/
            container_name: eventapi
            ports: 
               - "5001:80"    
            depends_on: 
               - sqlsvc
               - identitysvc
            networks: 
               - backend
            environment:
               - ConnectionStrings:SqlConnection=${EVENT_CONNECTION_STRING}
               - Jwt:Secret=${JWT_SECRET}
               - Jwt:Issuer=${JWT_ISSUER}
               - Jwt:Audience=${JWT_AUDIENCE}
        eventui:
            build: ./EventClient/EventClient/
            container_name: eventclient
            ports: 
               - "5002:80"    
            depends_on: 
               - sqlsvc
               - identitysvc
               - eventsvc
            networks: 
               - frontend
            environment:
               - SpaSettings:IdentityApiUrl=${IDENTITY_SERVICE_URL}
               - SpaSettings:EventApiUrl=${EVENT_SERVICE_URL} 
    ```
   Lets discuss  about the code given above:
   We are defining 3 services - `sqlsvc`, `identitysvc` and `eventsvc`. 
   #### `sqlsvc` service
   * The `sqlsvc` uses a docker image `mcr.microsoft.com/mssql/server:2017-latest` to deploy the Sql Server container. 
   * The container name is `mssql` and it runs on port number 1433. You are enabling port forwarding for the Sql Server container for external access on port 1433. 
   * Sql Server container is running on `backend` network.
   * Sql server container requires two `environment variables`  to be set: `SA_PASSWORD` and `ACCEPT_EULA`. You can notice that we are using two variables `${SA_PASSWORD}` and `${ACCEPT_EULA}` for setting the values for Sql Server environment variables. We will define a `.env` file to define the `variables` for the environment variables.
   #### `identitysvc` service
   * The `identitysvc` container is created by using a `Dockerfile`. While running the `docker-compose` it build the image of the application and runs the container.
   * The container is running on port number 80 and we enable port forwading to access application from outside docker network on port number 5000.
   * This application container is also running on `backend` network.
   * `identitysvc` service depends on the `sqlsvc`. It means it delays the `identitysvc` container creation untill the `sqlsvc` container is ready.
   * You need to set a set of environment variables for the application. The `ConnectionStrings:IdentityConnection`, `Jwt:Secret`, `Jwt:Issuer` and `Jwt:Audience` environment variable values are defined in the `.env` file. 
   #### `eventsvc` service
   * The `eventsvc` container is also created by a `Dockerfile`. While running the `docker-compose` it build the image of application and runs the container.
   * The container is running on port number 80 and forwarded to external port 5001 for external access.
   * `eventsvc` service depends on `sqlsvc` and `identitysvc`.
   * Need to set the database connection string and Jwt token parameters using the environment variables. The environment variable values are defined in the `.env` file.
   #### `eventui` service
   * The `eventui` application image is also created by a `Dockerfile`. While running the `docker-compose` it build the image of application and runs the container.
   * The container is running on port number 80 and forwarded to external port 5002 for external access.
   * `eventui` service depends on `sqlsvc`, `identitysvc` and `eventsvc` services.
   * You need to set the `SpaSettings:IdentityApiUrl` and `SpaSettings:EventApiUrl` environment variables. The environment variable values are defined in the `.env` file.
 
8. Create a new file with the name `.env`. This file defines the values for the environment variables defined in the `docker-compose.yml` file. While running the docker compose tool picks the `.env` file to get the variable values. Add the following lines in the `.env` file.
    ```
    ACCEPT_EULA=Y
    SA_PASSWORD=Password@123
    IDENTITY_CONNECTION_STRING=Data Source=sqlsvc;Initial Catalog=IdentityDB;Persist Security Info=True;User ID=sa;Password=Password@123;
    EVENT_CONNECTION_STRING=Data Source=sqlsvc;Initial Catalog=EventDB;Persist Security Info=True;User ID=sa;Password=Password@123;
    JWT_SECRET=mystrongsecretkeyforencryption
    JWT_ISSUER=http://identitysvc
    JWT_AUDIENCE=http://eventsvc
    IDENTITY_SERVICE_URL=http://localhost:5000
    EVENT_SERVICE_URL=http://localhost:5001
    ```
9.  Open the `command prompt` in the root folder and run the following command to run the application.
    > $ docker-compose up
10. You can use the `-d` option to run in the detach mode also.
    > $ docker-compose up -d
11.  You will see the running status of the command in the terminal. 
    ```
    D:\GitHub\K8S-Microservices (master -> origin)
    λ docker-compose up -d
    WARNING: Some networks were defined but are not used by any service: frontend
    Creating network "k8s-microservices_backend" with driver "bridge"
    Building identitysvc
    Step 1/16 : FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
    ---> a4974ac66bfc
    Step 2/16 : WORKDIR /src
    ---> Running in 6cd4383a3baa
    Removing intermediate container 6cd4383a3baa
    ---> fffad87c487a
    Step 3/16 : COPY *.csproj ./
    ....removed for brievity 
    ```
    ```
    ... ignored some output for brievity
    WARNING: Some networks were defined but are not used by any service: frontend
    Starting mssql ... done
    Starting identity ... done
    Starting eventapi ... done
    ```
12. Open the browser and navigate to `http://localhost:5000` to access `IdentityAPI` application and `http://localhost:5001` to access `EventAPI` application.
13. To access the UI application, open the browser and navigate to `http://localhost:5002`.

----
Shared by Sonu Sathyadas
[mailto:sonusathyadas@hotmail.com](mailto:sonusathyadas@gmail.com)
## Chapter 2: Containerizing Microservices

This module helps you to understand, how to containerize the .NET Core microservices application. In the previous chapter , you have understood how to create a simple 'Event Management'  Microservices application. In this chapter we will containerize the `IdentityApi`, `EventApi` and the `EventClient` applications.

###Prerequisites
-------------------------
* Docker Desktop
* Visual Studio Code
* Docker extension for Visual Studio Code
* .NET Core 2.2

You can download the .NET Core Microservices applications by cloning the `` repository
> $ git clone 
####Containerizing `IdentityApi` service
1. Open the `IdentityApi` project in Visual Studio Code.
2. Open the `appsettings.json` file and update the `Connectionstrings:IdentityConnection` value with your Sql server connection string.
3. Update the `Jwt:Issuer` value with the Url of the `IdentityAPI` application. Same way, update the `Jwt:Audience` value with the `EventApi` application Url.
    ```
    "ConnectionStrings": {
        "IdentityConnection": "<Identity_database_Connection_string>"  
    },
    "Jwt": {
        "Secret": "Thisismylengthysecretkeyforencryption",
        "Issuer": "<IdentityApi_project_Url>",
        "Audience": "<EventApi_project_url>"
    }
    ```
4. Build the application by running the following command.
   > $ dotnet build
5. Run and test the application using the following command.
   > $ dotnet run
6. The appliation runs in your default browser, and opens the Swagger UI page. 
7. Now, you can containerize the application using Docker. For that, add a `Dockerfile` in the project folder. 
   >> **Note**: Dockerfile is a text file with the name `Dockerfile` without any file extension.
8. Add the following code in the `Dockerfile`.
   ```
    #Stage 1
    FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
    WORKDIR /src
    COPY *.csproj ./
    RUN dotnet restore
    COPY . .
    RUN dotnet build
    RUN dotnet publish -c Release -o out

    #Stage 2
    FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
    WORKDIR /app
    COPY --from=build /src/out .
    EXPOSE 80
    ENV ConnectionStrings:IdentityConnection="<Your_identity_connection_string>"
    ENV Jwt:Secret="thisislengthysecretkey"
    ENV Jwt:Issuer="http://localhost:5000"
    ENV Jwt:Audience="http://localhost:5001"
    ENTRYPOINT [ "dotnet", "IdentityAPI.dll" ]
    ```
9.  Open the `Command prompt` in the project root folder where the `Dockerfile` is located and run the following `docker` command to build the docker image.
    > $ docker build -t identityapi:latest .
10. This will build the `identityapi` docker image. The build process may takes some time to complete.  
    >>**Note**: If the base images (`mcr.microsoft.com/dotnet/core/sdk:2.2`) and (`mcr.microsoft.com/dotnet/core/aspnet:2.2`) does not exists in your local repository it downloads the images from the DockerHub. This requires internet connection. 
11. Run the following command to list the images in your local repository.
    > $ docker images

```
REPOSITORY                             TAG                 IMAGE ID            CREATED             SIZE
identityapi                            latest              8d709461d340        29 seconds ago      274MB
nginx                                  latest              62c261073ecf        8 days ago          109MB
mcr.microsoft.com/mssql/server         2017-latest         3471dd922373        3 weeks ago         1.33GB
node                                   latest              502d06d3bfdf        5 weeks ago         906MB
mcr.microsoft.com/dotnet/core/sdk      2.2                 a4974ac66bfc        5 weeks ago         1.74GB
mcr.microsoft.com/dotnet/core/aspnet   2.2                 ce06b36fcba4        5 weeks ago         260MB
```

####Containerizing `EventApi` service

1. Open the `EventApi` project in Visual Studio Code.
2. Open the `appsettings.json` file and update the `Connectionstrings:SqlConnection` value with your Sql server connection string.
3. Update the `Jwt:Issuer` value with the Url of the `IdentityAPI` application. Same way, update the `Jwt:Audience` value with the `EventApi` application Url.
    ```
    "ConnectionStrings": {
        "SqlConnection": "<Event_database_connection_string>"  
    },
    "Jwt": {
        "Secret": "Thisismylengthysecretkeyforencryption",
        "Issuer": "<IdentityApi_project_Url>",
        "Audience": "<EventApi_project_url>"
    }
    ```
4. Build the application by running the following command.
   > $ dotnet build
5. Run and test the application using the following command.
   > $ dotnet run
6. The appliation runs in your default browser, and opens the Swagger UI page. 
7. Now, you can containerize the application using Docker. For that, add a `Dockerfile` in the project folder. 
   >> **Note**: Dockerfile is a text file with the name `Dockerfile` without any file extension.
8. Add the following code in the `Dockerfile`.
   ```
    #Stage 1
    FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
    WORKDIR /src
    COPY *.csproj ./
    RUN dotnet restore
    COPY . .
    RUN dotnet build
    RUN dotnet publish -c Release -o out

    #Stage 2
    FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
    WORKDIR /app
    COPY --from=build /src/out .
    EXPOSE 80
    ENV ConnectionStrings:SqlConnection="<Event_database_connection_string>"
    ENV Jwt:Secret="thisislengthysecretkey"
    ENV Jwt:Issuer="http://localhost:5000"
    ENV Jwt:Audience="http://localhost:5001"
    ENTRYPOINT [ "dotnet", "EventAPI.dll" ]
    ```
9.  Open the `Command prompt` in the project root folder where the `Dockerfile` is located and run the following `docker` command to build the docker image.
    > $ docker build -t eventapi:latest .
10. This will build the `eventapi` docker image. The build process may takes some time to complete.  
11. Run the following command to list the images in your local repository.
    > $ docker images

```
REPOSITORY                             TAG                 IMAGE ID            CREATED             SIZE
eventapi                               latest              1c99e384b6df        39 seconds ago      274MB
identityapi                            latest              8d709461d340        13 minutes ago      274MB
nginx                                  latest              62c261073ecf        8 days ago          109MB
mcr.microsoft.com/mssql/server         2017-latest         3471dd922373        3 weeks ago         1.33GB
node                                   latest              502d06d3bfdf        5 weeks ago         906MB
mcr.microsoft.com/dotnet/core/sdk      2.2                 a4974ac66bfc        5 weeks ago         1.74GB
mcr.microsoft.com/dotnet/core/aspnet   2.2                 ce06b36fcba4        5 weeks ago         260MB
```

---
Shared by Sonu Sathyadas 
[mailto:sonusathyadas@hotmail.com](mailto:sonusathyadas@gmail.com)
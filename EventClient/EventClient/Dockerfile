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

ENV ASPNETCORE_ENVIRONMENT="Production"
# ENV SpaSettings:IdentityApiUrl="IdentityServiceUrl"
# ENV SpaSettings:EventApiUrl="EventServiceUrl"

ENTRYPOINT [ "dotnet", "EventClient.dll" ]



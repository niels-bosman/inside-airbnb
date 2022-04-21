FROM mcr.microsoft.com/mssql/server:2019-latest

WORKDIR /db

COPY AIRBNB2022.bacpac .

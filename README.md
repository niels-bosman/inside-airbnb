# InsideAirBnb

## Contributing guide

### Prerequisites

- .NET 6.0 or higher
- Docker
- Node
- NPM or Yarn

### Setting up the docker environment

Setting up the docker images only requires one command

```bash
docker-compose up -d
```

### Starting the API

This requires the dotnet CLI to be installed on your system.

```bash
cd api

dotnet run

# or if you want to run it in watch mode

dotnet watch
```

### Setting up the front-end

#### Installing all necessary dependencies

```bash
cd client

npm install

# or if you want to use yarn

yarn install
```

#### Starting the development server

```bash
npm run dev

# or if you want to use yarn

yarn dev
```

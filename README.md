# Technical test project

This project is designed to be run with Docker, Yarn and Serverless Offline. Below are the steps required to successfully run the project in your development environment.

## Previous Requirements

Before you begin, make sure you have the following tools installed on your machine:

- **[Yarn](https://yarnpkg.com/)**: A package manager for JavaScript.
- **[Docker](https://www.docker.com/)**: Software that allows you to run applications in containers.
- **[Serverless Framework](https://www.serverless.com/)**: A framework for developing serverless applications.
- **[Serverless Offline](https://www.npmjs.com/package/serverless-offline)**: A plugin for the Serverless Framework that allows you to simulate the execution of AWS Lambda and API Gateway locally.

If you don't have these tools, you can install Yarn from its official site, Docker from its download page, and Serverless Framework and Serverless Offline using the following commands:

```tap
npm -g serverless installation
npm install serverless offline --save-dev
```

Next you must install the dependencies with
`thread installation`

Once installed, you must generate the project in docker with the command, whichever case you choose: (The environment variables are not found in the repository)
```
docker compose --env-file .env.dev up -w   # Para desarrollo
docker compose --env-file .env.qa up -w  # Para testing
```

The API documentation will be available at
`/documentation`

# Setting up pgAdmin and PostgreSQL Server

To connect to the PostgreSQL server from PgAdmin, we need to create a server object in PgAdmin with the details of the PostgreSQL server.

## Steps to Create a Server in PgAdmin

1. Open PgAdmin in the web browser by visiting [http://localhost:5050](http://localhost:5050) (assuming we're using the default configuration in the `docker-compose.yml` file).
2. Log in using your email and password in the `docker-compose.yml` file for the pgadmin service.
3. In the left-hand sidebar, click **Servers** to expand the Servers menu.
4. Right-click on **Servers** and select **Register → Server**.
5. In the **General** tab of the **Create - Server** dialog, give the server a name of your choice.
6. In the **Connection** tab, fill in the following details:
   - **Host name/address**: `db`
   - **Port**: `5432`
   - **Maintenance database**: `postgres`
   - **Username**: `postgres`
   - **Password**: `postgres`
7. Click **Save** to save the server configuration.

> **Note**: Since the PostgreSQL server is running in a Docker container, the hostname/address should be the name of the Docker service for the database container as defined in the `docker-compose.yml` file. By default, the name of the service becomes the hostname/address of the container within the Docker network.

After completing these steps, you should see the server you created in the left-hand sidebar of PgAdmin. You can expand the server to see the databases and other objects within it.


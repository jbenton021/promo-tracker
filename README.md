# PromoTracker

Web application to track promo codes from YouTubers and other influencers.

## Getting Started

Run a PostgreSQL Docker container:

`docker run --name <container_name> -e POSTGRES_USER=<postgres_user> -e POSTGRES_PASSWORD=<postgres_password> -p 5432:5432 -d postgres`

Use `init.sql` to create the database. From the project root:

`docker cp init.sql <container_name>:/tmp/init.sql`

`docker exec -ti <container_name> /bin/bash -c "psql -U <postgres_user> -d <postgres_database> -f /tmp/init.sql`

Edit `/server/.env` as necessary:

```
PGDATABASE=<postgres_user>
PGUSER=<postgres_user>
PGPASSWORD=<postgres_password>
PGHOST=localhost
PGPORT=5432

PORT=9000
```
Run `node index.js` from the `server` directory.

Run `npm start` from the `client` directory.




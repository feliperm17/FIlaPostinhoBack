FROM postgres:17.2-alpine

COPY ./src/scripts/create_db.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

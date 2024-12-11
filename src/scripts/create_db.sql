DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Address;
DROP TABLE IF EXISTS QueueItem;
DROP TABLE IF EXISTS Queue;
DROP TABLE IF EXISTS Specialty;
DROP TABLE IF EXISTS User;


CREATE TABLE User(
   user_id SERIAL PRIMARY KEY,
   username VARCHAR(50) NOT NULL,
   phone_nr CHAR(13) NOT NULL,
   email VARCHAR(50) NOT NULL,
   cpf CHAR(13) NOT NULL,
   user_st NUMERIC NOT NULL,
);

CREATE TABLE Specialty(
   specialty_id SERIAL PRIMARY KEY,
   specialty_name VARCHAR(50),
);

CREATE TABLE Queue(
   queue_id SERIAL PRIMARY KEY,
   specialty NUMERIC,
   queue_dt DATE NOT NULL,
   position_nr NUMERIC NOT NULL,
   queue_size NUMERIC NOT NULL,
   FOREIGN KEY(specialty) REFERENCES Specialty(specialty_id),
);

CREATE TABLE QueueItem(
   queue_id NUMERIC,
   user_id NUMERIC,
   item_pr NUMERIC NOT NULL,
   position NUMERIC NOT NULL,
   item_st NUMERIC NOT NULL,
   FOREIGN KEY(queue_id) REFERENCES Queue(queue_id),
   FOREIGN KEY(user_id) REFERENCES User(user_id),
   PRIMARY KEY(queue_id, user_id),
)

CREATE TABLE Address(
   user_id NUMERIC,
   address_id SERIAL,
   street CHAR(50) NOT NULL,
   city CHAR(50) NOT NULL,
   complement CHAR(50),
   postal_code VARCHAR(10),
   FOREIGN KEY(user_id) REFERENCES User(user_id),
   PRIMARY KEY(user_id, address_id),
)

CREATE TABLE Admin(
   user_id NUMERIC PRIMARY KEY,
   FOREIGN KEY(user_id) REFERENCES User(user_id),
)

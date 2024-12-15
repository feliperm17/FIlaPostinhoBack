CREATE TABLE IF NOT EXISTS Account(
   account_id SERIAL PRIMARY KEY,
   username VARCHAR(50) NOT NULL,
   phone_nr CHAR(13) NOT NULL,
   email VARCHAR(50) NOT NULL,
   cpf CHAR(13) NOT NULL,
   account_st NUMERIC NOT NULL,
   password_hash VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS Specialty(
   specialty_id SERIAL PRIMARY KEY,
   specialty_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Queue(
   queue_id SERIAL PRIMARY KEY,
   specialty INTEGER,
   queue_dt DATE NOT NULL,
   position_nr NUMERIC NOT NULL,
   queue_size NUMERIC NOT NULL,
   FOREIGN KEY(specialty) REFERENCES Specialty(specialty_id)
);

CREATE TABLE IF NOT EXISTS QueueItem(
   queue_id INTEGER,
   account_id INTEGER,
   item_pr NUMERIC NOT NULL,
   position NUMERIC NOT NULL,
   item_st NUMERIC NOT NULL,
   FOREIGN KEY(queue_id) REFERENCES Queue(queue_id),
   FOREIGN KEY(account_id) REFERENCES Account(account_id),
   PRIMARY KEY(queue_id, account_id)
);

CREATE TABLE IF NOT EXISTS Address(
   account_id INTEGER,
   address_id SERIAL,
   street CHAR(50) NOT NULL,
   city CHAR(50) NOT NULL,
   complement CHAR(50),
   postal_code VARCHAR(10),
   FOREIGN KEY(account_id) REFERENCES Account(account_id),
   PRIMARY KEY(account_id, address_id)
);

CREATE TABLE IF NOT EXISTS Admin(
   account_id INTEGER PRIMARY KEY,
   FOREIGN KEY(account_id) REFERENCES Account(account_id)
);

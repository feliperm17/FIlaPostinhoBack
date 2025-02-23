CREATE TABLE IF NOT EXISTS Account(
   account_id SERIAL PRIMARY KEY,
   username VARCHAR(50) NOT NULL,
   phone_nr VARCHAR(15) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   cpf CHAR(11) UNIQUE NOT NULL,
   account_st NUMERIC NOT NULL,
   is_admin BOOLEAN NOT NULL DEFAULT false,
   password_hash VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS Specialty(
   specialty_id SERIAL PRIMARY KEY,
   specialty_name VARCHAR(50),
   available_days SMALLINT DEFAULT 0,
   estimated_time SMALLINT
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
   entry_time TIMESTAMP NOT NULL DEFAULT NOW(),
   item_st NUMERIC NOT NULL, 
   FOREIGN KEY(queue_id) REFERENCES Queue(queue_id),
   FOREIGN KEY(account_id) REFERENCES Account(account_id),
   PRIMARY KEY(queue_id, account_id)
);

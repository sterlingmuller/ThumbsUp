-- DROP DATABASE IF EXISTS blueocean;
-- CREATE DATABASE blueocean;
\c blueocean;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  password VARCHAR (50) NOT NULL,
  profile_picture VARCHAR (500)
);

CREATE TABLE driver_trips (
  id SERIAL PRIMARY KEY,
  user_id INT,
  start_address VARCHAR(500) NOT NULL,
  end_address VARCHAR(500) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  completed BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* finished up to here */

CREATE TABLE rider_trips (
  id SERIAL PRIMARY KEY,
  user_id INT,
  id_driver_trips INT,
  pending BOOLEAN DEFAULT true,
  completed_driver_trips BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (id_driver_trips) REFERENCES driver_trips (id)
  -- FOREIGN KEY (completed_driver_trips) REFERENCES driver_trips (completed)
);

CREATE TABLE completed_trips (
  id SERIAL PRIMARY KEY,
  id_driver_trips INT,
  user_id INT,
  rator_id INT,
  rating INT,
  FOREIGN KEY (id_driver_trips) REFERENCES driver_trips(id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  id_driver_trips INT,
  message_sender INT,
  message_recepient INT,
  message_body VARCHAR(500),
  message_time TIMESTAMP,
  FOREIGN KEY (id_driver_trips) REFERENCES driver_trips(id),
  FOREIGN KEY (message_sender) REFERENCES users(user_id),
  FOREIGN KEY (message_recepient) REFERENCES users(user_id)
);


INSERT INTO users( username,password)
VALUES ('MrFripple', '123');
INSERT INTO users(username,password)
VALUES ('person', '123');
INSERT INTO driver_trips(user_id,start_address,end_address,start_time)
VALUES (1,'Las Vegas', 'Denver', '2017-03-31 09:30:20-07');
INSERT INTO messages(id_driver_trips,message_sender,message_recepient,message_body,message_time)
VALUES (1, 2,1, 'Mrfripple sent this to person','2017-03-31 09:30:20-07');

-- psql -d blueocean -f ./backend/database/schema.sql
-- for dev purposes only **********

-- DROP DATABASE IF EXISTS blueocean;
-- CREATE DATABASE blueocean;
-- \c blueocean;

--*********************************

-- User table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  password VARCHAR (50) NOT NULL,
  profile_picture VARCHAR (500)
);

-- User dummy data
INSERT INTO users (username, password, profile_picture)
VALUES ('MrFripple', '123', '');

INSERT INTO users (username, password, profile_picture)
VALUES ('FryGuy', '456', '');

INSERT INTO users (username, password, profile_picture)
VALUES ('MrBean', '789', '');

INSERT INTO users (username, password, profile_picture)
VALUES ('Tony', 'password', '');

INSERT INTO users (username, password, profile_picture)
VALUES ('Mark', 'specialPassword', '');

INSERT INTO users (username, password, profile_picture)
VALUES ('Stan', 'P@ssword123', '');

-- driver trips table
CREATE TABLE driver_trips (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  start_address VARCHAR(500) NOT NULL,
  end_address VARCHAR(500) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  completed BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)
);

-- driver trips dummy data
INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (1, 'Denver, CO', 'Fort Collins, CO', '2017-06-01T08:30', true);

INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (1, 'Denver, CO', 'Boulder, CO', '2017-06-02T08:30', false);

INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (1, 'Colorado Springs, CO', 'Boulder, CO', '2017-06-02T08:30', true);

INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (1, 'Fort Collins, CO', 'Denver, CO', '2017-06-12T08:30', false);

INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (3, 'Las Vegas NV', 'Los Angeles, CA', '2017-06-02T08:30', true);

INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (3, 'Orlando FL', 'Las Vegas NV', '2017-06-15T08:30', false);

INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (3, 'Denver, CO', 'Phoenix, AZ', '2017-06-02T08:30', true);

INSERT INTO driver_trips (user_id, start_address, end_address, start_time, completed)
VALUES (3, 'Atlanta, GA', 'Topeka, KS', '2017-06-12T08:30', false);

-- rider trips table
CREATE TABLE rider_trips (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  id_driver_trips INT NOT NULL,
  pending BOOLEAN DEFAULT true,
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (id_driver_trips) REFERENCES driver_trips (id) ON DELETE CASCADE
);

-- rider trips dummy data
INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (2, 1, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (4, 1, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (2, 2, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (5, 3, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (6, 4, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (4, 5, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (5, 6, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (6, 7, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (2, 8, false);

INSERT INTO rider_trips (user_id, id_driver_trips, pending)
VALUES (2, 7, false);

-- completed trips table for ratings
CREATE TABLE completed_trips (
  id SERIAL PRIMARY KEY,
  id_driver_trips INT,
  user_id INT,
  rator_id INT,
  rating INT,
  FOREIGN KEY (id_driver_trips) REFERENCES driver_trips(id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- completed_trips dummy data
INSERT INTO completed_trips (id_driver_trips, user_id, rator_id, rating)
VALUES (1, 1, 2, 3);

INSERT INTO completed_trips (id_driver_trips, user_id, rator_id, rating)
VALUES (1, 1, 4, 4);

INSERT INTO completed_trips (id_driver_trips, user_id, rator_id, rating)
VALUES (3, 1, 5, 2);

INSERT INTO completed_trips (id_driver_trips, user_id, rator_id, rating)
VALUES (5, 3, 4, 3);

INSERT INTO completed_trips (id_driver_trips, user_id, rator_id, rating)
VALUES (7, 3, 6, 5);

-- messages table
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  id_driver_trips INT,
  message_sender INT,
  message_recepient INT,
  message_body VARCHAR(500),
  message_read BOOLEAN DEFAULT false,
  message_time TIMESTAMP,
  FOREIGN KEY (id_driver_trips) REFERENCES driver_trips(id) ON DELETE CASCADE,
  FOREIGN KEY (message_sender) REFERENCES users(user_id),
  FOREIGN KEY (message_recepient) REFERENCES users(user_id)
);

-- messages dummy data
INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (1, 2, 1, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (1, 1, 2, 'Will do!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (1, 4, 1, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (1, 1, 4, 'Looking forward to it!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (2, 2, 1, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (2, 1, 2, 'Hello again!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (3, 5, 1, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (3, 1, 5, 'Where do you want me to pick you up?', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (4, 6, 1, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (4, 1, 6, 'This is going to be awesome', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (5, 4, 3, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (5, 3, 4, 'Cannot wait for this trip', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (6, 5, 3, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (6, 3, 5, 'Going to be fun!!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (7, 6, 3, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (7, 3, 6, 'Do you want to stop for tea first', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (8, 2, 3, 'Save me a seat!', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (8, 3, 2, 'Have you ever been to the city before?', '2017-05-28T08:30');

INSERT INTO messages (id_driver_trips, message_sender, message_recepient, message_body, message_time)
VALUES (7, 2, 3, 'Save me a seat!', '2017-05-28T08:30');

-- allows fuzzy search with psql ex. denvir -> denver
CREATE EXTENSION pg_trgm;


--to run the file all at once
-- psql -d blueocean -f ./backend/database/schema.sql

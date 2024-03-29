CREATE TABLE utilisateur(
   email_user VARCHAR(50),
   pseudo VARCHAR(50),
   mdp VARCHAR(60),
   admin BOOLEAN,
   PRIMARY KEY(email_user)
);

CREATE TABLE livre(
   reference INT AUTO_INCREMENT,
   titre VARCHAR(50),
   auteur VARCHAR(50),
   pages INT,
   resume VARCHAR(1000),
   url VARCHAR(200),
   date_parution YEAR,
   image_src VARCHAR(500),
   langue VARCHAR(50),
   PRIMARY KEY(reference)
);

CREATE TABLE Genre(
   genre_id INT AUTO_INCREMENT,
   genre VARCHAR(50),
   PRIMARY KEY(genre_id)
);

CREATE TABLE lire(
   email_user VARCHAR(50),
   reference INT,
   PRIMARY KEY(email_user, reference),
   FOREIGN KEY(email_user) REFERENCES Utilisateur(email_user),
   FOREIGN KEY(reference) REFERENCES Livre(reference)
);

CREATE TABLE critiquer(
   email_user VARCHAR(50),
   reference INT,
   noter INT NOT NULL,
   commenter VARCHAR(100),
   PRIMARY KEY(email_user, reference),
   FOREIGN KEY(email_user) REFERENCES Utilisateur(email_user),
   FOREIGN KEY(reference) REFERENCES Livre(reference)
);

create table partager
(
    email_user varchar(50)  not null,
    reference  int          not null,
    token      varchar(200) not nullprimary key,
    date_fin   date         not null,
    constraint partager_livre_reference_fk foreign key (reference) references livre (reference),
    constraint partager_utilisateur_email_user_fk foreign key (email_user) references utilisateur (email_user)
);

CREATE TABLE partager-old(
   email_user VARCHAR(50),
   reference INT,
   token VARCHAR(100),
   date_fin DATE,
   PRIMARY KEY(email_user, reference),
   UNIQUE(token),
   FOREIGN KEY(email_user) REFERENCES Utilisateur(email_user),
   FOREIGN KEY(reference) REFERENCES Livre(reference)
);

CREATE TABLE sauvegarder(
   email_user VARCHAR(50),
   reference INT,
   PRIMARY KEY(email_user, reference),
   FOREIGN KEY(email_user) REFERENCES Utilisateur(email_user),
   FOREIGN KEY(reference) REFERENCES Livre(reference)
);
CREATE TABLE être_recommandé(
   email_user VARCHAR(50),
   reference INT,
   Pourcentage INT,
   PRIMARY KEY(email_user, reference),
   FOREIGN KEY(email_user) REFERENCES Utilisateur(email_user),
   FOREIGN KEY(reference) REFERENCES Livre(reference)
);
CREATE TABLE appartenir(
   reference INT,
   genre_id INT,
   PRIMARY KEY(reference, genre_id),
   FOREIGN KEY(reference) REFERENCES Livre(reference),
   FOREIGN KEY(genre_id) REFERENCES Genre(genre_id)
);



INSERT INTO genre (genre) VALUES ('Fantasy');
INSERT INTO genre (genre) VALUES ('Science Fiction');
INSERT INTO genre (genre) VALUES ('Mystery');
INSERT INTO genre (genre) VALUES ('Romance');
INSERT INTO genre (genre) VALUES ('Thriller');
INSERT INTO genre (genre) VALUES ('History');
INSERT INTO genre (genre) VALUES ('Novels');
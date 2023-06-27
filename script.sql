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

CREATE TABLE partager(
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

create table shareTokens(
    token     varchar(145) not null comment 'Le token',
    from_user varchar(50)  not null comment 'L''utilisateur qui a partagé le livre',
    book      int          not null comment 'Le livre partagé',
    expires   date         not null comment 'La date d''expiration du token',
    constraint shareTokens_pk
        primary key (token),
    constraint shareTokens_Livre_reference_fk
        foreign key (book) references Livre (reference),
    constraint shareTokens_utilisateur_email_user_fk
        foreign key (from_user) references utilisateur (email_user)
);

CREATE TABLE reset_tokens (
  token VARCHAR(200) NOT NULL PRIMARY KEY,
  email_user VARCHAR(50) NOT NULL,
  expires TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 1 HOUR)
);
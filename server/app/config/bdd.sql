DROP TABLE `masterbooks`.`partager`;
DROP TABLE `masterbooks`.`livre`;

CREATE TABLE utilisateur(
   email_user VARCHAR(50),
   pseudo VARCHAR(50),
   mdp VARCHAR(60),
   PRIMARY KEY(email_user)
);

CREATE TABLE Admin(
   email_admin VARCHAR(50),
   PRIMARY KEY(email_admin)
);

Create TABLE Livre(
   reference INT AUTO_INCREMENT,
   titre VARCHAR(50),
   auteur VARCHAR(50),
   genre VARCHAR(100),
   date_parution DATE,
   pages INT,
   langue VARCHAR(50),
   resume VARCHAR(500),
   image_src VARCHAR(200),
   url VARCHAR(200),
   PRIMARY KEY(reference)
);

CREATE TABLE mail(
   id_mail INT,
   titre VARCHAR(50),
   destinataire VARCHAR(50),
   corps VARCHAR(1000),
   email_user VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_mail),
   FOREIGN KEY(email_user) REFERENCES Utilisateur(email_user)
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
   PRIMARY KEY(email_user, reference),
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

CREATE TABLE echanger(
   email_user VARCHAR(50),
   email_admin VARCHAR(50),
   PRIMARY KEY(email_user, email_admin),
   FOREIGN KEY(email_user) REFERENCES Utilisateur(email_user),
   FOREIGN KEY(email_admin) REFERENCES Admin(email_admin)
);
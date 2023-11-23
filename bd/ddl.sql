CREATE SCHEMA `biblioteca_pessoal`;
CREATE USER 'bibliotecario'@'127.0.0.1' IDENTIFIED BY "b1bl10t3c@r10";
GRANT ALL PRIVILEGES ON biblioteca_pessoal.* TO 'bibliotecario'@'127.0.0.1';
CREATE USER 'app_biblioteca'@'127.0.0.1' IDENTIFIED BY "@pp_b1bl10t3c@";
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON biblioteca_pessoal.* TO 'app_biblioteca'@'127.0.0.1';

use `biblioteca_pessoal`;


CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    dataPublicacao DATE NOT NULL
);

use `biblioteca_pessoal`;

CREATE TABLE IF NOT EXISTS autores(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
biografia text NOT NULL,
dataNascimento DATE NOT NULL

);

INSERT INTO autores (nome, biografia, dataNascimento)
SELECT DISTINCT autor, 'Precisa alterar na tela de cadastro', now()
from livros;

ALTER TABLE livros
ADD id_autor INT;

UPDATE livros l
SET id_autor = (SELECT min(a.id) FROM autores a WHERE a.nome = l.autor);
ALTER TABLE livros

DROP COLUMN autor;

ALTER TABLE livros
MODIFY id_autor INT NOT NULL;

CREATE TABLE editoras (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
endereco VARCHAR(255),
telefone VARCHAR(15)

);

ALTER TABLE livros
ADD COLUMN id_editora INT,
ADD FOREIGN KEY (id_autor) REFERENCES autores(id),
ADD FOREIGN KEY (id_editora) REFERENCES editoras(id);
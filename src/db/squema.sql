USE recepita;

CREATE TABLE Ingrediente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  gramos_proteina FLOAT NOT NULL,
  gramos_grasa FLOAT NOT NULL,
  gramos_carbohidratos FLOAT NOT NULL
);

CREATE TABLE Receta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  recomendacion TEXT NOT NULL,
  peso FLOAT NOT NULL,
  tiempo_preparacion INT NOT NULL
);

CREATE TABLE RecetaIngrediente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  receta_id INT NOT NULL,
  ingrediente_id INT NOT NULL,
  cantidad FLOAT NOT NULL,
  FOREIGN KEY (receta_id) REFERENCES Receta(id),
  FOREIGN KEY (ingrediente_id) REFERENCES Ingrediente(id)
);
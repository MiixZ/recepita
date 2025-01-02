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

-- Ingredientes
INSERT INTO Ingrediente (id, nombre, gramos_proteina, gramos_grasa, gramos_carbohidratos) VALUES
(1, 'lechuga romana', 1, 0, 2),
(2, 'pollo a la parrilla', 30, 5, 0),
(3, 'queso parmesano', 10, 30, 0),
(4, 'crutones', 5, 10, 60),
(5, 'aderezo César', 1, 45, 5),
(6, 'salmón', 25, 15, 0),
(7, 'limón', 0, 0, 10),
(8, 'ajo', 2, 0, 30),
(9, 'aceite de oliva', 0, 100, 0),
(10, 'hierbas frescas', 1, 0, 10),
(11, 'tortillas de maíz', 5, 5, 60),
(12, 'pollo desmenuzado', 30, 10, 0),
(13, 'cebolla', 1, 0, 10),
(14, 'cilantro', 1, 0, 5),
(15, 'salsa', 2, 5, 30),
(16, 'caldo de res', 5, 2, 5),
(17, 'queso gruyere', 20, 30, 0),
(18, 'pan', 5, 5, 50),
(19, 'mantequilla', 0, 80, 0);

-- Recetas
INSERT INTO Receta (id, nombre, recomendacion, peso, tiempo_preparacion) VALUES
(1, 'Ensalada César', 'Ideal para una comida ligera y balanceada.', 345, 15),
(2, 'Salmón al horno', 'Rico en omega-3, perfecto para una dieta saludable.', 320, 25),
(3, 'Tacos de pollo', 'Una opción deliciosa y nutritiva para el almuerzo.', 400, 20),
(4, 'Sopa de cebolla', 'Una sopa reconfortante y rica en sabor, ideal para días fríos.', 300, 30);

-- RecetaIngrediente
INSERT INTO RecetaIngrediente (id, receta_id, ingrediente_id, cantidad) VALUES
(1, 1, 1, 100),
(2, 1, 2, 150),
(3, 1, 3, 50),
(4, 1, 4, 30),
(5, 1, 5, 15),
(6, 2, 6, 200),
(7, 2, 7, 5),
(8, 2, 8, 10),
(9, 2, 9, 100),
(10, 2, 10, 5),
(11, 3, 11, 100),
(12, 3, 12, 200),
(13, 3, 13, 20),
(14, 3, 14, 5),
(15, 3, 15, 75),
(16, 4, 16, 50),
(17, 4, 17, 100),
(18, 4, 18, 100),
(19, 4, 19, 30),
(20, 4, 20, 20);
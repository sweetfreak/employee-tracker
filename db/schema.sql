DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30) NOT NULL);

CREATE TABLE positions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Position VARCHAR(30) NOT NULL,
    Salary DECIMAL NOT NULL,
    IsManager BOOLEAN,
    department_id INTEGER NOT NULL,
    -- CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
    );

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    position_id INTEGER NOT NULL,
   -- CONSTRAINT fk_position FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE SET NULL,
   department_id INTEGER NOT NULL,
   -- CONSTRAINT fk_department2 FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
   );


DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL);

CREATE TABLE positions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    position VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    isManager BOOLEAN,
-- maybe some constraint or foreign key stuff here?
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    position_id INTEGER,
   CONSTRAINT fk_position FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE SET NULL);


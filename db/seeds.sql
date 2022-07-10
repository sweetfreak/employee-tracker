  INSERT INTO departments (dept_name)
VALUES
    ('Executive'),
    ('Marketing'),
    ('Accounting');

  INSERT INTO positions (position, isManager, salary, department_id)
VALUES
    ("CEO", 1, 100000.00, 1),
    ("Marketing Manager", 1, 75000.00, 2),
    ("Marketing Assistant", 0, 50000.00, 2),
    ("Accounting Manager", 1, 75000.00, 3),
    ("Acccounting Assistant", 0, 50000.00, 3);

  INSERT INTO employees (first_name, last_name, position_id)
VALUES
    ("Jane", "Doe", 1),
    ("Frank", "Lin", 2),
    ("Michael", "Michaelson", 3),
    ("Tina", "Greene", 4),
    ("Johnny", "Jacobs", 5);
    
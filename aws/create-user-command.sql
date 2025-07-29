CREATE USER 'dbapp'@'%' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON tuwiter.* to 'dbapp'@'%';
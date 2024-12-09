const queries = {
    getUsers: "SELECT * FROM user",
    getUserById: "SELECT * FROM user WHERE id = $1",
    checkUser: "SELECT * FROM user WHERE name = $1", 
    addUser: "INSERT INTO user (name, number, email, CPF, status) VALUES ($1, $2, $3, $4, $5)",
    deleteUser: "DELETE FROM user WHERE id = $1",
    updateUser: "UPDATE user SET name = $1, number = $2, email = $3, CPF = $4, status = $5 WHERE id = $6"
};

export default queries;
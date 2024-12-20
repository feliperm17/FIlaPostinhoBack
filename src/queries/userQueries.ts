const userQueries = {
    getUsers: "SELECT * FROM Account",
    getUserByEmail: "SELECT * FROM Account WHERE email = $1",
    checkEmail: "SELECT * FROM Account WHERE email = $1",
    getUserById: "SELECT * FROM Account WHERE account_id = $1",
    checkUser: "SELECT * FROM Account WHERE username = $1", 
    addUser: "INSERT INTO Account (username, phone_nr, email, cpf, account_st, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    deleteUser: "DELETE FROM Account WHERE account_id = $1",
    updateUser: "UPDATE Account SET username = $1, phone_nr = $2, email = $3, cpf = $4, account_st = $5 WHERE account_id = $6 RETURNING *"
};

export default userQueries;
const queries = {
    getUsers: "SELECT * FROM user",
    getUserById: "SELECT * FROM user WHERE user_id = $1",
    checkUser: "SELECT * FROM user WHERE username = $1", 
    addUser: "INSERT INTO user (username, phone_nr, email, cpf, user_st) VALUES ($1, $2, $3, $4, $5)",
    deleteUser: "DELETE FROM user WHERE user_id = $1",
    updateUser: "UPDATE user SET username = $1, phone_nr = $2, email = $3, cpf = $4, user_st = $5 WHERE user_id = $6"
};

export default queries;
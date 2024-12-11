const queries = {
    getUsers: "SELECT * FROM User",
    getUserById: "SELECT * FROM User WHERE user_id = $1",
    checkUser: "SELECT * FROM User WHERE username = $1", 
    addUser: "INSERT INTO User (username, phone_nr, email, cpf, user_st) VALUES ($1, $2, $3, $4, $5)",
    deleteUser: "DELETE FROM User WHERE user_id = $1",
    updateUser: "UPDATE User SET username = $1, phone_nr = $2, email = $3, cpf = $4, user_st = $5 WHERE user_id = $6"
};

export default queries;
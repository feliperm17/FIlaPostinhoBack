const authQueries = {
    createUser: `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at
    `,
    getUserByEmail: `
        SELECT *
        FROM users
        WHERE email = $1
    `,
    getUserById: `
        SELECT id, name, email, created_at
        FROM users
        WHERE id = $1
    `
};

export default authQueries; 
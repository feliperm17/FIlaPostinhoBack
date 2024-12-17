const queueQueries = {
    getQueues: "SELECT * FROM Queue",
    getQueuesById: "SELECT * FROM Queue WHERE queue_id = $1",
    //checkUser: "SELECT * FROM Queue WHERE username = $1", 
    addQueue: "INSERT INTO Queue (queue_id, specialty, queue_dt, position_nr, queue_size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    deleteQueue: "DELETE FROM Queue WHERE queue_id = $1",
    updateQueue: "UPDATE Account SET queue_size = $1, position_nr = $2 WHERE queue_id = $3 RETURNING *"
};

export default queueQueries;


const queueQueries = {
    getQueues: "SELECT * FROM Queue",
    getQueueById: "SELECT * FROM Queue WHERE queue_id = $1", 
    addQueue: "INSERT INTO Queue (specialty, queue_dt, position_nr, queue_size) VALUES ($1, $2, $3, $4) RETURNING *",
    deleteQueue: "DELETE FROM Queue WHERE queue_id = $1",
    updateQueue: "UPDATE Account SET queue_size = $1, position_nr = $2 WHERE queue_id = $3 RETURNING *"
};

export default queueQueries;


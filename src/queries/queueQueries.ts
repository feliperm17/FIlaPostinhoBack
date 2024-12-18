const queueQueries = {
    getQueues: "SELECT q.*, s.specialty_name FROM Queue q INNER JOIN Specialty s ON q.specialty = s.specialty_id",
    getQueueById: "SELECT q.*, s.specialty_name FROM Queue q INNER JOIN Specialty s ON q.specialty = s.specialty_id WHERE queue_id = $1",
    addQueue: "INSERT INTO Queue (specialty, queue_dt, position_nr, queue_size) VALUES ($1, $2, $3, $4) RETURNING *",
    deleteQueue: "DELETE FROM Queue WHERE queue_id = $1",
    updateQueue: "UPDATE Queue SET queue_size = $1, position_nr = $2, specialty = $3 WHERE queue_id = $4 RETURNING *",
    getQueueBySpecialty: "SELECT * FROM Queue WHERE specialty = $1 AND queue_dt::date = CURRENT_DATE",
    getQueueSize: "SELECT COUNT(*) as total FROM QueueItem WHERE queue_id = $1",
    getUserPosition: "SELECT position FROM QueueItem WHERE queue_id = $1 AND account_id = $2"
};

export default queueQueries;


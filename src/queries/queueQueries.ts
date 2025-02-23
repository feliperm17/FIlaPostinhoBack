const queueQueries = {
  getQueues: "SELECT q.*, s.specialty_name FROM Queue q INNER JOIN Specialty s ON q.specialty = s.specialty_id",
  getQueueById: "SELECT q.*, s.specialty_name FROM Queue q INNER JOIN Specialty s ON q.specialty = s.specialty_id WHERE queue_id = $1",
  addQueue: "INSERT INTO Queue (specialty, queue_dt, position_nr, queue_size) VALUES ($1, $2, $3, $4) RETURNING *",
  deleteQueue: "DELETE FROM Queue WHERE queue_id = $1",
  updateQueue: "UPDATE Queue SET queue_size = $1, position_nr = $2, specialty = $3 WHERE queue_id = $4 RETURNING *",
  getQueueBySpecialty: "SELECT * FROM Queue WHERE specialty = $1 AND queue_dt::date = CURRENT_DATE",
  getQueueSize: "SELECT queue_size FROM Queue WHERE queue_id = $1",
  getNextItem: "SELECT * FROM QueueItem WHERE queue_id = $1 AND item_st = 0 ORDER BY entry_time ASC LIMIT 1",
  updateItem: `UPDATE QueueItem SET item_st = $1 WHERE queue_id = $2 AND account_id = $3`,
  joinQueue: `
  INSERT INTO QueueItem (queue_id, account_id, entry_time, item_st, item_pr)
  VALUES ($1, $2, NOW(), 0, 0)
  RETURNING *
  `, 
  checkUserInQueue: `
  SELECT * FROM QueueItem 
  WHERE queue_id = $1 AND account_id = $2
  AND item_st IN (0, 1)
  `, 
  getUsersInQueue: `
  SELECT * FROM QueueItem 
  WHERE queue_id = $1
  AND item_st IN (0, 1)
  `,
  getAllUsersInQueue: `SELECT * FROM QueueItem WHERE queue_id = $1`,
  getCurrentPosition: `
  SELECT COUNT(*) + 1 AS position
  FROM QueueItem
  WHERE queue_id = $1 
  AND entry_time < (SELECT entry_time FROM QueueItem WHERE queue_id = $1 AND account_id = $2)
  AND item_st = 0
  `,
  getQueueUsers: `
  SELECT 
    a.account_id,
    a.username,
    qi.entry_time,
    qi.item_st
  FROM QueueItem qi
  INNER JOIN Account a ON qi.account_id = a.account_id
  WHERE 
    qi.queue_id = $1 AND
    qi.item_st IN (0, 1)
  ORDER BY qi.entry_time ASC
  `,
  advanceQueue: `
  WITH finish_current AS (
    UPDATE QueueItem
    SET item_st = 2
    WHERE 
      queue_id = $1 AND 
      item_st = 1
    RETURNING *
  ),
  next_in_queue AS (
    SELECT account_id
    FROM QueueItem
    WHERE 
      queue_id = $1 AND 
      item_st = 0
    ORDER BY entry_time ASC
    LIMIT 1
  )
  UPDATE QueueItem
  SET item_st = 1
  WHERE 
    queue_id = $1 AND 
    account_id = (SELECT account_id FROM next_in_queue)
  RETURNING *
  `,
  getFullQueue: `
  SELECT 
    a.account_id,
    a.username,
    qi.entry_time,
    qi.item_st
  FROM QueueItem qi
  INNER JOIN Account a ON qi.account_id = a.account_id
  WHERE qi.queue_id = $1
  ORDER BY qi.entry_time ASC
`
};

export default queueQueries;

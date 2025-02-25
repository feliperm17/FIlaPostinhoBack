import { QueueItemStatus } from "../enums/ItemStatus";

interface QueueItemInterface {
  queue_id: number;
  account_id: number;
  item_pr: number;
  entry_time: Date;
  item_st: QueueItemStatus;
}

interface FullQueueItemInterface {
  queue_id: number;
  specialty_id: number;
  specialty_name: string;
  entry_time: Date;
  item_st: QueueItemStatus;
  estimated_time_per_user: number;
}

export { QueueItemInterface, FullQueueItemInterface };
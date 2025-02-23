import { QueueItemStatus } from "../enums/ItemStatus";

export interface QueueItemInterface {
  queue_id: number;
  account_id: number;
  item_pr: number;
  position: number;
  item_st: QueueItemStatus;
}
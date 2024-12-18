import { UserService } from './UserService';
import { SpecialtyService } from './SpecialtyService';
import { QueueService } from './QueueService';

export const queueService = new QueueService();
export const userService = new UserService();
export const specialtyService = new SpecialtyService();
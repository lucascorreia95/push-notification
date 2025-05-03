export interface QueueConsumerInterface {
  handleMessage(data: any): Promise<void> | void;
  getQueueName(): string;
}

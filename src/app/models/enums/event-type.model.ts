export enum EventType {
  TOPIC = 'TOPIC',
  COMMIT = 'COMMIT',
  REQUEST = 'REQUEST',
  APPROVED = 'APPROVED',
  SOLVED = 'SOLVED',
  PARTIAL = 'PARTIAL'
}

export const eventTypeArray = [
  EventType.REQUEST,
  EventType.APPROVED,
  EventType.COMMIT,
  EventType.TOPIC,
  EventType.SOLVED,
  EventType.PARTIAL
];
export const eventTypeWithoutRequestArray = [
  EventType.APPROVED,
  EventType.COMMIT,
  EventType.TOPIC,
  EventType.SOLVED,
  EventType.PARTIAL
];

export const eventTypeForFreelancer = [
  EventType.COMMIT,
  EventType.TOPIC
];

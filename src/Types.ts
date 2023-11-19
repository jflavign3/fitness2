export type User = {
  id: number;
  name: string;
};

export type Stat = {
  exerciseId: string;
  userId: number;
  lastUpdateDate: Date;
  lbs:number;
  totalCompletions:number;
  totalReps: number;
  totalSeconds: number;
};
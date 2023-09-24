export type AlarmClockDTO = {
  id: string;
  name: string;
  time: Date | undefined;
  days: string[];
  active: boolean;
};

export type ModuleDTO = {
  id: string;
  name: string;
  category:
    | 'Room'
    | 'Kitchen'
    | 'Bell'
    | 'ExternalArea'
    | 'Toilet'
    | 'LivingRoom'
    | 'Garden';
  batteryLevel: number;
  active: boolean;
};

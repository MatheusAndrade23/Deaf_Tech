export type ModuleDTO = {
  id: string;
  name: string;
  category: Category;
  batteryLevel: number;
  active: boolean;
};

export type Category =
  | 'Room'
  | 'Kitchen'
  | 'Bell'
  | 'ExternalArea'
  | 'Toilet'
  | 'LivingRoom'
  | 'Garden';

export type ModuleDTO = {
  id: string;
  name: string;
  category: Category;
  batteryLevel: number;
  active: boolean;
  type: ModuleType;
  sensibility: ModuleSensibility;
  image: string;
};

export type Category =
  | 'Room'
  | 'Kitchen'
  | 'Bell'
  | 'ExternalArea'
  | 'Toilet'
  | 'LivingRoom'
  | 'Garden';

export type ModuleType = 'Wired' | 'Wireless';

export type ModuleSensibility = 'High' | 'Medium' | 'Low';

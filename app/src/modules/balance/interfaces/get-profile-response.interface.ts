export interface GetProfileResponseInterface {
  code: number;
  data: Data;
}

export interface Data {
  id: string;
  login: string;
  role: string;
  advertiser_tz: any;
  balance: number;
  emailConfirmed: boolean;
  isBetaTester: boolean;
  isAdminLoggedAsUser: boolean;
  payAllowed: boolean;
  email: string;
  skype: string;
  messenger: string;
  personalAccount: number;
  firstName: string;
  secondName: string;
  country: string;
  city: string;
  address: string;
  vatNumber: string;
  useVat: string;
  referrerPercent: string;
  oldPassword: any;
  newPassword: any;
  newPassword2: any;
  notificationSettings: NotificationSetting[];
  roundPrecision: string;
  moneyPrecision: string;
  manager: Manager[];
  currency: string;
  langs: Langs;
}

export interface NotificationSetting {
  id: number;
  name: string;
  enabled: boolean;
}

export interface Manager {
  userId: any;
  name: string;
  email: string;
  skype: string;
  telegram: string;
}

export interface Langs {
  list: string[];
  key: string;
}

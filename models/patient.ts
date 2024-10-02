import { UsState, InsurancePayer } from './enums';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  state: UsState;
  insurance: InsurancePayer;
  createdAt: Date;
  updatedAt: Date;
}

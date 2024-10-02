import { Appointment, SimplifiedAppointment } from './appointment';
import { SimplifiedSlot } from './slots';
import { ClinicianType, UsState, InsurancePayer } from './enums';

export interface Clinician {
  id: string;
  firstName: string;
  lastName: string;
  states: UsState[];
  insurances: InsurancePayer[];
  clinicianType: ClinicianType;
  appointments: SimplifiedAppointment[];
  availableSlots: SimplifiedSlot[];
  maxDailyAppointments: number;
  maxWeeklyAppointments: number;
  createdAt: Date;
  updatedAt: Date;
}

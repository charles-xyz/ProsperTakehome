import { Patient } from './patient';
import { Clinician } from './clinician';
import { AppointmentType, AppointmentStatus } from './enums';

export interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  clinicianId: string;
  clinician: Clinician;
  scheduledFor: Date;
  appointmentType: AppointmentType;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface SimplifiedAppointment {
  scheduledFor: string,
  status: AppointmentStatus
}

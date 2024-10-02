import { calculateMaxedOutPeriods } from '../helpers/calcMaxedOutPeriods';

import { Clinician } from '../models/clinician';
import { AppointmentStatus, ClinicianType } from '../models/enums';
import { MaxedOutPeriods } from '../models/maxedOutPeriods';


describe('calcMaxedOutPeriods', () => {
    it('should correctly calculate maxed out periods for a clinician', () => {
      // Create a sample clinician with appointments
      const sampleClinician: Clinician = {
        id: 'clinician-1',
        firstName: 'John',
        lastName: 'Doe',
        states: [],
        insurances: [],
        clinicianType: ClinicianType.PSYCHOLOGIST,
        appointments: [
                { scheduledFor: '2024-10-01T10:00:00.000Z', status: AppointmentStatus.UPCOMING },
                { scheduledFor: '2024-10-01T11:00:00.000Z', status: AppointmentStatus.UPCOMING },
                { scheduledFor: '2024-10-01T12:00:00.000Z', status: AppointmentStatus.UPCOMING }, // Max daily reached for 2024-10-01
                { scheduledFor: '2024-10-02T10:00:00.000Z', status: AppointmentStatus.UPCOMING },
                { scheduledFor: '2024-10-02T11:00:00.000Z', status: AppointmentStatus.UPCOMING },
                { scheduledFor: '2024-10-03T12:00:00.000Z', status: AppointmentStatus.UPCOMING },
                { scheduledFor: '2024-10-03T10:00:00.000Z', status: AppointmentStatus.UPCOMING },
                { scheduledFor: '2024-10-04T11:00:00.000Z', status: AppointmentStatus.UPCOMING }, // Max weekly reached after this appointment
        ],
        availableSlots: [],
        maxDailyAppointments: 3,
        maxWeeklyAppointments: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      const clinicians: Clinician[] = [sampleClinician];
  
      // Call the function to calculate maxed out periods
      const result: MaxedOutPeriods = calculateMaxedOutPeriods(clinicians);
  
      // Define the expected output
      const expectedMaxedOutDays = new Set<string>(['clinician-1-2024-10-01']);
      const expectedMaxedOutWeeks = new Set<string>(['clinician-1-40']); // Week number 40 for 2024
  
      // Assertions
      expect(result.maxedOutDays).toEqual(expectedMaxedOutDays);
      expect(result.maxedOutWeeks).toEqual(expectedMaxedOutWeeks);
    });
  });
import { getAssessmentSlots } from '../services/schedulingService';
import { Clinician } from '../models/clinician';
import { Patient } from '../models/patient';
import { ClinicianType, InsurancePayer, UsState } from '../models/enums';
import { SlotPair } from '../models/slots';
import mockSlots from '../slots.json'
import { findValidSlotPairs } from '../helpers/findValidSlotPairs';



describe('getAssessmentSlots', () => {
  const availableSlots = [
    { length: 90, date: "2024-08-19T12:00:00.000Z" },
    { length: 90, date: "2024-08-19T12:15:00.000Z" },
    { length: 90, date: "2024-08-21T12:00:00.000Z" },
    { length: 90, date: "2024-08-21T15:00:00.000Z" },
    { length: 90, date: "2024-08-22T15:00:00.000Z" },
    { length: 90, date: "2024-08-28T12:15:00.000Z" }
  ];

  const clinician: Clinician = {
    id: "9c516382-c5b2-4677-a7ac-4e100fa35bdd",
    firstName: "Jane",
    lastName: "Doe",
    states: [UsState.NY, UsState.CA],
    insurances: [InsurancePayer.AETNA, InsurancePayer.CIGNA],
    clinicianType: ClinicianType.PSYCHOLOGIST,
    appointments: [],
    availableSlots: availableSlots,
    maxDailyAppointments: 2,
    maxWeeklyAppointments: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const patient: Patient = {
    id: "some-uuidv4",
    firstName: "Byrne",
    lastName: "Hollander",
    state: UsState.NY,
    insurance: InsurancePayer.AETNA,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it('should return valid slot pairs for eligible clinicians', () => {
    const clinicians = [clinician];
    const slotPairs: SlotPair[] = findValidSlotPairs([clinician]);

    // Expected slot pairs based on the available slots and constraints
    const expectedSlotPairs: SlotPair[] = [
      { slot1: new Date("2024-08-19T12:00:00.000Z"), slot2: new Date("2024-08-21T12:00:00.000Z") },
      { slot1: new Date("2024-08-19T12:00:00.000Z"), slot2: new Date("2024-08-21T15:00:00.000Z") },
      { slot1: new Date("2024-08-19T12:00:00.000Z"), slot2: new Date("2024-08-22T15:00:00.000Z") },
      { slot1: new Date("2024-08-19T12:15:00.000Z"), slot2: new Date("2024-08-21T12:00:00.000Z") },
      { slot1: new Date("2024-08-19T12:15:00.000Z"), slot2: new Date("2024-08-21T15:00:00.000Z") },
      { slot1: new Date("2024-08-19T12:15:00.000Z"), slot2: new Date("2024-08-22T15:00:00.000Z") },
      { slot1: new Date("2024-08-21T12:00:00.000Z"), slot2: new Date("2024-08-22T15:00:00.000Z") },
      { slot1: new Date("2024-08-21T12:00:00.000Z"), slot2: new Date("2024-08-28T12:15:00.000Z") },
      { slot1: new Date("2024-08-21T15:00:00.000Z"), slot2: new Date("2024-08-22T15:00:00.000Z") },
      { slot1: new Date("2024-08-21T15:00:00.000Z"), slot2: new Date("2024-08-28T12:15:00.000Z") },
      { slot1: new Date("2024-08-22T15:00:00.000Z"), slot2: new Date("2024-08-28T12:15:00.000Z") }
    ];

    slotPairs.sort((a, b) => new Date(a.slot1).getTime() - new Date(b.slot1).getTime());

    expect(slotPairs).toEqual(expectedSlotPairs);
  });

  it('should return an empty array if no eligible clinicians are found', () => {
    // No eligible clinician (e.g., wrong state or insurance)
    const noEligibleClinicians: Clinician[] = [];
    const slotPairs: SlotPair[] = getAssessmentSlots(patient, noEligibleClinicians);
    expect(slotPairs).toEqual([]);
  });

  it('should return an empty array if no valid slot pairs are available', () => {
    // Create a clinician with no available slots
    const clinicianWithNoSlots: Clinician = {
      ...clinician,
      availableSlots: []
    };
    const slotPairs: SlotPair[] = getAssessmentSlots(patient, [clinicianWithNoSlots]);
    expect(slotPairs).toEqual([]);
  });

  it('should run getAssessmentSlots < 0.5 seconds with the larger mock data set', () => {
    // Set available slots to mockSlots
    clinician.availableSlots = mockSlots;

    // Measure the time taken to run the getAssessmentSlots function
    const startTime = Date.now();
    const slotPairs: SlotPair[] = findValidSlotPairs([clinician]);
    const endTime = Date.now();

    const duration = (endTime - startTime) / 1000; // convert to seconds

    console.log(`getAssessmentSlots executed in: ${duration} seconds`);

    expect(duration).toBeLessThanOrEqual(0.5);
  });
});

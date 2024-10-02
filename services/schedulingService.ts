import { Patient } from '../models/patient';
import { Clinician } from '../models/clinician';
import { ClinicianType } from '../models/enums';
import { SlotPair } from '../models/slots';

import { optimizeSlots } from '../helpers/optimizeSlots';
import { findValidSlotPairs } from '../helpers/findValidSlotPairs';
import { filterMaxedOutPeriods } from '../helpers/filterMaxedOutPeriods';
import { calculateMaxedOutPeriods } from '../helpers/calcMaxedOutPeriods';

export function getAssessmentSlots(
  patient: Patient, // The patient
  clinicians: Clinician[], // The available clinicians
): SlotPair[] {
  
  // Filter for Clinicians who are Psychologists, serve the patient's state, and are in the patient's provider's network. 
  // This could be optimized using anaonymized sets serverside or by tuning the query using indexes in the DB
  const eligibleClinicians = clinicians.filter(
    clinician =>
      clinician.clinicianType == ClinicianType.PSYCHOLOGIST &&
      clinician.states.includes(patient.state) &&
      clinician.insurances.includes(patient.insurance)
  );


  const maxedOutTimes = calculateMaxedOutPeriods(eligibleClinicians)

  for (const clinician of eligibleClinicians) {
    clinician.availableSlots = optimizeSlots(clinician.availableSlots)
  }

  filterMaxedOutPeriods(eligibleClinicians, maxedOutTimes)

  // Using a sliding window to retrieve the correct slot combos
  const validSlotPairs = findValidSlotPairs(eligibleClinicians);


  return validSlotPairs;
}

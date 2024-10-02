import { Clinician } from "../models/clinician";
import { SlotPair } from "../models/slots";


export function findValidSlotPairs(clinicians: Clinician[]): SlotPair[] {
  const resultPairs: SlotPair[] = [];
  
  for (const clinician of clinicians) {
    const parsedSlots = clinician.availableSlots;
    let left = 0;

    for (let right = 0; right < parsedSlots.length; right++) {
      const currentSlot = parsedSlots[right];
      const currentDate = new Date(currentSlot.date);

      while (
        left < right &&
        (currentDate.getTime() - new Date(parsedSlots[left].date).getTime()) / (1000 * 60 * 60 * 24) > 8
      ) {
        left++;
      }

      for (let i = left; i < right; i++) {
        const bufferedSlot = parsedSlots[i];
        const bufferedDate = new Date(bufferedSlot.date);

        if (bufferedDate.toDateString() !== currentDate.toDateString()) {
          resultPairs.push({
            slot1: bufferedDate,
            slot2: currentDate,
          });
        }
      }
    }
  }

  return resultPairs;
}
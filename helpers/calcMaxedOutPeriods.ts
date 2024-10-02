import { Clinician } from '../models/clinician';
import { getWeekNumber } from './getWeekNumber';
import { MaxedOutPeriods } from '../models/maxedOutPeriods';



export function calculateMaxedOutPeriods(clinicians: Clinician[]): MaxedOutPeriods {
  const maxedOutWeeks: Set<string> = new Set()
  const maxedOutDays: Set<string> = new Set()

  for (const clinician of clinicians) {
    const { appointments, maxDailyAppointments, maxWeeklyAppointments} = clinician
    const weeklyAppointments: Map<number, number> = new Map()
    const dailyAppointments: Map<string, number> = new Map()

    //check if appointment is valid to count toward max
    for (const appointment of appointments) {
      if (['OCCURRED', ''].includes(appointment.status)) {
        const appointmentDate = new Date(appointment.scheduledFor)
        const weekNumber = getWeekNumber(appointmentDate)
        const dateString = appointmentDate.toISOString().split('T')[0]; //split before time and take only the date

        // increment weekly appointment count + check if maxed
        const weekCount = (weeklyAppointments.get(weekNumber) || 0) + 1
        weeklyAppointments.set(weekNumber, weekCount)
        if (weekCount === maxWeeklyAppointments) {
          maxedOutWeeks.add(`${clinician.id}-${weekNumber}`);
        }

        //increment daily count + check if maxed
        const dayCount = (dailyAppointments.get(dateString) || 0) + 1;
        dailyAppointments.set(dateString, dayCount);
        if (dayCount === maxDailyAppointments) {
          maxedOutDays.add(`${clinician.id}-${dateString}`);
        }
      }
    }
  }

  return { maxedOutWeeks, maxedOutDays }
}
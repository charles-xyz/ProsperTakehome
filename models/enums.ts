export enum ClinicianType {
    THERAPIST = 'THERAPIST',
    PSYCHOLOGIST = 'PSYCHOLOGIST',
  }
  
export enum UsState {
    NY = 'NY',
    NC = 'NC',
    FL = 'FL',
    CA = 'CA'
  }
  
export enum InsurancePayer {
    AETNA = 'AETNA',
    BCBS = 'BCBS',
    CIGNA = 'CIGNA',
  }

export enum AppointmentType {
    ASSESSMENT_SESSION_1 = 'ASSESSMENT_SESSION_1',
    ASSESSMENT_SESSION_2 = 'ASSESSMENT_SESSION_2',
    THERAPY_INTAKE = 'THERAPY_INTAKE',
    THERAPY_SIXTY_MINS = 'THERAPY_SIXTY_MINS',
  }
  
export enum AppointmentStatus {
    UPCOMING = 'UPCOMING',
    OCCURRED = 'OCCURRED',
    NO_SHOW = 'NO_SHOW',
    RE_SCHEDULED = 'RE_SCHEDULED',
    CANCELLED = 'CANCELLED',
    LATE_CANCELLATION = 'LATE_CANCELLATION',
    NONE = 'NONE'
  }
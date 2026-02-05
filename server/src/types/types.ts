export interface ProgramData {
  dataName: string;
  dataValue: number;
}

export interface Program {
  programName: string;
  programData: ProgramData[];
}

export interface DashboardData {
  title: string;
  programs: Program[];
}

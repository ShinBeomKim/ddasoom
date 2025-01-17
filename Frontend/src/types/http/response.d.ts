// api - Response DTO

// 캘린더 월별 조회
export interface Calendars {
  date: string;
  trainingCount: number;
  panicStatus: boolean;
  dailyStatus: boolean;
}

export interface MonthlyData {
  calendars: Calendars[];
}

// 캘린더 일별 조회(기록 상세)
export interface PanicRecord {
  startDate: string; // 발작 시간
  duration: number; // 경과 시간 (초 단위)
  latitude: number | null; // 위도
  longitude: number | null; // 경도
  address: string | null; // 완성된 주소
  description: string | null; // 당시 상황 일기
}

export interface TrainingRecord {
  training: string[];
}

export interface DailyRecord {
  alcohol: boolean;
  caffeine: boolean;
  smoking: boolean;
  exercise: boolean;
  description: string | null;
}

export interface DailyData {
  panicRecord: PanicRecord[];
  trainingRecord: string[];
  dailyRecord: DailyRecord | null;
}

// 월별 리포트 조회
export interface PanicReport {
  panicCount: number;
  panicDurationAverage: number;
  panicOccurDay: number[];
}

export interface DailyReport {
  caffeine: number;
  smoking: number;
  alcohol: number;
  exercise: number;
}

export interface SelfDiagnosis {
  progressCount: number;
  totalPanicDoubtCount: number;
}

export interface ReportData {
  totalRecordCount: number;
  panicReport: PanicReport | null;
  dailyReport: DailyReport | null;
  selfDiagnosis: SelfDiagnosis;
  continuousTrainingCount: number;
}

// 비상 연락처 목록 조회
export interface PhoneListData {
  PhoneBookId: number;
  PhoneNumber: string;
  alias: string;
}

// 목소리 내역 조회
export interface AiVoiceData {
  voiceName: string;
  voiceKey: string;
}

// 오늘 완료한 훈련 기록 조회
export interface ICompletedTraining {
  breath: boolean;
  grounding: boolean;
  comedown: boolean;
}

// 메인 화면 조회
export interface ICharacterData {
  name: string;
  continuousTrainingDays: number;
  experience: number;
  level: number;
  experiencePercent: number;
  strokeCount: number;
  hugCount: number;
  playCount: number;
}

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
  subItems?: TocItem[];
}

export interface SimulationResult {
  year: number;
  earlyCrashNetWorth: number; // 序盤に暴落
  lateCrashNetWorth: number;  // 終盤に暴落
  steadyNetWorth: number;     // 安定推移
  annualWithdrawal: number;
}

interface ProfileMetrics {
  careerPoints: number;
  resumeWeightage: number;
  applicationsCount: number;
  dailyStreak: number;
}

export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export function calculateSkillTier(metrics: ProfileMetrics): { tier: Tier; rank: number; color: string } {
  // Score is a weighted combination of performance metrics
  const score = (metrics.careerPoints * 0.4) + 
                (metrics.resumeWeightage * 10) + 
                (metrics.applicationsCount * 50) + 
                (metrics.dailyStreak * 100);

  if (score < 5000) return { tier: 'Bronze', rank: 4 - Math.floor(score / 1250), color: 'text-orange-400' };
  if (score < 15000) return { tier: 'Silver', rank: 4 - Math.floor((score - 5000) / 2500), color: 'text-slate-300' };
  if (score < 30000) return { tier: 'Gold', rank: 4 - Math.floor((score - 15000) / 3750), color: 'text-amber-400' };
  if (score < 60000) return { tier: 'Platinum', rank: 4 - Math.floor((score - 30000) / 7500), color: 'text-emerald-400' };
  return { tier: 'Diamond', rank: 4 - Math.floor((score - 60000) / 10000), color: 'text-blue-400' };
}

export function formatRank(tier: Tier, rank: number): string {
    const roman = ['I', 'II', 'III', 'IV'];
    return `${tier} ${roman[Math.max(0, Math.min(3, rank))]}`;
}

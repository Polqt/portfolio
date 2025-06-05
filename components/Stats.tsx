import CountUp from 'react-countup';

const stats = [
  { label: 'Years Coding', value: 2, suffix: '+' },
  { label: 'Projects Built', value: 8, suffix: '+' },
  { label: 'Certifications', value: 3, suffix: '+' },
  { label: 'Learning', value: '∞', isCustom: true },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
        >
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stat.isCustom ? (
              stat.value
            ) : (
              <CountUp
                end={typeof stat.value === 'number' ? stat.value : 0}
                suffix={stat.suffix}
                duration={2}
              />
            )}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

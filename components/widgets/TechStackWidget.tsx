import { skillCategories } from '@/data/site';

export default function TechStackWidget() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {skillCategories.map(({ category, skills }) => (
        <div
          key={category}
          className="grid grid-cols-1 gap-1.5 sm:grid-cols-[110px_1fr] sm:gap-4"
        >
          <span className="plaque pt-0.5">{category}</span>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {skills.map(skill => (
              <span key={skill} className="text-[13px] text-foreground/85">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

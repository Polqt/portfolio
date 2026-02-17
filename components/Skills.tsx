import { IconCloud } from '@/components/magicui/icon-cloud';
import { skillCategories, techSlugs } from '@/data/site';
import { TYPE_COLORS } from '@/data/site';

export default function Skills() {
  const images = techSlugs.map(
    slug => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">
                  {category.category}
                </h4>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-medium">
                  {category.type}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 ${TYPE_COLORS[category.type] || 'bg-muted text-muted-foreground border-border'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <IconCloud images={images} />
          </div>
        </div>
      </div>
    </div>
  );
}

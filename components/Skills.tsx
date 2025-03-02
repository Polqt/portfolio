export default function Skills() {

  const skills = [
    {
      name: 'Full-Stack Web Development',
      icon: '💻',
    },
    {
      name: 'Data Engineering & Problem-Solving',
      icon: '🧩',
    },
    {
      name: 'Competitive Programming & Hackathons',
      icon: '🏆',
    },
  ];

  return (
    <>
      <ul className="mt-2 flex flex-col gap-2">
        {skills.map((skill, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className=''>{skill.icon}</span>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

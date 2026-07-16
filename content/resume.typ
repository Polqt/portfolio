#let experiences = json("/data/experiences.json")
#let education = json("/data/education.json")
#let certifications = json("/data/certifications.json")
#let skills = json("/data/skills.json").categories

#set page(paper: "a4", margin: (x: 1.65cm, y: 1.35cm), fill: rgb("#f7f7f3"))
#set text(font: "Arial", size: 8.5pt, fill: rgb("#171715"))
#set par(leading: 0.5em, justify: true)
#set list(indent: 1em, body-indent: 0.5em, spacing: 0.25em)
#show link: set text(fill: rgb("#2454d7"))

#let section(title) = {
  v(0.85em)
  text(size: 10pt, weight: "bold", tracking: 0.08em, upper(title))
  v(0.25em)
  line(length: 100%, stroke: 0.5pt + rgb("#aaa9a3"))
  v(0.45em)
}

#let role(title, organization, place, period, description, achievements) = {
  grid(
    columns: (1fr, auto),
    column-gutter: 1em,
    [#text(weight: "bold")[#title] #text(fill: rgb("#5c5b57"))[at #organization]],
    [#text(size: 8pt)[#period]],
  )
  text(size: 8pt, fill: rgb("#5c5b57"))[#place]
  v(0.2em)
  description
  if achievements.len() > 0 { list(..achievements.map(item => [#item])) }
  v(0.45em)
}

#align(center)[
  #text(size: 20pt, weight: "bold")[Janpol Hidalgo]
  #v(0.25em)
  #text(size: 9.5pt, fill: rgb("#5c5b57"))[Software Engineer · Sagay City, Philippines]
  #v(0.3em)
  #link("mailto:janpolhidalgo@gmail.com")[#text("janpolhidalgo@gmail.com")]
  #h(0.75em) / #h(0.75em)
  #link("https://github.com/Polqt")[github.com/Polqt]
  #h(0.75em) / #h(0.75em)
  #link("https://www.linkedin.com/in/janpol-hidalgo-64174a241/")[LinkedIn]
]

#section("Profile")
I build durable software across backend systems, data pipelines, AI products, and modern web applications. My work is grounded in practical problem-solving, careful engineering, and continuous learning.

#section("Experience")
#for item in experiences {
  role(item.title, item.company, item.location, item.period, item.description, item.achievements)
}

#section("Education")
#for item in education {
  grid(
    columns: (1fr, auto),
    column-gutter: 1em,
    [#text(weight: "bold")[#item.degree] #text(fill: rgb("#5c5b57"))[at #item.institution]],
    [#text(size: 8pt)[#item.period]],
  )
  text(size: 8pt, fill: rgb("#5c5b57"))[#item.location · #item.status]
  v(0.5em)
}

#section("Skills")
#for category in skills {
  grid(
    columns: (4.2cm, 1fr),
    column-gutter: 0.7em,
    [#text(weight: "bold")[#category.category]],
    [#category.skills.join("  /  ")],
  )
  v(0.32em)
}

#section("Certifications")
#for item in certifications {
  grid(
    columns: (1fr, auto),
    column-gutter: 1em,
    [#link(item.link)[#text(weight: "bold")[#item.name]] #text(fill: rgb("#5c5b57"))[· #item.issuer]],
    [#text(size: 8pt)[#item.date]],
  )
  v(0.35em)
}

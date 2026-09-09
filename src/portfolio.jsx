import { useMemo, useState } from 'react'
import profile from './data/profile.json'
import projects from './data/projects.json'
import education from './data/education.json'
import experience from './data/experience.json'
import skills from './data/skills.json'
import { buildFilterOptions, filterProjects, toContactLinks } from './utils/portfolioData'

const Portfolio = () => {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedLanguage, setSelectedLanguage] = useState('All')

  const { types: allTypes, languages: allLanguages } = useMemo(
    () => buildFilterOptions(projects),
    [],
  )

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, selectedType, selectedLanguage)
  }, [selectedType, selectedLanguage])

  const contactLinks = useMemo(() => toContactLinks(profile.contacts), [])
  const resumeStats = [
    { label: 'Projects', value: `${projects.length}` },
    { label: 'Experience', value: `${experience.length}` },
    { label: 'Education', value: `${education.length}` },
  ]

  return (
    <div className='portfolio-page'>
      <section className='hero-section'>
        <div className='container'>
          <div className='hero-grid'>
            <div className='hero-content'>
              <h1 className='hero-title'>
                {profile.name}
              </h1>
              <p className='hero-copy'>
                {profile.summary}
              </p>
              <div className='hero-details'>
                <span className='detail-pill'>{profile.location}</span>
                <span className='detail-pill'>{experience[0]?.title}</span>
              </div>
              <div className='hero-stats'>
                {resumeStats.map((stat) => (
                  <div key={stat.label} className='stat-card'>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='hero-photo'>
              <div className='hero-photo-inner'>
                <span className='hero-photo-label'>Current Focus</span>
                <strong>Infrastructure</strong>
                <p>Backend systems, deployment, and full-stack delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='projects-section'>
        <div className='container'>
          <h2 className='section-heading'>Projects</h2>

          <div className='filter-panel'>
            <div className='filter-group'>
              <label htmlFor='type-filter' className='filter-label'>Filter by Type</label>
              <select
                id='type-filter'
                className='filter-select'
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
              >
                {allTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className='filter-group'>
              <label htmlFor='language-filter' className='filter-label'>Filter by Language</label>
              <select
                id='language-filter'
                className='filter-select'
                value={selectedLanguage}
                onChange={(event) => setSelectedLanguage(event.target.value)}
              >
                {allLanguages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <div className='results-summary'>
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className='empty-state'>No projects match the selected filters.</div>
          ) : (
            <div className='project-grid'>
              {filteredProjects.map(project => (
                <article key={project.id} className='project-card'>
                  <div className='project-header'>
                    <span className='project-tag'>{project.type}</span>
                    <h3 className='project-title'>{project.name}</h3>
                  </div>

                  {project.period ? <p className='project-period'>{project.period}</p> : null}
                  <p className='project-meta'>Languages: {project.languages.join(', ')}</p>
                  <p className='project-description'>{project.description}</p>

                  {project.highlights ? (
                    <ul className='project-list'>
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className='tech-list'>
                    {project.technologies.map(tech => (
                      <span key={tech} className='tech-badge'>{tech}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='resume-section'>
        <div className='container'>
          <h2 className='section-heading'>Experience</h2>
          <div className='timeline-grid'>
            {experience.map((role) => (
              <article key={role.id} className='timeline-card'>
                <div className='timeline-header'>
                  <div>
                    <p className='timeline-company'>{role.company}</p>
                    <h3 className='timeline-title'>{role.title}</h3>
                  </div>
                  <span className='timeline-date'>
                    {role.startDate} - {role.endDate}
                  </span>
                </div>
                <p className='timeline-location'>{role.location}</p>
                <ul className='timeline-list'>
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='resume-section'>
        <div className='container'>
          <h2 className='section-heading'>Education</h2>
          <div className='education-grid'>
            {education.map((entry) => (
              <article key={entry.id} className='education-card'>
                <div className='timeline-header'>
                  <div>
                    <p className='timeline-company'>{entry.school}</p>
                    <h3 className='timeline-title'>{entry.degree}</h3>
                  </div>
                  <span className='timeline-date'>
                    {entry.startDate} - {entry.endDate}
                  </span>
                </div>
                <p className='timeline-location'>{entry.location}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='skills-section'>
        <div className='container'>
          <h2 className='section-heading'>Skills</h2>

          <div className='skills-grid'>
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className='skill-card'>
                <h3 className='skill-title'>{category}</h3>
                <div className='skill-list'>
                  {skillList.map(skill => (
                    <span key={skill} className='skill-badge'>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='contact-section'>
        <div className='container contact-container'>
          <h2 className='contact-title'>Let&apos;s connect</h2>
          <div className='contact-links'>
            {contactLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className={`contact-link ${link.colorClass}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio

export const buildFilterOptions = (projects) => {
  const types = ['All', ...new Set(projects.map((project) => project.type))]
  const languages = ['All', ...new Set(projects.flatMap((project) => project.languages ?? []))]

  return { types, languages }
}

export const filterProjects = (projects, selectedType, selectedLanguage) => {
  return projects.filter((project) => {
    const typeMatch = selectedType === 'All' || project.type === selectedType
    const languageMatch = selectedLanguage === 'All' || (project.languages ?? []).includes(selectedLanguage)

    return typeMatch && languageMatch
  })
}

export const toContactLinks = (contacts) => {
  return contacts.map((contact) => ({
    ...contact,
    colorClass: contact.label.toLowerCase(),
  }))
}

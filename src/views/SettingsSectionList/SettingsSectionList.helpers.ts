const KEY = 'open_sections';

function getOpenSectionNames(): Array<string> {
  const sectionListString = localStorage.getItem(KEY) ?? '';
  return sectionListString.split(',').filter(Boolean);
}

export function isSectionOpen(sectionName: string): boolean {
  return getOpenSectionNames().includes(sectionName);
}

export function toggleSection(sectionName: string): void {
  const openSectionList = getOpenSectionNames();
  let updatedSectionList: Array<string> = openSectionList;

  if (isSectionOpen(sectionName)) {
    updatedSectionList = openSectionList.filter(
      (openSectionName) => sectionName !== openSectionName
    );
  } else {
    updatedSectionList.push(sectionName);
  }

  localStorage.setItem(KEY, updatedSectionList.toString());
}

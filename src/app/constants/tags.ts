export const TAGS = {
  ME: 'me',
  PROJECTS: 'projects',
  ABILITIES: 'abilities',
  HOBBIES: 'hobbies',
} as const;

export const TAG_LABELS: { [key: string]: string } = {
  [TAGS.ME]: 'O mnie',
  [TAGS.PROJECTS]: 'Projekty',
  [TAGS.ABILITIES]: 'Umiejętności',
  [TAGS.HOBBIES]: 'Zainteresowania',
};

export const MAIN_PAGE_TAGS = [TAGS.ME, TAGS.PROJECTS, TAGS.ABILITIES];

export const INTERESTS_PAGE_TAGS = [TAGS.HOBBIES];

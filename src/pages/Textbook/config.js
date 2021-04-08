export const items = [
  {
    group: 0,
    item: 'Beginner',
    style: 'success',
    description: 'Начальный уровень',
  },
  {
    group: 1,
    item: 'Elementary',
    style: 'info',
    description: 'Элементарный уровень',
  },
  {
    group: 2,
    item: 'Intermediate',
    style: 'warning',
    description: 'Средний уровень',
  },
  {
    group: 3,
    item: 'Vantage',
    style: 'primary',
    description: 'Средне-продвинутый уровень',
  },
  {
    group: 4,
    item: 'Advanced',
    style: 'danger',
    description: 'Продвинутый уровень',
  },
  {
    group: 5,
    item: 'Proficiency',
    style: 'light',
    description: 'Самый высокий уровень',
  },
];

export const dictionaryItems = [
  { id: 0, item: 'Изучаемые слова', style: 'far fa-clipboard mr-2' },
  { id: 1, item: 'Сложные слова', style: 'fas fa-brain mr-2' },
  { id: 2, item: 'Удалённые слова', style: 'fas fa-trash-alt mr-2' },
];

export const gamesList = [
  {
    id: 0,
    item: 'Спринт',
    style: 'fas fa-dice-one mr-1',
    path: '/games/sprint',
  },
  { id: 1, item: 'Мемори', style: 'fas fa-dice-two mr-1', path: '/games/memory' },
  { id: 2, item: 'Саванна', style: 'fas fa-dice-three mr-1', path: '/games/savanna' },
  { id: 3, item: 'Аудиовызов', style: 'fas fa-dice-four mr-1', path: '/games/voice' },
];

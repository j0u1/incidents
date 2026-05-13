const _features = {
  auth: true, // ни к чему не привязано
  problems: true,
  users: false,
  settings: false,
  statuses: true, // от статусов зависит статистика по статусам
} as const;

export const features = {
  ..._features,
  stats: _features.statuses,
} as const;

const stemsByType = {
  bass: 'Baixo',
  drums: 'Bateria',
  other: 'Outros',
  voice: 'Vocal',
};

export const getName = (type) => stemsByType[type];

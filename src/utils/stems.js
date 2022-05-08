const stemsByType = {
  bass: 'Baixo',
  drums: 'Bateria',
  other: 'Outros',
  voice: 'Voice',
};

export const getName = (type) => stemsByType[type];

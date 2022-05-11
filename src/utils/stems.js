const stemsByType = {
  bass: 'Baixo',
  drums: 'Bateria',
  other: 'Outros',
  vocals: 'Vocal',
};

export const getName = (type) => stemsByType[type];

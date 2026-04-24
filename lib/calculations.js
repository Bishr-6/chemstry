// Utility functions for calculations

export const calculateCellVoltage = (cathodeE0, anodeE0) => {
  return (cathodeE0 - anodeE0).toFixed(2);
};

export const isSpontaneous = (cellVoltage) => {
  return parseFloat(cellVoltage) > 0;
};

export const getOctaneNumber = (carbonChainLength) => {
  // Approximate octane number based on chain length
  const baseOctane = {
    3: 19,   // propane
    4: 47,   // butane
    5: 62,   // pentane
    6: 72,   // hexane
    7: 0,    // heptane (reference, E=0)
    8: 0,    // octane (E=0 by definition)
    9: -20,  // nonane
    10: -30, // decane
  };
  return baseOctane[carbonChainLength] || 0;
};

export const getBondingPattern = (category) => {
  const patterns = {
    alkane: 'C-C (σ bond)',
    alkene: 'C=C (σ + π bond)',
    alkyne: 'C≡C (σ + 2π bonds)',
    alcohol: 'O-H hydroxyl group',
    ether: 'C-O-C ether linkage',
    amine: 'N-H amine group',
    carbonyl: 'C=O carbonyl group',
  };
  return patterns[category] || 'معلومات غير محددة';
};

export const getTrendProperties = (molarMass) => {
  return {
    boiling_point: 'يزداد مع زيادة الكتلة المولية',
    density: 'يزداد عادة مع زيادة الكتلة المولية',
    solubility_in_water: 'تنخفض مع زيادة السلسلة الكربونية',
  };
};

export const predictBoilingPoint = (carbonCount, category) => {
  // تنبؤ تقريبي لدرجة الغليان
  const baseTemps = {
    alkane: -162 + (carbonCount - 1) * 20,
    alkene: -104 + (carbonCount - 2) * 25,
    alkyne: -84 + (carbonCount - 2) * 25,
    alcohol: 65 + (carbonCount - 1) * 20,
  };
  return baseTemps[category] || null;
};

export const generateIUPACName = (carbonCount, category, substituents = []) => {
  const prefixes = {
    1: 'ميث',
    2: 'إيث',
    3: 'بروب',
    4: 'بيوت',
    5: 'بنت',
    6: 'هكس',
    7: 'هبت',
    8: 'أوكت',
    9: 'نون',
    10: 'ديك',
  };

  const suffixes = {
    alkane: 'ان',
    alkene: 'ين',
    alkyne: 'اين',
    alcohol: 'انول',
    ether: 'إيثر',
    amine: 'أمين',
  };

  const prefix = prefixes[carbonCount] || '';
  const suffix = suffixes[category] || '';

  return `${prefix}${suffix}`;
};

export const getPolymerRecyclingInfo = (code) => {
  const recyclingCodes = {
    '1': { name: 'PET', resin: 'بولي إيثيلين تيريفثالات', uses: 'زجاجات المشروبات' },
    '2': { name: 'HDPE', resin: 'بولي إيثيلين عالي الكثافة', uses: 'أكياس بلاستيكية' },
    '3': { name: 'PVC', resin: 'كلوريد البولي فينيل', uses: 'أنابيب' },
    '4': { name: 'LDPE', resin: 'بولي إيثيلين منخفض الكثافة', uses: 'أغلفة بلاستيكية' },
    '5': { name: 'PP', resin: 'بولي بروبيلين', uses: 'حاويات' },
    '6': { name: 'PS', resin: 'بوليستيرين', uses: 'صناديق بيض' },
    '7': { name: 'Other', resin: 'آخر', uses: 'مواد أخرى' },
  };
  return recyclingCodes[code] || null;
};

export const formatChemicalFormula = (formula) => {
  // تحويل الصيغة العادية إلى صيغة مع subscripts
  return formula.replace(/(\d+)/g, '₍$1₎');
};

export const calculateMolarMass = (elements) => {
  const atomicMasses = {
    H: 1.008,
    C: 12.01,
    N: 14.01,
    O: 16.00,
    S: 32.07,
    P: 30.97,
    Cl: 35.45,
    Br: 79.90,
    I: 126.90,
    F: 19.00,
  };

  let totalMass = 0;
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;

  while ((match = regex.exec(elements)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;
    totalMass += (atomicMasses[element] || 0) * count;
  }

  return totalMass.toFixed(2);
};

// Polymer polymerization reaction
export const describePolymerization = (monomerFormula, polymerizationType) => {
  if (polymerizationType === 'addition') {
    return `يتم ربط جزيئات ${monomerFormula} معاً عن طريق فتح الروابط الثنائية (C=C) لتشكيل سلسلة طويلة`;
  } else if (polymerizationType === 'condensation') {
    return `يتم ربط جزيئات ${monomerFormula} معاً مع إطلاق جزيئات صغيرة (عادة ماء) لتشكيل بوليمر`;
  }
  return 'نوع بلمرة غير معروف';
};

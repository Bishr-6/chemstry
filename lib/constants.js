// Chemical Categories
export const CATEGORIES = {
  ALKANE: { id: 'alkane', label: 'ألكان', color: '#3B82F6' },
  ALKENE: { id: 'alkene', label: 'ألكين', color: '#10B981' },
  ALKYNE: { id: 'alkyne', label: 'ألكاين', color: '#F59E0B' },
  AROMATIC: { id: 'aromatic', label: 'عطري', color: '#8B5CF6' },
  HALIDE: { id: 'halide', label: 'هاليد ألكيل', color: '#EF4444' },
  ALCOHOL: { id: 'alcohol', label: 'كحول', color: '#EC4899' },
  ETHER: { id: 'ether', label: 'إيثر', color: '#14B8A6' },
  AMINE: { id: 'amine', label: 'أمين', color: '#F97316' },
  CARBONYL: { id: 'carbonyl', label: 'كربونيل', color: '#6366F1' },
  ESTER: { id: 'ester', label: 'إستر', color: '#84CC16' },
  AMIDE: { id: 'amide', label: 'أميد', color: '#06B6D4' },
  POLYMER: { id: 'polymer', label: 'بوليمر', color: '#A855F7' },
  ELECTROCHEMISTRY: { id: 'electrochemistry', label: 'كيمياء كهربائية', color: '#FBBF24' },
};

// Functional Groups
export const FUNCTIONAL_GROUPS = {
  HYDROXYL: { id: 'hydroxyl', name: 'هيدروكسيل', formula: '-OH', category: 'ALCOHOL', bp_trend: 'عالية جداً' },
  CARBONYL: { id: 'carbonyl', name: 'كربونيل', formula: 'C=O', category: 'CARBONYL', bp_trend: 'متوسطة' },
  CARBOXYL: { id: 'carboxyl', name: 'كربوكسيل', formula: '-COOH', category: 'ACID', bp_trend: 'عالية جداً' },
  AMINO: { id: 'amino', name: 'أمينو', formula: '-NH2', category: 'AMINE', bp_trend: 'عالية' },
  ETHER_LINKAGE: { id: 'ether_linkage', name: 'رابطة إيثر', formula: '-O-', category: 'ETHER', bp_trend: 'منخفضة' },
  HALIDE_LINKAGE: { id: 'halide', name: 'هاليد', formula: '-X', category: 'HALIDE', bp_trend: 'متوسطة' },
};

// Metals for Electrochemistry
export const METALS = [
  { id: 'lithium', name: 'ليثيوم (Li)', symbol: 'Li', e0: -3.04, color: '#FFD700' },
  { id: 'potassium', name: 'بوتاسيوم (K)', symbol: 'K', e0: -2.93, color: '#FFA500' },
  { id: 'sodium', name: 'صوديوم (Na)', symbol: 'Na', e0: -2.71, color: '#FF8C00' },
  { id: 'magnesium', name: 'ماغنيسيوم (Mg)', symbol: 'Mg', e0: -2.37, color: '#FF6347' },
  { id: 'aluminum', name: 'ألومنيوم (Al)', symbol: 'Al', e0: -1.66, color: '#DC143C' },
  { id: 'zinc', name: 'خارصين (Zn)', symbol: 'Zn', e0: -0.76, color: '#C71585' },
  { id: 'iron', name: 'حديد (Fe)', symbol: 'Fe', e0: -0.44, color: '#8B008B' },
  { id: 'nickel', name: 'نيكل (Ni)', symbol: 'Ni', e0: -0.26, color: '#4B0082' },
  { id: 'tin', name: 'قصدير (Sn)', symbol: 'Sn', e0: -0.14, color: '#00008B' },
  { id: 'lead', name: 'رصاص (Pb)', symbol: 'Pb', e0: -0.13, color: '#0000CD' },
  { id: 'hydrogen', name: 'هيدروجين (H)', symbol: 'H', e0: 0.00, color: '#1E90FF' },
  { id: 'copper', name: 'نحاس (Cu)', symbol: 'Cu', e0: 0.34, color: '#87CEEB' },
  { id: 'bromine', name: 'بروم (Br)', symbol: 'Br', e0: 1.07, color: '#20B2AA' },
  { id: 'chlorine', name: 'كلور (Cl)', symbol: 'Cl', e0: 1.36, color: '#3CB371' },
  { id: 'fluorine', name: 'فلور (F)', symbol: 'F', e0: 2.87, color: '#90EE90' },
];

// Common Laboratory Salts
export const LABORATORY_SALTS = [
  { id: 'nacl', formula: 'NaCl', name: 'كلوريد الصوديوم', molten_products: ['Na', 'Cl₂'], aqueous_products: ['NaOH', 'H₂', 'Cl₂'], notes: 'كهرباء الماء المالح' },
  { id: 'kcl', formula: 'KCl', name: 'كلوريد البوتاسيوم', molten_products: ['K', 'Cl₂'], aqueous_products: ['KOH', 'H₂', 'Cl₂'] },
  { id: 'cucase', formula: 'CuSO₄', name: 'كبريتات النحاس', molten_products: ['Cu', 'O₂', 'SO₂'], aqueous_products: ['Cu', 'H₂', 'O₂'] },
];

// Polymers Database
export const POLYMERS = [
  { id: 'pvc', code: '3', name: 'كلوريد البولي فينيل (PVC)', monomer: 'كلورو إيثين', uses: 'أنابيب، أسلاك كهربائية، أرضيات' },
  { id: 'ptfe', code: 'custom', name: 'بولي تتراف لورو إيثيلين (PTFE)', monomer: 'تتراف لورو إيثيلين', uses: 'أواني طهي غير لاصقة، ختم الأنابيب' },
  { id: 'pe', code: '2', name: 'بولي إيثيلين (PE)', monomer: 'إيثيلين', uses: 'أكياس بلاستيكية، زجاجات' },
  { id: 'pp', code: '5', name: 'بولي بروبيلين (PP)', monomer: 'بروبيلين', uses: 'حاويات، سيارات' },
  { id: 'ps', code: '6', name: 'بوليستيرين (PS)', monomer: 'ستيرين', uses: 'عبوات غذائية، عزل' },
  { id: 'pet', code: '1', name: 'بولي إيثيلين تيريفثالات (PET)', monomer: 'إيثيلين تيريفثالات', uses: 'زجاجات المشروبات، ملابس' },
  { id: 'pc', code: 'custom', name: 'بولي كربونات (PC)', monomer: 'ثنائي فينول A', uses: 'نظارات واقية، أقراص مدمجة' },
];

// Common Hydrocarbons for Database
export const HYDROCARBONS = [
  // Alkanes
  { id: 'methane', iupac_name: 'ميثان', formula: 'CH₄', bp: -161, mp: -182, category: 'alkane', state_at_25: 'غاز' },
  { id: 'ethane', iupac_name: 'إيثان', formula: 'C₂H₆', bp: -89, mp: -183, category: 'alkane', state_at_25: 'غاز' },
  { id: 'propane', iupac_name: 'بروبان', formula: 'C₃H₈', bp: -42, mp: -190, category: 'alkane', state_at_25: 'غاز' },
  { id: 'butane', iupac_name: 'بيوتان', formula: 'C₄H₁₀', bp: 0, mp: -138, category: 'alkane', state_at_25: 'غاز' },
  { id: 'pentane', iupac_name: 'بنتان', formula: 'C₅H₁₂', bp: 36, mp: -130, category: 'alkane', state_at_25: 'سائل' },
  { id: 'hexane', iupac_name: 'هكسان', formula: 'C₆H₁₄', bp: 69, mp: -95, category: 'alkane', state_at_25: 'سائل' },
  { id: 'octane', iupac_name: 'أوكتان', formula: 'C₈H₁₈', bp: 126, mp: -57, category: 'alkane', state_at_25: 'سائل', octane_number: 100 },

  // Alkenes
  { id: 'ethene', iupac_name: 'إيثين', formula: 'C₂H₄', bp: -104, mp: -169, category: 'alkene', state_at_25: 'غاز', uses: 'نضج الفاكهة، مخدر، بلمرة' },
  { id: 'propene', iupac_name: 'بروبين', formula: 'C₃H₆', bp: -47, mp: -185, category: 'alkene', state_at_25: 'غاز' },
  { id: 'butene', iupac_name: 'بيوتين', formula: 'C₄H₈', bp: -6, mp: -185, category: 'alkene', state_at_25: 'غاز' },

  // Alkynes
  { id: 'ethyne', iupac_name: 'إيثاين (أسيتيلين)', formula: 'C₂H₂', bp: -84, mp: -84, category: 'alkyne', state_at_25: 'غاز', uses: 'اللحام، القطع' },
];

// Organic Compounds
export const ORGANIC_COMPOUNDS = [
  // Alcohols
  { id: 'methanol', iupac_name: 'ميثانول', formula: 'CH₃OH', bp: 65, mp: -97, category: 'alcohol', functional_group: 'hydroxyl', uses: 'محلول، وقود' },
  { id: 'ethanol', iupac_name: 'إيثانول', formula: 'C₂H₅OH', bp: 78, mp: -114, category: 'alcohol', functional_group: 'hydroxyl', uses: 'مشروب كحول، مذيب' },
  { id: 'propanol', iupac_name: '1-بروبانول', formula: 'C₃H₇OH', bp: 97, mp: -127, category: 'alcohol', functional_group: 'hydroxyl' },

  // Aldehydes
  { id: 'formaldehyde', iupac_name: 'الفورمالدهيد', formula: 'HCHO', bp: -19, mp: -92, category: 'carbonyl', functional_group: 'carbonyl', uses: 'حفظ العينات، مطهر' },
  { id: 'acetaldehyde', iupac_name: 'أسيتالدهيد', formula: 'CH₃CHO', bp: 20, mp: -123, category: 'carbonyl', functional_group: 'carbonyl' },

  // Ketones
  { id: 'acetone', iupac_name: '2-بروبانون (أسيتون)', formula: 'CH₃COCH₃', bp: 56, mp: -95, category: 'carbonyl', functional_group: 'carbonyl', uses: 'مذيب' },

  // Esters
  { id: 'ethyl_acetate', iupac_name: 'خلات الإيثيل', formula: 'CH₃COOC₂H₅', bp: 77, mp: -84, category: 'ester', functional_group: 'carbonyl' },
  { id: 'butyl_acetate', iupac_name: 'خلات البيوتيل', formula: 'CH₃COOC₄H₉', bp: 126, category: 'ester', uses: 'نكهة الموز' },

  // Ethers
  { id: 'diethyl_ether', iupac_name: 'ثنائي إيثيل إيثر', formula: '(C₂H₅)₂O', bp: 35, mp: -116, category: 'ether', functional_group: 'ether', uses: 'مذيب، تخدير' },

  // Amines
  { id: 'aniline', iupac_name: 'الأنيلين', formula: 'C₆H₅NH₂', bp: 184, mp: -6, category: 'amine', functional_group: 'amino', uses: 'صبغات، أدوية' },
];

// IUPAC Naming Rules
export const IUPAC_NAMING_RULES = [
  { rule_id: 1, rule: 'اختر أطول سلسلة كربونية', example: 'في C-C-C-C يكون الاسم بوتان، وليس بروبان' },
  { rule_id: 2, rule: 'رقّم من نهاية تكون أقرب للتفرع', example: 'في 2-ميثيل بيوتان، التفرع في الموضع 2' },
  { rule_id: 3, rule: 'ضع اسم التفرع قبل اسم السلسلة الرئيسية', example: '3,3-ثنائي ميثيل بنتان' },
  { rule_id: 4, rule: 'استخدم بادئات أرقام يونانية: أحادي، ثنائي، ثلاثي، رباعي', example: 'بيوتان (4 كربون)، بنتان (5 كربون)' },
  { rule_id: 5, rule: 'للألكينات والألكاينات، اختر الأساس من السلسلة التي تحتوي الرابطة', example: 'CH₂=CH-CH₃ هو بروبين (ليس بروبان)' },
];

// Isomerism Types
export const ISOMERISM_TYPES = {
  STRUCTURAL: { id: 'structural', label: 'أيزومرية بنائية', description: 'نفس الصيغة الجزيئية، ترتيب مختلف للذرات' },
  STEREOISOMERISM: { id: 'stereoisomerism', label: 'أيزومرية فراغية', description: 'نفس الترتيب، لكن توزيع مختلف في الفراغ' },
  CIS_TRANS: { id: 'cis_trans', label: 'أيزومرية (cis-trans)', description: 'حول رابطة ثنائية، بنفس الجانب أو جانبين مختلفين' },
  OPTICAL: { id: 'optical', label: 'أيزومرية ضوئية', description: 'مرآة بلا صورة (D-L أو +/-)' },
};

// Octane Numbers
export const OCTANE_NUMBERS = {
  REGULAR: 87,
  MID_GRADE: 89,
  PREMIUM: 91,
  RACING: 110,
};

// Electrochemistry Constants
export const ELECTROCHEM_PROCESSES = [
  { id: 'down_process', name: 'عملية داون', description: 'تحليل كهربائي لمصهور كلوريد الصوديوم', products: ['Na', 'Cl₂'] },
  { id: 'hall_heroult', name: 'عملية هول-هيرولت', description: 'استخلاص الألومنيوم بالتحليل الكهربائي', products: ['Al'] },
  { id: 'water_electrolysis', name: 'تحليل الماء', description: 'تحليل كهربائي للماء المحايد أو الحمضي', products: ['H₂', 'O₂'] },
];

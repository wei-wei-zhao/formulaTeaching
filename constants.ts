import { Formula } from './types';

export const FORMULAS: Formula[] = [
  // 基础代数
  {
    id: 'linear',
    name: '一次函数 (线性)',
    category: '基础代数',
    expression: 'a * x + b',
    displayLatex: 'y = ax + b',
    params: [
      { name: 'a', value: 1, min: -10, max: 10, step: 0.1, description: '斜率' },
      { name: 'b', value: 0, min: -10, max: 10, step: 0.1, description: '截距' }
    ],
    description: '最基本的直线方程，描述了恒定的增长或减少率。'
  },
  {
    id: 'quadratic',
    name: '二次函数 (抛物线)',
    category: '基础代数',
    expression: 'a * x^2 + b * x + c',
    displayLatex: 'y = ax^2 + bx + c',
    params: [
      { name: 'a', value: 1, min: -5, max: 5, step: 0.1, description: '开口方向与大小' },
      { name: 'b', value: 0, min: -10, max: 10, step: 0.1, description: '水平偏移' },
      { name: 'c', value: 0, min: -10, max: 10, step: 0.1, description: '垂直偏移' }
    ],
    description: '经典的U型曲线，广泛用于物理抛体运动。'
  },
  {
    id: 'cubic',
    name: '三次函数',
    category: '基础代数',
    expression: 'a * x^3 + b * x^2 + c * x + d',
    displayLatex: 'y = ax^3 + bx^2 + cx + d',
    params: [
      { name: 'a', value: 1, min: -3, max: 3, step: 0.1, description: '三次项系数' },
      { name: 'b', value: 0, min: -5, max: 5, step: 0.1, description: '二次项系数' },
      { name: 'c', value: 0, min: -5, max: 5, step: 0.1, description: '一次项系数' },
      { name: 'd', value: 0, min: -5, max: 5, step: 0.1, description: '常数项' }
    ],
    description: 'S型曲线，可以有两个局部极值点。'
  },
  {
    id: 'inverse',
    name: '反比例函数',
    category: '基础代数',
    expression: 'a / (x - b) + c',
    displayLatex: 'y = a/(x-b) + c',
    params: [
      { name: 'a', value: 1, min: -10, max: 10, step: 0.1, description: '缩放系数' },
      { name: 'b', value: 0, min: -5, max: 5, step: 0.1, description: '垂直渐近线位移' },
      { name: 'c', value: 0, min: -5, max: 5, step: 0.1, description: '水平渐近线位移' }
    ],
    description: '生成双曲线，x不能等于b。'
  },
  {
    id: 'abs',
    name: '绝对值函数',
    category: '基础代数',
    expression: 'a * abs(x - b) + c',
    displayLatex: 'y = a|x-b| + c',
    params: [
      { name: 'a', value: 1, min: -5, max: 5, step: 0.1, description: '开口大小' },
      { name: 'b', value: 0, min: -5, max: 5, step: 0.1, description: '水平顶点' },
      { name: 'c', value: 0, min: -5, max: 5, step: 0.1, description: '垂直顶点' }
    ],
    description: 'V型折线。'
  },
  {
    id: 'sqrt',
    name: '平方根函数',
    category: '基础代数',
    expression: 'a * sqrt(x - b) + c',
    displayLatex: 'y = a\\sqrt{x-b} + c',
    params: [
      { name: 'a', value: 1, min: -5, max: 5, step: 0.1, description: '缩放' },
      { name: 'b', value: 0, min: -10, max: 5, step: 0.1, description: '起点X' },
      { name: 'c', value: 0, min: -5, max: 5, step: 0.1, description: '起点Y' }
    ],
    description: '仅在 x >= b 时有定义。'
  },

  // 三角函数
  {
    id: 'sin',
    name: '正弦函数 (Sin)',
    category: '三角函数',
    expression: 'a * sin(b * x + c) + d',
    displayLatex: 'y = a \\sin(bx+c) + d',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '振幅' },
      { name: 'b', value: 1, min: 0.1, max: 5, step: 0.1, description: '频率' },
      { name: 'c', value: 0, min: -3.14, max: 3.14, step: 0.1, description: '相位' },
      { name: 'd', value: 0, min: -5, max: 5, step: 0.1, description: '垂直偏移' }
    ],
    description: '周期性波形，自然界震动的基本模型。'
  },
  {
    id: 'cos',
    name: '余弦函数 (Cos)',
    category: '三角函数',
    expression: 'a * cos(b * x + c) + d',
    displayLatex: 'y = a \\cos(bx+c) + d',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '振幅' },
      { name: 'b', value: 1, min: 0.1, max: 5, step: 0.1, description: '频率' },
      { name: 'c', value: 0, min: -3.14, max: 3.14, step: 0.1, description: '相位' },
      { name: 'd', value: 0, min: -5, max: 5, step: 0.1, description: '垂直偏移' }
    ],
    description: '与正弦函数形状相同，相位不同。'
  },
  {
    id: 'tan',
    name: '正切函数 (Tan)',
    category: '三角函数',
    expression: 'a * tan(b * x) + c',
    displayLatex: 'y = a \\tan(bx) + c',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '缩放' },
      { name: 'b', value: 1, min: 0.1, max: 5, step: 0.1, description: '周期系数' },
      { name: 'c', value: 0, min: -5, max: 5, step: 0.1, description: '垂直偏移' }
    ],
    description: '具有周期性垂直渐近线。'
  },
  {
    id: 'sinc',
    name: 'Sinc 函数',
    category: '三角函数',
    expression: 'a * sin(b * x) / (b * x)',
    displayLatex: 'y = a \\sin(bx) / bx',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '峰值高度' },
      { name: 'b', value: 1, min: 0.5, max: 10, step: 0.5, description: '宽度压缩' }
    ],
    description: '信号处理中的重要函数，x=0时取极限值为a。'
  },

  // 指数与对数
  {
    id: 'exp',
    name: '指数函数',
    category: '指数与对数',
    expression: 'a * e^(b * x) + c',
    displayLatex: 'y = a e^{bx} + c',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '初始值系数' },
      { name: 'b', value: 0.5, min: -2, max: 2, step: 0.1, description: '增长率' },
      { name: 'c', value: 0, min: -5, max: 5, step: 0.1, description: '垂直渐近线' }
    ],
    description: '描述人口增长、复利等快速变化过程。'
  },
  {
    id: 'ln',
    name: '自然对数',
    category: '指数与对数',
    expression: 'a * log(b * x) + c',
    displayLatex: 'y = a \\ln(bx) + c',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '缩放' },
      { name: 'b', value: 1, min: 0.1, max: 5, step: 0.1, description: 'X缩放' },
      { name: 'c', value: 0, min: -5, max: 5, step: 0.1, description: '垂直偏移' }
    ],
    description: '指数函数的反函数，增长速度随x增大而减慢。'
  },
  {
    id: 'logistic',
    name: 'Logistic (S型) 函数',
    category: '指数与对数',
    expression: 'L / (1 + e^(-k * (x - x0)))',
    displayLatex: 'y = \\frac{L}{1 + e^{-k(x-x_0)}}',
    params: [
      { name: 'L', value: 5, min: 1, max: 10, step: 0.5, description: '最大值(曲线高度)' },
      { name: 'k', value: 1, min: 0.1, max: 5, step: 0.1, description: '陡峭度' },
      { name: 'x0', value: 0, min: -5, max: 5, step: 0.5, description: '中点X值' }
    ],
    description: '广泛用于人口模型、神经网络激活函数。'
  },
  {
    id: 'gaussian',
    name: '高斯 (正态) 分布',
    category: '统计与概率',
    expression: 'a * e^(-((x - b)^2) / (2 * c^2))',
    displayLatex: 'y = a e^{-\\frac{(x-b)^2}{2c^2}}',
    params: [
      { name: 'a', value: 3, min: 0.1, max: 5, step: 0.1, description: '峰值高度' },
      { name: 'b', value: 0, min: -5, max: 5, step: 0.1, description: '均值(中心)' },
      { name: 'c', value: 1, min: 0.1, max: 3, step: 0.1, description: '标准差(宽度)' }
    ],
    description: '钟形曲线，概率论中最重要的分布。'
  },

  // 化学与物理
  {
    id: 'kinetics_1st',
    name: '一级反应动力学',
    category: '化学与物理',
    expression: 'a * e^(-b * x)',
    displayLatex: '[A] = [A]_0 e^{-kt}',
    params: [
      { name: 'a', value: 10, min: 1, max: 20, step: 0.5, description: '初始浓度 [A]₀' },
      { name: 'b', value: 0.5, min: 0.01, max: 2, step: 0.01, description: '速率常数 k' }
    ],
    description: '描述反应物浓度随时间呈指数衰减的反应，如放射性衰变。'
  },
  {
    id: 'kinetics_2nd',
    name: '二级反应动力学',
    category: '化学与物理',
    expression: '1 / (1/a + b * x)',
    displayLatex: '[A] = \\frac{1}{1/[A]_0 + kt}',
    params: [
      { name: 'a', value: 10, min: 1, max: 20, step: 0.5, description: '初始浓度 [A]₀' },
      { name: 'b', value: 0.1, min: 0.01, max: 1, step: 0.01, description: '速率常数 k' }
    ],
    description: '反应速率与反应物浓度的平方成正比。'
  },
  {
    id: 'michaelis_menten',
    name: '米氏方程 (酶动力学)',
    category: '化学与物理',
    expression: '(a * x) / (b + x)',
    displayLatex: 'v = \\frac{V_{max}[S]}{K_m + [S]}',
    params: [
      { name: 'a', value: 10, min: 1, max: 20, step: 0.5, description: '最大反应速率 Vmax' },
      { name: 'b', value: 2, min: 0.1, max: 10, step: 0.1, description: '米氏常数 Km' }
    ],
    description: '描述酶促反应速率 v 与底物浓度 [S] (此处为x) 之间的关系。'
  },
  {
    id: 'arrhenius',
    name: '阿伦尼乌斯方程',
    category: '化学与物理',
    expression: 'a * e^(-b / (8.314 * x))',
    displayLatex: 'k = A e^{-\\frac{E_a}{RT}}',
    params: [
      { name: 'a', value: 100, min: 10, max: 1000, step: 10, description: '指前因子 A' },
      { name: 'b', value: 500, min: 100, max: 5000, step: 100, description: '活化能 Ea (J/mol)' }
    ],
    description: '反应速率常数 k 随温度 T (此处为x) 的变化关系。注意：需要调整X轴(温度)范围。'
  },
  {
    id: 'boyle',
    name: '玻意耳定律 (等温)',
    category: '化学与物理',
    expression: 'a / x',
    displayLatex: 'P = \\frac{k}{V}',
    params: [
      { name: 'a', value: 10, min: 1, max: 50, step: 1, description: '常数 k (nRT)' }
    ],
    description: '恒温下，气体的压强 P 与体积 V (此处为x) 成反比。'
  },
  {
    id: 'charles',
    name: '查理定律 (等压)',
    category: '化学与物理',
    expression: 'a * x',
    displayLatex: 'V = kT',
    params: [
      { name: 'a', value: 0.5, min: 0.1, max: 2, step: 0.1, description: '常数 k (nR/P)' }
    ],
    description: '恒压下，气体的体积 V 与热力学温度 T (此处为x) 成正比。'
  },
  {
    id: 'nernst',
    name: '能斯特方程',
    category: '化学与物理',
    expression: 'a - (0.0592/b) * log10(x)',
    displayLatex: 'E = E^0 - \\frac{0.0592}{n} \\lg Q',
    params: [
      { name: 'a', value: 1.1, min: -3, max: 3, step: 0.1, description: '标准电势 E⁰' },
      { name: 'b', value: 2, min: 1, max: 6, step: 1, description: '转移电子数 n' }
    ],
    description: '非标准状态下的电极电势 E 随反应商 Q (此处为x) 的变化。'
  },
  {
    id: 'henderson_hasselbalch',
    name: '亨德森-哈塞尔巴尔赫方程',
    category: '化学与物理',
    expression: 'a + log10(x)',
    displayLatex: 'pH = pK_a + \\lg(\\frac{[A^-]}{[HA]})',
    params: [
      { name: 'a', value: 4.76, min: 1, max: 14, step: 0.1, description: '酸度系数 pKa' }
    ],
    description: '计算缓冲溶液的 pH 值，x 为共轭碱与酸的浓度比。'
  },
  {
    id: 'van_der_waals',
    name: '范德华方程 (P-V)',
    category: '化学与物理',
    expression: '(8.314 * c) / (x - b) - a / (x^2)',
    displayLatex: 'P = \\frac{RT}{V_m-b} - \\frac{a}{V_m^2}',
    params: [
      { name: 'a', value: 5.5, min: 0, max: 20, step: 0.1, description: '分子引力参数 a' },
      { name: 'b', value: 0.06, min: 0.01, max: 0.2, step: 0.01, description: '体积修正 b' },
      { name: 'c', value: 300, min: 200, max: 500, step: 10, description: '温度 T (K)' }
    ],
    description: '实际气体的状态方程，修正了理想气体的体积和分子间作用力。'
  },
  {
    id: 'radioactive_decay',
    name: '放射性衰变',
    category: '化学与物理',
    expression: 'a * (0.5)^(x/b)',
    displayLatex: 'N = N_0 (\\frac{1}{2})^{t/t_{1/2}}',
    params: [
      { name: 'a', value: 100, min: 10, max: 1000, step: 10, description: '初始数量 N₀' },
      { name: 'b', value: 5, min: 1, max: 20, step: 0.5, description: '半衰期 t½' }
    ],
    description: '放射性核素数量 N 随时间 t (此处为x) 的变化规律。'
  },

  // 高级/特殊
  {
    id: 'relu',
    name: 'ReLU (线性整流)',
    category: '神经网络',
    expression: 'max(0, a * x + b)',
    displayLatex: 'y = \\max(0, ax+b)',
    params: [
      { name: 'a', value: 1, min: -2, max: 2, step: 0.1, description: '斜率' },
      { name: 'b', value: 0, min: -5, max: 5, step: 0.1, description: '阈值偏移' }
    ],
    description: '深度学习中最常用的激活函数。'
  },
  {
    id: 'softplus',
    name: 'Softplus',
    category: '神经网络',
    expression: 'log(1 + e^(a*x))',
    displayLatex: 'y = \\ln(1 + e^{ax})',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '锐度' }
    ],
    description: 'ReLU 的平滑近似版本。'
  },
  {
    id: 'tanh',
    name: '双曲正切 (Tanh)',
    category: '神经网络',
    expression: 'tanh(a * x)',
    displayLatex: 'y = \\tanh(ax)',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 5, step: 0.1, description: '陡峭度' }
    ],
    description: '取值范围在 -1 到 1 之间的S型函数。'
  },
  {
    id: 'power',
    name: '幂函数',
    category: '高级',
    expression: 'x^a',
    displayLatex: 'y = x^a',
    params: [
      { name: 'a', value: 2, min: -3, max: 5, step: 0.1, description: '指数' }
    ],
    description: '随着指数a的变化，形状剧烈变化。'
  },
  {
    id: 'sinh',
    name: '双曲正弦 (Sinh)',
    category: '高级',
    expression: 'sinh(a * x)',
    displayLatex: 'y = \\sinh(ax)',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 2, step: 0.1, description: '缩放' }
    ],
    description: '悬链线相关函数。'
  },
  {
    id: 'cosh',
    name: '双曲余弦 (Cosh)',
    category: '高级',
    expression: 'cosh(a * x)',
    displayLatex: 'y = \\cosh(ax)',
    params: [
      { name: 'a', value: 1, min: 0.1, max: 2, step: 0.1, description: '缩放' }
    ],
    description: '理想悬链在重力作用下的形状。'
  }
];

export const X_MIN_DEFAULT = -10;
export const X_MAX_DEFAULT = 10;
export const POINT_COUNT = 300; // Resolution of the graph

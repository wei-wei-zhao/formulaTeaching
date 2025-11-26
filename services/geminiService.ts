import { GoogleGenAI, Chat, GenerateContentStreamResult, Type, FunctionDeclaration } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

const addFormulaTool: FunctionDeclaration = {
  name: 'addFormula',
  description: 'Add a new mathematical formula to the application library. Use this when the user asks to see or search for a specific function/graph that is not in the current list. Generate valid mathjs expressions.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'Unique ID (e.g., "damped-oscillation").' },
      name: { type: Type.STRING, description: 'Display name (e.g., "Damped Oscillation").' },
      category: { type: Type.STRING, description: 'Category name (e.g., "Physics", "Advanced").' },
      expression: { type: Type.STRING, description: 'Mathjs compatible expression (e.g., "e^(-x) * sin(2*x)"). Use "x" as the variable.' },
      displayLatex: { type: Type.STRING, description: 'LaTeX representation for display (e.g., "e^{-x} \\sin(2x)").' },
      description: { type: Type.STRING, description: 'Brief description of the formula.' },
      params: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Parameter name (e.g., "a", "k").' },
            value: { type: Type.NUMBER, description: 'Default value.' },
            min: { type: Type.NUMBER, description: 'Minimum value.' },
            max: { type: Type.NUMBER, description: 'Maximum value.' },
            step: { type: Type.NUMBER, description: 'Step size.' },
            description: { type: Type.STRING, description: 'Parameter description.' },
          },
          required: ['name', 'value', 'min', 'max', 'step', 'description']
        }
      }
    },
    required: ['id', 'name', 'category', 'expression', 'displayLatex', 'description', 'params']
  }
};

export const createChatSession = (): Chat | null => {
  if (!ai) return null;
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      tools: [{ functionDeclarations: [addFormulaTool] }],
      systemInstruction: `
        你是一位友好、耐心的数学助教，名叫"数学小天才"。
        你的目标是帮助学生理解数学函数的图像、性质和应用。
        
        功能：
        1. 回答关于数学函数性质（定义域、值域、单调性等）的问题。
        2. 解释现实世界的应用场景。
        3. **重要**：如果用户要求绘制、查看或搜索你当前的公式库中不存在的函数（例如"画一个心形线"、"阻尼振动"、"正态分布"等），请务必调用 \`addFormula\` 工具来动态添加该公式。
           - 确保生成的 \`expression\` 是有效的 mathjs 语法（例如使用 \`a * x\` 而不是 \`ax\`）。
           - 生成合理的参数范围（min, max, step）。
           - 确保 \`displayLatex\` 格式美观。
        
        回答规则：
        - 保持简洁清晰。
        - 如果调用了工具添加公式，请在工具调用后简短回复用户，告知公式已添加并建议他们尝试调整参数。
      `,
    },
  });
};

export const sendMessageStream = async (
  chat: Chat, 
  message: string | { functionResponse: any }
): Promise<GenerateContentStreamResult | null> => {
  try {
    // If it's a simple string message
    if (typeof message === 'string') {
        return await chat.sendMessageStream({ message });
    } 
    // If it's a function response (structured object)
    else {
        // The SDK might expect different structure depending on exact version, 
        // but for @google/genai, sendMessageStream accepts a Part or string.
        // We pass the object directly which matches the expected 'Part' structure for functionResponse
        return await chat.sendMessageStream({ message: [message] });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
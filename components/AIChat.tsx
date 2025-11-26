import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { sendMessageStream, createChatSession } from '../services/geminiService';
import { Formula, ChatMessage } from '../types';
import { formatParamsForPrompt } from '../utils/mathUtils';

interface AIChatProps {
  currentFormula: Formula;
  onAddFormula: (formula: Formula) => void;
}

const AIChat: React.FC<AIChatProps> = ({ currentFormula, onAddFormula }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat session on mount
  useEffect(() => {
    const session = createChatSession();
    setChat(session);
    
    // Initial welcome message
    setMessages([{
      id: 'welcome',
      role: 'model',
      content: '你好！我是你的AI数学助教。我可以分析函数性质，或者帮你添加新的公式到库中。试试说："帮我画一个心形线" 或 "添加一个阻尼振动公式"。',
      timestamp: Date.now()
    }]);
  }, []); // Only run once

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const messageContent = textOverride || input;
    if (!messageContent.trim() || !chat) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      // Enrich prompt with context
      const contextPrompt = `
        当前正在显示的公式: ${currentFormula.name} (${currentFormula.displayLatex}).
        当前参数: ${formatParamsForPrompt(currentFormula.params)}.
        用户的具体问题: ${messageContent}
      `;

      // 1. Send User Message
      const result = await sendMessageStream(chat, contextPrompt);
      
      if (!result) throw new Error("No response");

      let fullResponse = '';
      const botMsgId = (Date.now() + 1).toString();
      
      // Placeholder for streaming text
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        content: '',
        timestamp: Date.now()
      }]);

      // Stream text response
      for await (const chunk of result) {
          const text = chunk.text;
          if (text) {
              fullResponse += text;
              setMessages(prev => prev.map(msg => 
                  msg.id === botMsgId ? { ...msg, content: fullResponse } : msg
              ));
          }
      }

      // 2. Handle Function Calls (Tool Usage)
      const finalResponse = await result.response;
      
      if (finalResponse.functionCalls && finalResponse.functionCalls.length > 0) {
        for (const call of finalResponse.functionCalls) {
          if (call.name === 'addFormula') {
            const args = call.args as any;
            console.log("AI adding formula:", args);
            
            // Execute the tool (Add formula to app state)
            const newFormula: Formula = {
                id: args.id || `custom-${Date.now()}`,
                name: args.name,
                category: args.category || 'Custom',
                expression: args.expression,
                displayLatex: args.displayLatex,
                description: args.description,
                params: args.params
            };
            onAddFormula(newFormula);

            // 3. Send Tool Response back to Gemini
            const toolResponseContent = {
                functionResponse: {
                    name: 'addFormula',
                    response: { 
                        result: `Successfully added formula "${args.name}". The user is now viewing it.` 
                    }
                }
            };
            
            // Send the tool response and wait for Gemini's follow-up (e.g., "I have added it for you.")
            // Fix: Pass toolResponseContent directly as expected by sendMessageStream, without 'parts' wrapper
            const toolFollowUp = await sendMessageStream(chat, toolResponseContent);
            
            if (toolFollowUp) {
                 let toolFollowUpText = '';
                 for await (const chunk of toolFollowUp) {
                    const text = chunk.text;
                    if (text) {
                        toolFollowUpText += text;
                        // Append to the *same* bot message or create new? 
                        // Usually better to append or just let it flow. 
                        // Here we append to the existing response for continuity.
                        setMessages(prev => prev.map(msg => 
                            msg.id === botMsgId ? { ...msg, content: fullResponse + "\n" + toolFollowUpText } : msg
                        ));
                    }
                 }
            }
          }
        }
      }

    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: '抱歉，我遇到了一些问题，请稍后再试。',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: "📐 解析数学性质", prompt: "请结合当前参数，详细分析该函数的定义域、值域、单调性、奇偶性等数学性质。" },
    { label: "🌍 实际应用场景", prompt: "请举例说明该函数在现实生活、科学或工程中的具体应用场景。" },
    { label: "➕ 添加阻尼振动", prompt: "请帮我添加一个阻尼振动(Damped Oscillation)的公式到库中。" },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200">
      <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
        </div>
        <div>
          <h2 className="font-bold text-slate-800">AI 数学助教</h2>
          <p className="text-xs text-green-600 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            在线 - Gemini Powered
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}
            >
              {msg.content || (isLoading && msg.role === 'model' && msg.content === '' ? 'Thinking...' : '')}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
            {quickActions.map((action, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSend(action.prompt)}
                    disabled={isLoading}
                    className="flex-shrink-0 px-3 py-1.5 bg-indigo-50 text-primary text-xs font-medium rounded-full hover:bg-indigo-100 transition-colors border border-indigo-100 disabled:opacity-50 flex items-center"
                >
                    {action.label}
                </button>
            ))}
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="问问关于这个公式的问题，或让AI添加新公式..."
            className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 pl-3 pr-12 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary scrollbar-hide"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-1.5 rounded-md bg-primary text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2">
            AI 可能会犯错，请核对重要信息。
        </p>
      </div>
    </div>
  );
};

export default AIChat;
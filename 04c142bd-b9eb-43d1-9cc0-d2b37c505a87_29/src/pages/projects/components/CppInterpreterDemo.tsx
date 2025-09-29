
import { useState } from 'react';

export default function CppInterpreterDemo() {
  const [expression, setExpression] = useState('2 + 3 * 4');
  const [result, setResult] = useState('');
  const [variables, setVariables] = useState<{[key: string]: number}>({
    x: 10,
    y: 5,
    pi: 3.14159
  });
  const [history, setHistory] = useState<string[]>([
    '> 2 + 3 * 4 = 14',
    '> sqrt(16) = 4',
    '> x * y = 50'
  ]);

  const evaluateExpression = (expr: string): number => {
    try {
      // Replace variables
      let processedExpr = expr;
      Object.entries(variables).forEach(([name, value]) => {
        processedExpr = processedExpr.replace(new RegExp(`\\b${name}\\b`, 'g'), value.toString());
      });
      
      // Handle basic math functions
      processedExpr = processedExpr.replace(/sqrt\(([^)]+)\)/g, (_, p1) => Math.sqrt(eval(p1)).toString());
      processedExpr = processedExpr.replace(/sin\(([^)]+)\)/g, (_, p1) => Math.sin(eval(p1)).toString());
      processedExpr = processedExpr.replace(/cos\(([^)]+)\)/g, (_, p1) => Math.cos(eval(p1)).toString());
      processedExpr = processedExpr.replace(/pow\(([^,]+),([^)]+)\)/g, (_, p1, p2) => Math.pow(eval(p1), eval(p2)).toString());
      
      return eval(processedExpr);
    } catch {
      throw new Error('Invalid expression');
    }
  };

  const handleEvaluate = () => {
    try {
      const evalResult = evaluateExpression(expression);
      const resultStr = Number.isInteger(evalResult) ? evalResult.toString() : evalResult.toFixed(4);
      setResult(resultStr);
      setHistory(prev => [`> ${expression} = ${resultStr}`, ...prev.slice(0, 9)]);
    } catch (error) {
      setResult('Error: Invalid expression');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEvaluate();
    }
  };

  const insertFunction = (func: string) => {
    setExpression(prev => prev + func);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            C++ Expression Interpreter
          </h1>
          <p className="text-gray-300">Advanced mathematical expression parser with variable support</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Calculator */}
          <div className="lg:col-span-2 bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-300 mb-2">Expression Input</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-gray-900/50 border border-blue-500/50 rounded-lg px-4 py-3 text-white font-mono text-lg focus:border-blue-400 focus:outline-none"
                  placeholder="Enter mathematical expression..."
                />
                <button
                  onClick={handleEvaluate}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 font-semibold whitespace-nowrap"
                >
                  Evaluate
                </button>
              </div>
            </div>

            {/* Result Display */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-300 mb-2">Result</label>
              <div className="bg-gray-900/50 border border-green-500/50 rounded-lg px-4 py-3 text-green-400 font-mono text-xl min-h-[60px] flex items-center">
                {result || 'Enter an expression and press Enter or click Evaluate'}
              </div>
            </div>

            {/* Function Buttons */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-300 mb-2">Quick Functions</label>
              <div className="grid grid-cols-4 gap-2">
                {['sqrt()', 'sin()', 'cos()', 'pow(,)', 'pi', 'x', 'y', '()'].map((func) => (
                  <button
                    key={func}
                    onClick={() => insertFunction(func)}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:border-blue-400 transition-all duration-300 text-sm font-mono"
                  >
                    {func}
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">Calculation History</label>
              <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4 h-48 overflow-y-auto">
                {history.map((entry, index) => (
                  <div key={index} className="text-gray-300 font-mono text-sm mb-1 hover:text-white transition-colors">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Variables Panel */}
          <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-300">Variables</h3>
            <div className="space-y-4">
              {Object.entries(variables).map(([name, value]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-gray-300 font-mono">{name}:</span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setVariables(prev => ({...prev, [name]: parseFloat(e.target.value) || 0}))}
                    className="w-20 bg-gray-800/50 border border-gray-600 rounded px-2 py-1 text-white text-sm font-mono focus:border-blue-400 focus:outline-none"
                    step="0.01"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Supported Functions</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Basic: +, -, *, /, ()</div>
                <div>• sqrt(x) - Square root</div>
                <div>• sin(x), cos(x) - Trigonometry</div>
                <div>• pow(x,y) - Power function</div>
                <div>• Variables: x, y, pi</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Examples</h4>
              <div className="space-y-2 text-sm text-gray-300 font-mono">
                <div className="cursor-pointer hover:text-white" onClick={() => setExpression('2 + 3 * 4')}>2 + 3 * 4</div>
                <div className="cursor-pointer hover:text-white" onClick={() => setExpression('sqrt(x * y)')}>sqrt(x * y)</div>
                <div className="cursor-pointer hover:text-white" onClick={() => setExpression('sin(pi / 2)')}>sin(pi / 2)</div>
                <div className="cursor-pointer hover:text-white" onClick={() => setExpression('pow(2, 8)')}>pow(2, 8)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

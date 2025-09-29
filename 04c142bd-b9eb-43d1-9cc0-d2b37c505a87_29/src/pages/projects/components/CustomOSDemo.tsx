
import { useState, useEffect } from 'react';

export default function CustomOSDemo() {
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'MicroKernel OS v1.0 - Built from scratch',
    'Bootloader initialized successfully',
    'Memory management system loaded',
    'Process scheduler active',
    'Welcome to MicroKernel OS!'
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [systemInfo, setSystemInfo] = useState({
    uptime: '00:15:42',
    memory: { used: 128, total: 512 },
    processes: 7,
    cpu: 15
  });

  const fileSystem = {
    '/': ['home', 'bin', 'etc', 'var', 'tmp'],
    '/home': ['user'],
    '/home/user': ['documents', 'projects', 'readme.txt'],
    '/home/user/documents': ['notes.txt', 'todo.md'],
    '/home/user/projects': ['kernel.c', 'bootloader.asm', 'memory.c'],
    '/bin': ['ls', 'cd', 'cat', 'ps', 'top', 'help'],
    '/etc': ['config.sys', 'startup.cfg'],
    '/var': ['log'],
    '/var/log': ['system.log', 'kernel.log']
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemInfo(prev => ({
        ...prev,
        uptime: new Date(Date.now() + Math.random() * 1000).toISOString().substr(11, 8),
        cpu: Math.floor(Math.random() * 30) + 10,
        memory: { ...prev.memory, used: prev.memory.used + Math.floor(Math.random() * 3) - 1 }
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case 'ls':
        const dir = args[0] || currentDirectory;
        const files = fileSystem[dir as keyof typeof fileSystem] || ['Permission denied'];
        output = files.join('  ');
        break;
      case 'cd':
        const newDir = args[0];
        if (newDir === '..') {
          const pathParts = currentDirectory.split('/').filter(p => p);
          pathParts.pop();
          setCurrentDirectory('/' + pathParts.join('/'));
          output = '';
        } else if (newDir && fileSystem[currentDirectory as keyof typeof fileSystem]?.includes(newDir)) {
          const fullPath = currentDirectory === '/' ? `/${newDir}` : `${currentDirectory}/${newDir}`;
          setCurrentDirectory(fullPath);
          output = '';
        } else {
          output = `cd: ${newDir}: No such file or directory`;
        }
        break;
      case 'cat':
        const file = args[0];
        if (file === 'readme.txt') {
          output = 'Welcome to MicroKernel OS!\nThis is a custom operating system built from scratch.\nFeatures: Memory management, process scheduling, system calls.';
        } else if (file === 'kernel.c') {
          output = '#include <kernel.h>\n\nint main() {\n    init_memory();\n    init_scheduler();\n    start_kernel();\n    return 0;\n}';
        } else {
          output = `cat: ${file}: No such file or directory`;
        }
        break;
      case 'ps':
        output = 'PID  PPID  CMD\n  1     0  init\n  2     1  kernel_thread\n  3     1  memory_manager\n  4     1  scheduler\n  5     1  shell\n  6     5  ps\n  7     1  system_monitor';
        break;
      case 'top':
        output = `Tasks: ${systemInfo.processes} total\nCPU usage: ${systemInfo.cpu}%\nMemory: ${systemInfo.memory.used}MB / ${systemInfo.memory.total}MB\nUptime: ${systemInfo.uptime}`;
        break;
      case 'help':
        output = 'Available commands:\nls - list directory contents\ncd - change directory\ncat - display file contents\nps - show running processes\ntop - system information\nclear - clear terminal\nhelp - show this help';
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      case 'uname':
        output = 'MicroKernel OS 1.0 x86_64';
        break;
      case 'whoami':
        output = 'root';
        break;
      default:
        output = `${command}: command not found`;
    }

    setCommandHistory(prev => [...prev, `${currentDirectory}$ ${cmd}`, output].filter(line => line));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-orange-900 text-green-400 p-6 font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
            MicroKernel OS Terminal
          </h1>
          <p className="text-gray-300">Custom Operating System - Built from Scratch</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Terminal */}
          <div className="lg:col-span-3 bg-black/80 border-2 border-green-500/50 rounded-lg overflow-hidden">
            <div className="bg-green-500/20 px-4 py-2 border-b border-green-500/50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-300 text-sm">MicroKernel Terminal</span>
            </div>
            
            <div className="p-4 h-96 overflow-y-auto">
              {commandHistory.map((line, index) => (
                <div key={index} className="mb-1 text-sm">
                  {line.startsWith('/') ? (
                    <span className="text-green-400">{line}</span>
                  ) : (
                    <span className="text-gray-300 whitespace-pre-line">{line}</span>
                  )}
                </div>
              ))}
              
              <div className="flex items-center mt-2">
                <span className="text-green-400 mr-2">{currentDirectory}$</span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent text-green-400 outline-none"
                  placeholder="Enter command..."
                  autoFocus
                />
                <span className="text-green-400 animate-pulse">|</span>
              </div>
            </div>
          </div>

          {/* System Monitor */}
          <div className="bg-black/80 border-2 border-green-500/50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4 text-green-300">System Monitor</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">CPU Usage</div>
                <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-orange-500 h-full transition-all duration-1000"
                    style={{ width: `${systemInfo.cpu}%` }}
                  ></div>
                </div>
                <div className="text-xs text-green-400 mt-1">{systemInfo.cpu}%</div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-1">Memory</div>
                <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full"
                    style={{ width: `${(systemInfo.memory.used / systemInfo.memory.total) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-green-400 mt-1">{systemInfo.memory.used}MB / {systemInfo.memory.total}MB</div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-green-400">{systemInfo.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processes:</span>
                    <span className="text-green-400">{systemInfo.processes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kernel:</span>
                    <span className="text-green-400">v1.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold mb-2 text-green-300">Quick Commands</h4>
              <div className="space-y-1 text-xs">
                {['ls', 'ps', 'top', 'help', 'clear'].map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setCurrentCommand(cmd);
                      executeCommand(cmd);
                      setCurrentCommand('');
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-green-500/20 rounded text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-block bg-black/50 border border-green-500/30 rounded-lg px-6 py-3">
            <div className="text-sm text-gray-400 mb-1">Boot Sequence Status</div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-green-400">✓ Bootloader</span>
              <span className="text-green-400">✓ Kernel</span>
              <span className="text-green-400">✓ Memory Mgmt</span>
              <span className="text-green-400">✓ Scheduler</span>
              <span className="text-green-400">✓ System Calls</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

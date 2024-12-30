import { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide } from 'lucide-react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const MAX_DIGITS = 12; // 最大桁数を定義

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      if (display.length < MAX_DIGITS) {
        setDisplay(display === '0' ? num : display + num);
      }
    }
  };

  const handleOperation = (op: string) => {
    setOperation(op);
    setFirstNumber(parseFloat(display));
    setNewNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operation === null) return;
    
    const secondNumber = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
    }

    // 結果も12桁に制限
    setDisplay(result.toString().slice(0, MAX_DIGITS));
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-right text-3xl font-mono">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {/* Numbers */}
        <button onClick={() => handleNumber('7')} className="btn">7</button>
        <button onClick={() => handleNumber('8')} className="btn">8</button>
        <button onClick={() => handleNumber('9')} className="btn">9</button>
        <button onClick={() => handleOperation('/')} className="btn-operator">
          <Divide size={20} />
        </button>

        <button onClick={() => handleNumber('4')} className="btn">4</button>
        <button onClick={() => handleNumber('5')} className="btn">5</button>
        <button onClick={() => handleNumber('6')} className="btn">6</button>
        <button onClick={() => handleOperation('*')} className="btn-operator">
          <X size={20} />
        </button>

        <button onClick={() => handleNumber('1')} className="btn">1</button>
        <button onClick={() => handleNumber('2')} className="btn">2</button>
        <button onClick={() => handleNumber('3')} className="btn">3</button>
        <button onClick={() => handleOperation('-')} className="btn-operator">
          <Minus size={20} />
        </button>

        <button onClick={() => handleNumber('0')} className="btn">0</button>
        <button onClick={() => handleNumber('.')} className="btn">.</button>
        <button onClick={calculate} className="btn-equal">
          <Equal size={20} />
        </button>
        <button onClick={() => handleOperation('+')} className="btn-operator">
          <Plus size={20} />
        </button>

        <button onClick={clear} className="col-span-4 btn-clear">
          <Delete size={20} className="mr-2" />
          Clear
        </button>
      </div>
    </div>
  );
}

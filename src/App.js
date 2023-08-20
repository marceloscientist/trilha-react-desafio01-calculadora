
import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';


const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  'x': (a, b) => a * b,
  '/': (a, b) => a / b,
  '^2': (a) => a ** 2 
};


const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  };

  const handleAddNumber = (num) => {
    setCurrentNumber(prev => `${prev === '0' ? '' : prev}${num}`);
  };

  const handleEquals = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      if (operation === '^2') {  // Directly check if the operation is exponentiation
        const operationFn = operations[operation];
        const total = operationFn(Number(firstNumber));
        setCurrentNumber(String(total));
        setOperation('');
      } else if (operations[operation]) {
        const operationFn = operations[operation];
        const total = operationFn(Number(firstNumber), Number(currentNumber));
        setCurrentNumber(String(total));
        setOperation('');
      }
    }
  };

    
  const createOperationHandler = (operator, operationFn) => {
    return () => {
      if (firstNumber === '0') {
        setFirstNumber(String(currentNumber));
        setCurrentNumber('0');
        setOperation(operator);
      } else {
        const total = operationFn(Number(firstNumber), Number(currentNumber));
        setCurrentNumber(String(total));
        setOperation('');
      }
    };
  };

  return (
    <Container>
    <Content>
      <Input value={currentNumber}/>
      <Row>
        <Button label="x" onClick={createOperationHandler('x', operations['*'])}/>
        <Button label="/" onClick={createOperationHandler('/', operations['/'])}/>
        <Button label="c" onClick={handleOnClear}/>
        <Button label="&#178;" onClick={createOperationHandler('^2', operations['/'])}/>
      </Row>
      <Row>
        <Button label="7" onClick={() => handleAddNumber('7')}/>
        <Button label="8" onClick={() => handleAddNumber('8')}/>
        <Button label="9" onClick={() => handleAddNumber('9')}/>
        <Button label="-" onClick={createOperationHandler('-', operations['-'])}/>
      </Row>
      <Row>
        <Button label="4" onClick={() => handleAddNumber('4')}/>
        <Button label="5" onClick={() => handleAddNumber('5')}/>
        <Button label="6" onClick={() => handleAddNumber('6')}/>
        <Button label="+" onClick={createOperationHandler('+', operations['+'])}/>
      </Row>
      <Row>
        <Button label="1" onClick={() => handleAddNumber('1')}/>
        <Button label="2" onClick={() => handleAddNumber('2')}/>
        <Button label="3" onClick={() => handleAddNumber('3')}/>
        <Button label="=" onClick={handleEquals}/>
      </Row>
    </Content>
  </Container>
  );
}

export default App;

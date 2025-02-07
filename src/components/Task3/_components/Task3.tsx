import React, { useEffect } from 'react';
import { useTask3 } from '../_hooks/useTask3';

function Task3() {
  const { result, processString } = useTask3();

  useEffect(() => {
    const inputString = 'HeuronCodingTest';
    processString(inputString);
  }, [processString]);

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Task 3 - 문자열 처리</h1>
      <div className='mt-4'>
        <p className='font-semibold'>원본 : HeuronCodingTest</p>
        <p className='font-semibold'>모음 : {result[0]}</p>
        <p className='font-semibold'>자음 : {result[1]}</p>
      </div>
    </div>
  );
}

export default Task3;

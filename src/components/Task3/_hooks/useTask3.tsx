import { useState, useCallback } from 'react';

interface UseTask3Result {
  result: string[];
  processString: (input: string) => string[];
}

export const useTask3 = (): UseTask3Result => {
  const [result, setResult] = useState<string[]>([]);

  // 정규식을 사용해서 모음과 자음을 각각 추출
  const processString = useCallback((input: string) => {
    const vowels = input.replace(/[^aeiouAEIOU]/g, ' ');
    const consonants = input.replace(/[aeiouAEIOU]/g, ' ');

    const processed = [vowels, consonants];
    setResult(processed);
    return processed;
  }, []);

  return {
    result,
    processString,
  };
};

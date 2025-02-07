import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className='p-10'>
      <h1 className='text-4xl font-bold mb-8'>Heuron Frontend Assignment</h1>
      <div className='grid gap-5 max-w-3xl'>
        <Link
          to='/task1'
          className='p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'
        >
          <h2 className='text-2xl font-semibold mb-2'>Task 1 - 이미지 갤러리</h2>
          <p className='text-gray-600'>Canvas API를 활용한 이미지 갤러리 구현</p>
        </Link>
        <Link
          to='/task2'
          className='p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'
        >
          <h2 className='text-2xl font-semibold mb-2'>Task 2 - 카드 게임</h2>
          <p className='text-gray-600'>플레이어 카드 게임 구현</p>
        </Link>
        <Link
          to='/task3'
          className='p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'
        >
          <h2 className='text-2xl font-semibold mb-2'>Task 3 - 문자열 처리</h2>
          <p className='text-gray-600'>문자열 처리 구현</p>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;

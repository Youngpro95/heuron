import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='bg-gray-50 border-b border-gray-200 px-5 py-4'>
      <ul className='flex gap-5'>
        <li>
          <Link to='/' className='text-gray-700 hover:text-blue-600 font-medium'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/task1' className='text-gray-700 hover:text-blue-600 font-medium'>
            Task 1 - 이미지 갤러리
          </Link>
        </li>
        <li>
          <Link to='/task2' className='text-gray-700 hover:text-blue-600 font-medium'>
            Task 2 - 카드 게임
          </Link>
        </li>
        <li>
          <Link to='/task3' className='text-gray-700 hover:text-blue-600 font-medium'>
            Task 3 - 문자열 처리
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Navbar);

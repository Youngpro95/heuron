import React from 'react';
import { useTask1 } from '../_hooks/useTask1';
import { useImageContext } from './ImageContent';

function Task1() {
  const {
    isLoading,
    error,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    retryFetch,
    resetTransform,
    isDragging,
  } = useTask1();

  const { isGrayscale, toggleGrayscale } = useImageContext();

  return (
    <div className='min-h-screen flex flex-col items-center p-10'>
      <h1 className='text-2xl font-bold mb-4'>Task 1 - Image Gallery</h1>

      <div className='mb-4 flex items-center gap-4'>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={isGrayscale}
            onChange={toggleGrayscale}
            className='form-checkbox'
            disabled={isLoading}
          />
          <span>흑백 모드</span>
        </label>

        <button
          onClick={retryFetch}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
          disabled={isLoading}
        >
          다른 이미지
        </button>

        <button
          onClick={resetTransform}
          className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50'
          disabled={isLoading}
        >
          초기화
        </button>
      </div>

      <div
        className='w-full min-h-[600px] flex justify-center items-center '
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className='relative w-[800px] h-[600px] border border-gray-200 rounded-lg overflow-hidden'>
          {isLoading && (
            <div className='absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center'>
              <div className='text-gray-600'>로딩 중...</div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            className={`w-full h-full object-contain ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              imageRendering: 'crisp-edges',
              touchAction: 'none',
            }}
          />
        </div>
      </div>
      <span>오른쪽 드래그 : 확대, 왼쪽 드래그 : 축소</span>

      {error && (
        <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-red-600'>{error}</p>
          <button
            onClick={retryFetch}
            className='mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

export default Task1;

import React from 'react';
import { useTask2 } from '../_hooks/useTask2';

function Task2() {
  const {
    players,
    winner,
    playerCount,
    cardCount,
    currentStep,
    setPlayerCount,
    setCardCount,
    startGame,
    nextStep,
    resetGame,
    showFinalResults,
  } = useTask2();

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Task 2 - Card Game</h1>

      {currentStep === 0 && (
        <div className='mb-6 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>플레이어 수</label>
            <input
              type='number'
              min='2'
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className='border rounded px-3 py-2'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>카드 수</label>
            <input
              type='number'
              min='1'
              value={cardCount}
              onChange={(e) => setCardCount(Number(e.target.value))}
              className='border rounded px-3 py-2'
            />
          </div>

          <button
            onClick={startGame}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            게임 시작
          </button>
        </div>
      )}

      {currentStep > 0 && currentStep <= players.length && (
        <div className='space-y-6'>
          <div className='mt-4 p-4 bg-blue-50 rounded-lg'>
            <h2 className='text-xl font-semibold '>{players[currentStep - 1].name}의 카드</h2>
            <p>카드: {players[currentStep - 1].cards.join(', ')}</p>
            <p>총점: {players[currentStep - 1].total}</p>
            <div className='mt-4 flex gap-4'>
              <button
                onClick={nextStep}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
              >
                다음 플레이어
              </button>
              <button
                onClick={showFinalResults}
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
              >
                결과 보기
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep > players.length && winner && (
        <div className='space-y-6'>
          <div className='p-4 bg-green-50 rounded-lg'>
            <h2 className='text-xl font-semibold '>승자</h2>
            <p>승자: {winner.name}</p>
            <p>점수: {winner.total}</p>
            <p>보유카드: {winner.cards.join(', ')}</p>
          </div>

          <div className='p-4 bg-gray-50 rounded-lg'>
            <h2 className='text-xl font-semibold '>전체 결과</h2>
            {players.map((player, index) => (
              <div
                key={index}
                className={`mb-3 p-3 rounded ${player === winner ? 'bg-green-100' : 'bg-white'}`}
              >
                <p className='font-semibold'>{player.name}</p>
                <p>점수: {player.total}</p>
                <p>카드: {player.cards.join(', ')}</p>
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            새 게임 시작
          </button>
        </div>
      )}
    </div>
  );
}

export default Task2;

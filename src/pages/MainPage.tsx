import React from "react";

function MainPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Heuron Frontend Assignment</h1>
      <div className="grid gap-5 max-w-3xl">
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Task 1 - Image Gallery</h2>
          <p className="text-gray-600">Canvas API를 활용한 이미지 갤러리 구현</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Task 2 - Card Game</h2>
          <p className="text-gray-600">플레이어 카드 게임 구현</p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Task 3 - String Processing</h2>
          <p className="text-gray-600">문자열 처리 구현</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

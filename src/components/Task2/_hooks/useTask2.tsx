import { useState, useCallback } from 'react';

interface Player {
  name: string;
  cards: number[];
  total: number;
}

interface UseTask2Result {
  players: Player[];
  winner: Player | null;
  playerCount: number;
  cardCount: number;
  currentStep: number;
  showAllResults: boolean;
  setPlayerCount: (count: number) => void;
  setCardCount: (count: number) => void;
  startGame: () => void;
  nextStep: () => void;
  resetGame: () => void;
  showFinalResults: () => void;
}

export const useTask2 = (): UseTask2Result => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<Player | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [cardCount, setCardCount] = useState<number>(4);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showAllResults, setShowAllResults] = useState<boolean>(false);

  const startGame = useCallback(() => {
    const generateCards = (count: number) =>
      Array.from({ length: count }, () => Math.floor(Math.random() * 20) + 1);

    // 플레이어 생성
    const newPlayers = Array.from({ length: playerCount }, (_, index) => {
      const cards = generateCards(cardCount);
      return {
        name: `Player ${index + 1}`,
        cards,
        total: cards.reduce((sum, card) => sum + card, 0),
      };
    });

    setPlayers(newPlayers);
    setCurrentStep(1);
  }, [playerCount, cardCount]);

  const nextStep = useCallback(() => {
    // 마지막 플레이어까지 진행되지 않은 경우만 다음 단계로
    if (currentStep >= players.length + 1) {
      return;
    }

    // 마지막 플레이어인 경우 결과 도출
    if (currentStep === players.length) {
      const winner = players.reduce((prev, current) => {
        return current.total >= prev.total ? current : prev;
      });
      setWinner(winner);
    }

    setCurrentStep((prev) => prev + 1);
  }, [currentStep, players]);

  const resetGame = useCallback(() => {
    setPlayers([]);
    setWinner(null);
    setCurrentStep(0);
    setShowAllResults(false);
  }, []);

  const showFinalResults = useCallback(() => {
    const winner = players.reduce((prev, current) =>
      current.total >= prev.total ? current : prev,
    );
    setWinner(winner);
    setCurrentStep(players.length + 1);
  }, [players]);

  return {
    players,
    winner,
    playerCount,
    cardCount,
    currentStep,
    showAllResults,
    setPlayerCount,
    setCardCount,
    startGame,
    nextStep,
    resetGame,
    showFinalResults,
  };
};

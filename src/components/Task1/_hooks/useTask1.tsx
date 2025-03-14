import { useState, useEffect, useCallback, useRef } from 'react';
import { useImageContext } from '../_components/ImageContent';

interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface UseTask1Result {
  image: Image | null;
  isLoading: boolean;
  error: string | null;
  isGrayscale: boolean;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  retryFetch: () => void;
  resetTransform: () => void;
}

export const useTask1 = (): UseTask1Result => {
  const { isGrayscale } = useImageContext();
  const [image, setImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const rotationRef = useRef(0);
  //중앙지점 좌표
  const centerPointRef = useRef({ x: 400, y: 300 });
  //확대 중앙지점 좌표
  const lastZoomCenterRef = useRef({ x: 400, y: 300 });

  // 이미지 그리기
  const drawImage = useCallback(
    (img: HTMLImageElement) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const canvas = canvasRef.current;
      canvas.classList.add('grabbing');
      canvas.width = 800;
      canvas.height = 600;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // 회전이 있을 때만 회전 변환 적용
      if (rotationRef.current !== 0) {
        ctx.translate(400, 300);
        ctx.rotate((rotationRef.current * Math.PI) / 180);
        ctx.translate(-400, -300);
      }

      // scale이 1보다 작으면 중앙 기준, 크면 마우스 위치 기준
      const center = scaleRef.current <= 1 ? { x: 400, y: 300 } : lastZoomCenterRef.current;

      ctx.translate(center.x, center.y);
      ctx.scale(scaleRef.current, scaleRef.current);
      ctx.translate(-center.x, -center.y);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      if (isGrayscale) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    },
    [isGrayscale],
  );

  // 마우스 이벤트 핸들러
  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current || !image) return;

      const dx = e.clientX - startPosRef.current.x;

      if (e.buttons === 1) {
        if (dx > 0) {
          // 오른쪽으로 드래그: 확대
          scaleRef.current += dx * 0.005;
          // 확대할 때만 새로운 중심점 설정
          lastZoomCenterRef.current = centerPointRef.current;
        } else {
          // 왼쪽으로 드래그: 축소
          const newScale = scaleRef.current - Math.abs(dx) * 0.005;
          scaleRef.current = Math.max(0.7, newScale);
          // 축소할 때는 마지막 확대 지점 유지
        }
      } else if (e.buttons === 2) {
        rotationRef.current += dx * 0.5;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => drawImage(img);
      img.src = image.download_url;

      startPosRef.current = { x: e.clientX, y: e.clientY };
    },
    [image, drawImage],
  );

  const handleGlobalMouseUp = useCallback(() => {
    isDraggingRef.current = false;

    // 드래그 끝날 때 grabbing 클래스 제거
    if (canvasRef.current) {
      canvasRef.current.classList.remove('grabbing');
    }

    window.removeEventListener('mousemove', handleGlobalMouseMove);
    window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [handleGlobalMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let x = mouseX;
      let y = mouseY;

      // 회전이 있을 때만 회전 변환 계산
      // https://end-of-code.tistory.com/33 참고
      if (rotationRef.current !== 0) {
        const translatedX = mouseX - 400;
        const translatedY = mouseY - 300;

        const angle = (rotationRef.current * Math.PI) / 180;
        const rotatedX = translatedX * Math.cos(-angle) - translatedY * Math.sin(-angle);
        const rotatedY = translatedX * Math.sin(-angle) + translatedY * Math.cos(-angle);

        x = rotatedX + 400;
        y = rotatedY + 300;
      }

      // scale 고려한 좌표 계산
      const currentScale = scaleRef.current;
      const lastCenter = lastZoomCenterRef.current;

      x = (x - lastCenter.x) / currentScale + lastCenter.x;
      y = (y - lastCenter.y) / currentScale + lastCenter.y;

      isDraggingRef.current = true;
      startPosRef.current = { x: e.clientX, y: e.clientY };
      centerPointRef.current = { x, y };

      canvasRef.current.classList.add('grabbing');

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    },
    [handleGlobalMouseMove, handleGlobalMouseUp],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [handleGlobalMouseMove]);

  const resetTransform = useCallback(() => {
    scaleRef.current = 1;
    rotationRef.current = 0;
    centerPointRef.current = { x: 400, y: 300 };
    lastZoomCenterRef.current = { x: 400, y: 300 };

    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // grayScale 처리 위해 필요
      img.onload = () => drawImage(img);
      img.src = image.download_url;
    }
  }, [image, drawImage]);

  const fetchImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://picsum.photos/v2/list');
      if (!response.ok) throw new Error(`error status: ${response.status}`);
      const data = await response.json();
      const randomImage = data[Math.floor(Math.random() * data.length)];
      setImage(randomImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // grayScale 처리 위해 필요
    img.onload = () => {
      try {
        drawImage(img);
      } catch (err) {
        setError('이미지 처리 중 오류가 발생했습니다.');
      }
    };
    img.onerror = () => {
      setError('이미지 로드에 실패했습니다.');
    };
    img.src = image.download_url;
  }, [image, drawImage]);

  return {
    image,
    isLoading,
    error,
    isGrayscale,
    canvasRef,
    handleMouseDown,
    handleMouseMove: handleGlobalMouseMove as unknown as (e: React.MouseEvent) => void,
    handleMouseUp: handleGlobalMouseUp,
    retryFetch: fetchImage,
    resetTransform,
  };
};

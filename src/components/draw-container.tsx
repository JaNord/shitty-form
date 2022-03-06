import { useEffect, useRef, useState } from "react";

export const DrawContainer = ({
  width,
  height,
  variant = "primary",
}: {
  width: string;
  height: string;
  variant?: "primary" | "secondary" | "accent";
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const lineColor = "white";

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = lineColor;
        ctxRef.current = ctx;
      }
    }
  }, [canvasRef.current]);

  const startDrawing = (e: any) => {
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current?.stroke();
  };

  const endDrawing = () => {
    ctxRef.current?.closePath();
    setIsDrawing(false);
  };
  return (
    <canvas
      className={`border border-solid border-${variant} text-`}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

import { useEffect, useRef, useState } from "react";
import { getText } from "../api";

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

  const formRef = useRef<HTMLFormElement>(null);

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

  const sendImage = () => {
    const canvas = canvasRef.current?.toDataURL();
    if (canvas) {
      var blobBin = atob(canvas.split(",")[1]);
      var array = [];
      for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      var file = new Blob([new Uint8Array(array)], { type: "image/png" });
      getText(file).then((text) => {
        console.log(text);
      });
    }
  };
  return (
    <>
      <canvas
        className={`border border-solid border-${variant} text-`}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        width={width}
        height={height}
      />
      <button className="btn btn-primary" onClick={sendImage}>
        Send
      </button>
    </>
  );
};

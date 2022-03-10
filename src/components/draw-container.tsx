import { useEffect, useRef, useState } from "react";
import { getText } from "../api";
import useStore from "../store";
import { fallBack } from "./form/fallback";
import steps from "./form/steps";
import LoadingIndicator from "./loading-indicator";

export const DrawContainer = ({
  width,
  bumpStepIndex,
  height,
  step_index,
  variant = "primary",
}: {
  bumpStepIndex: () => void;
  className?: string;
  height?: string | number;
  step_index: number;
  variant?: "primary" | "secondary" | "accent";
  width?: string | number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lineColor = "white";
  const setFormState = useStore((state) => state.setFormState);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = lineColor;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  const sendImage = async () => {
    setIsLoading(true);
    const canvas = canvasRef.current?.toDataURL();
    if (canvas) {
      const blobBin = atob(canvas.split(",")[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const file = new Blob([new Uint8Array(array)], { type: "image/png" });

      const res = await getText(file);
      const name = steps[step_index].name;
      const val = res?.text?.replace(/(\r\n|\n|\r)/gm, "");
      setFormState(name, val || fallBack[name]);
      bumpStepIndex();
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingIndicator className="h-full" />;
  }

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
        color="black"
      />
      <button className="btn btn-primary mt-3 mr-auto ml-auto" onClick={sendImage}>
        Send
      </button>
    </>
  );
};

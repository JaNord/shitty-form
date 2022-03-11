import { useEffect, useRef, useState } from "react";
import { getText } from "../api";
import useStore from "../store";
import { fallBack } from "./form/fallback";
import steps from "./form/steps";
import LoadingIndicator from "./loading-indicator";

export const DrawContainer = ({
  width,
  bumpStepIndex,
  step_index,
  variant = "primary",
}: {
  bumpStepIndex: () => void;
  className?: string;
  step_index: number;
  variant?: "primary" | "secondary" | "accent";
  width: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const ctxRef = useRef<CanvasRenderingContext2D>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lineColor = "white";
  const setFormState = useStore((state) => state.setFormState);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

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

      var heightRatio = 0.75;
      canvas.width = width;
      canvas.height = canvas.width * heightRatio;
    }
  }, [canvasRef.current, width]);

  const startDrawing = (e: any) => {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;

    if (e.touches) {
      const touch = e.touches[0];

      x = touch.pageX - touch.target.offsetLeft;
      y = touch.pageY - touch.target.offsetTop;
    }

    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;

    if (e.nativeEvent.touches) {
      const touch = e.touches[0];
      x = touch.pageX - touch.target.offsetLeft;
      y = touch.pageY - touch.target.offsetTop;
    }

    if (!isDrawing) {
      return;
    }

    ctxRef.current?.lineTo(x, y);
    ctxRef.current?.stroke();
  };

  const endDrawing = () => {
    ctxRef.current?.closePath();
    setHasDrawn(true);
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
      let res;

      // Removes empty calls to the API, saves bandwidth and money
      if (!hasDrawn) {
        // wait for 1s to simulate latency..
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        res = await getText(file);
      }
      const name = steps[step_index].name;
      const val = res?.text?.replace(/(\r\n|\n|\r)/gm, "");
      setFormState(name, val || fallBack[name]);
      bumpStepIndex();
    }
    canvasRef.current = undefined;
    ctxRef.current = undefined;
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingIndicator className="h-full" />;
  }

  return (
    <>
      <canvas
        style={{ touchAction: "none" }}
        className={`ml-auto mr-auto border border-solid border-${variant}`}
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
        onMouseUp={endDrawing}
        onTouchEnd={endDrawing}
        onMouseMove={draw}
        onTouchMove={draw}
        ref={canvasRef as any}
        color="black"
      />
      <button className="btn btn-primary mt-3 mr-auto ml-auto justify-self-center" onClick={sendImage}>
        Lägg till
      </button>
    </>
  );
};

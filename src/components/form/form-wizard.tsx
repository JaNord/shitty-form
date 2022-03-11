import { useEffect, useState } from "react";
import useStore from "../../store";
import { Captcha } from "../captcha";
import { DrawContainer } from "../draw-container";
import steps from "./steps";

export const FormWizard = () => {
  const [step_index, setStep_index] = useState<number>(0);
  const [width, setWidth] = useState<number>(800);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { formState } = useStore();

  useEffect(() => {
    const resize = () => {
      if (screen.width > 600) {
        setWidth(600);
      } else {
        setWidth(screen.width - 20);
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", resize);
  }, [screen.width]);

  if (step_index === steps.length) {
    return (
      <div className="lg:max-w-md sm:w-full p-3 mr-auto ml-auto text-center">
        <h1>Nästan klar!</h1>
        <span>Kontrollera dina uppgifter nedan:</span>
        {steps.map((step) => {
          const value = (formState as any)[step.name];

          return (
            <>
              <div key={step.id} className="w-full flex justify-between border-b-2 border-gray-600">
                <div>{step.label}</div>
                <div>{value}</div>
              </div>
            </>
          );
        })}
        <Captcha onCorrectAnswer={() => setCanSubmit(true)} />
        <button className="btn btn-primary" disabled={!canSubmit}>
          Anmäl dig
        </button>
      </div>
    );
  }
  const step = steps[step_index];

  return (
    <div className="lg:max-w-4xl sm:w-full p-2 mr-auto ml-auto">
      <div className="flex flex-col">
        <h2 className="text-xl text-center p-4">
          <span className="text-md text-slate-500 pr-3">
            {step_index + 1}/{steps.length}
            {"   "}
          </span>
          {step.label}
        </h2>
        <DrawContainer
          width={width}
          step_index={step_index}
          bumpStepIndex={() => setStep_index(step_index + 1)}
          className="mr-auto ml-auto"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default FormWizard;

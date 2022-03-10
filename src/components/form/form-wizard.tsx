import { useEffect, useState } from "react";
import useStore from "../../store";
import { Captcha } from "../captcha";
import { DrawContainer } from "../draw-container";
import steps from "./steps";

export const FormWizard = () => {
  const [step_index, setStep_index] = useState<number>(0);
  const [width, setWidth] = useState<string>("800");
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { formState } = useStore();

  useEffect(() => {
    const w = screen.width;
    if (w < 1024) {
      setWidth("600");
    }
    if (w < 480) {
      setWidth("300");
    } else {
      setWidth("800");
    }
  }, []);

  if (step_index === steps.length) {
    return (
      <div className="lg:max-w-md sm:w-full p-3 mr-auto ml-auto text-center">
        <h1>Tack för din anmälan!</h1>
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
    <div className="lg:max-w-4xl sm:w-full mr-auto ml-auto">
      <div>
        <h2 className="text-xl text-center p-4">{step.label}</h2>
        <DrawContainer
          height={"300"}
          width={width}
          step_index={step_index}
          bumpStepIndex={() => setStep_index(step_index + 1)}
          className="mr-auto ml-auto"
        />
      </div>
    </div>
  );
};

export default FormWizard;

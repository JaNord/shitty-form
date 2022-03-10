import { useState } from "react";

export const Captcha = () => {
  const [captcha, setCaptcha] = useState<string>("lorem ipsum");
  const [captchaAnswer, setCaptchaAnswer] = useState<string>("");

  const checkAnswer = () => {
    if (captchaAnswer === captcha) {
      alert("Rätt svar!");
    } else {
      alert("Fel svar!");
      setCaptcha("lorem ipsum dolor");
    }
  };

  return (
    <div className="max-w-xl ml-auto mr-auto m-2 transition-all z-10 bg-slate-500 p-5 rounded-md mt-5 text-center">
      <p>This captach will check your mathematical skills</p>
      <span>Because computers are shitty at math</span>
      <div className="bg-white rounded-md p-2 text-black mt-2">
        <code>{captcha}</code>
      </div>
      <form className="m-3">
        <input
          type="text"
          value={captchaAnswer}
          placeholder="Answer"
          className="input input-bordered input-primary w-6/12"
          onChange={({ target }) => setCaptchaAnswer(target.value)}
        />
        <input type="button" value="Check" className="btn btn-primary ml-3" onClick={checkAnswer} />
      </form>
    </div>
  );
};

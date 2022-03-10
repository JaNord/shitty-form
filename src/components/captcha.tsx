import { useState, useEffect } from "react";

const captachaImages = [
  "/captcha/1.png",
  "/captcha/2.png",
  "/captcha/3.png",
  "/captcha/4.png",
  "/captcha/5.png",
  "/captcha/6.png",
  "/captcha/7.png",
  "/captcha/8.png",
  "/captcha/9.png",
];

export const Captcha = ({ onCorrectAnswer }: { onCorrectAnswer: () => void }) => {
  const [captcha, setCaptcha] = useState<string>("");
  const [captchaAnswer, setCaptchaAnswer] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * captachaImages.length);
    setCaptcha(captachaImages[randomIndex]);
  }, []);

  const getRandomCaptcha = () => {
    const randomIndex = Math.floor(Math.random() * captachaImages.length);
    const randomCaptcha = captachaImages[randomIndex];
    setCaptcha(randomCaptcha);
  };

  const checkAnswer = () => {
    if (captchaAnswer === "1337") {
      alert("Väl gjort!");
      onCorrectAnswer();
    } else {
      alert("Fel!");
      getRandomCaptcha();
    }
  };

  return (
    <div className="max-w-xl ml-auto mr-auto m-2 transition-all z-10 bg-slate-500 p-5 rounded-md mt-5 text-center">
      <p>Bevisa din värdighet att delta i festligheterna!</p>
      <span className="text-zinc-400">Ange svaret på problement nedan</span>
      <div className="bg-white rounded-md p-2 text-black mt-2">
        <img src={captcha} alt="captcha" />
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

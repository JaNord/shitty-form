import { Captcha } from "./components/captcha";
import { CookieHeader } from "./components/cookie-header";
import { DrawContainer } from "./components/draw-container";
import { Form } from "./components/form";
import { SimpleImageForm } from "./components/image-form";

export const App = () => {
  return (
    <>
      <CookieHeader />
      <DrawContainer width="200" height="200" />
      {/* <Form /> */}
      <SimpleImageForm />
      <Captcha />
    </>
  );
};

export default App;

import { Captcha } from "./components/captcha";
import { CookieHeader } from "./components/cookie-header";
import FormWizard from "./components/form/form-wizard";
import useStore from "./store";

export const App = () => {
  const formState = useStore((state) => state.formState);
  console.log(formState);

  return (
    <>
      <CookieHeader />
      <FormWizard />
    </>
  );
};

export default App;

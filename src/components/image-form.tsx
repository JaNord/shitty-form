import { getText } from "../api";

export const SimpleImageForm = () => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const image = data.get("image") as File;
    getText(image);
  };

  return (
    <form onSubmit={submit}>
      <input type="file" name="image" />
      <input className="btn primary" type="submit" value="Submit" />
    </form>
  );
};

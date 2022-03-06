import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  anon: boolean;
  menu: string;
  drink: string;
  allergies: string;
  date_member: boolean;
  seating_pref: string;
  greeting: string;
  represent: string;
  misc: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  anon: false,
  menu: "",
  drink: "",
  allergies: "",
  date_member: false,
  seating_pref: "",
  greeting: "",
  represent: "",
  misc: "",
};

export const Form = () => {
  const [state, setState] = useState<FormState>(initialState);

  const setValue = (name: string, value: string | boolean) => {
    const nextState = { ...state, [name]: value };
    setState(nextState);
  };

  return (
    <div className="max-w-md mt-5 ml-auto mr-auto">
      <div className="form-control space-y-1">
        <span className="">Namn</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="input input-bordered input-primary w-full"
        />
        <span className="">Email</span>
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="input input-bordered input-primary w-full"
        />
        <label className="label cursor-pointer">
          <span className="label-text">Anonymt</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            name="anon"
            checked={state.anon}
            onChange={({ target }) => setValue(target.name, target.checked)}
          />
        </label>
        <span>Val av mat</span>
        <select
          name="menu"
          value={state.menu}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="select select-primary w-full"
        >
          <option label="Carnivore" value="carnivore" />
          <option label="Herbivore" value="herbivore" />
        </select>
        <span>Val av dryck</span>
        <select
          name="drink"
          value={state.drink}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="select select-primary w-full"
        >
          <option label="Poseidon" value="poseidon" />
          <option label="Dionysus" value="dionysus" />
        </select>
        <span className="">Allergier och specialdieter:</span>
        <input
          type="text"
          name="allergies"
          value={state.allergies}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="input input-bordered input-primary w-full"
        />
        <label className="label cursor-pointer">
          <span className="label-text">Är du Date medlem?</span>
          <input
            type="checkbox"
            name="date_member"
            checked={state.date_member}
            onChange={({ target }) => setValue(target.name, target.checked)}
            className="checkbox checkbox-primary"
          />
        </label>
        <span className="">Bordssällskaps önskemål</span>
        <input
          type="text"
          name="seating_pref"
          value={state.seating_pref}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="input input-bordered input-primary w-full"
        />
        <span className="">Jag framför hälsning vid Solenna Akten</span>
        <input
          type="text"
          name="greeting"
          value={state.greeting}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="input input-bordered input-primary w-full"
        />
        <span className="">Jag representerar (t.ex. en förening)</span>
        <input
          type="text"
          name="represent"
          value={state.represent}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="input input-bordered input-primary w-full"
        />
        <span className="">Övrigt</span>
        <input
          type="text"
          name="misc"
          value={state.misc}
          onChange={({ target }) => setValue(target.name, target.value)}
          className="input input-bordered input-primary w-full"
        />
      </div>
      <button className="btn btn-primary mt-10 w-full">Send me Daddy</button>
    </div>
  );
};

import create from "zustand";

interface FormState {
  name: string;
  email: string;
  anonymous: string;
  menu_pref: string;
  drink_pref: string;
  diet_allergy: string;
  date_member: string;
  seating_pref: string;
  greeting: string;
  guild_represented: string;
  misc: string;
}

interface Store {
  formState: FormState;
  setFormState: (name: string, value: string) => void;
}

const initialState: FormState = {
  name: "",
  email: "",
  anonymous: "",
  menu_pref: "",
  drink_pref: "",
  diet_allergy: "",
  date_member: "",
  seating_pref: "",
  greeting: "",
  guild_represented: "",
  misc: "",
};

const useStore = create<Store>((set) => ({
  formState: initialState,
  setFormState: (name, value) => set((state) => ({ formState: { ...state.formState, [name]: value } })),
}));

export default useStore;

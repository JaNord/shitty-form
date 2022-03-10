interface Step {
  id: number;
  name: string;
  label: string;
}

export const steps: Step[] = [
  {
    id: 1,
    name: "name",
    label: "Namn",
  },
  {
    id: 2,
    name: "email",
    label: "E-post",
  },
  {
    id: 3,
    name: "anonymous",
    label: "Anonymt",
  },
  {
    id: 4,
    name: "menu_pref",
    label: "Meny",
  },
  {
    id: 5,
    name: "drink_pref",
    label: "Dryck",
  },
  {
    id: 6,
    name: "diet_allergy",
    label: "Allergi",
  },
  {
    id: 7,
    name: "date_member",
    label: "Medlem",
  },
  {
    id: 8,
    name: "seating_pref",
    label: "Bordssällskap",
  },
  {
    id: 9,
    name: "greeting",
    label: "Hälsning",
  },
  {
    id: 10,
    name: "guild_represented",
    label: "Representation",
  },
  {
    id: 11,
    name: "misc",
    label: "Övrigt",
  },
];

export default steps;

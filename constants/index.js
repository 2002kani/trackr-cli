export const menuChoices = [
  "Create ticket",
  "Show tickets",
  "Clean menu",
  "Leave",
];

export const ticketChoices = {
  urgency: ["Low", "Medium", "High"],
  complexity: ["XS", "S", "M", "L"],
  cost: [
    {
      value: "0",
      label: "0  (Instantly)",
    },
    {
      value: "S",
      label: "S  (1-3 Hours)",
    },
    {
      value: "M",
      label: "M  (Up to a day)",
    },
    {
      value: "L",
      label: "L  (Couple of days)",
    },
  ],
};

const lightTheme = {
  label: "Light",
  background: "#F5F5F5",
  text: "#000000",
  gradient: "linear-gradient(315deg, #74ebd5 0%, #ACB6E5 94%)",
  title: "#2979ff",
  textTypeBox: "#9E9E9E",
  stats: "#3D5AFE",
  fontFamily: "sans-serif",
};

const darkTheme = {
  label: "Dark",
  background: "#1f1b1b",
  /*background: "#121212",*/
  text: "#FAFAFA",
  gradient: "linear-gradient(315deg, #F7971E 0%, #FFD200 94%)",
  /*title: "#ffc107",*/
   title: "#e63232",
  textTypeBox: "#706d6d",
  stats: "#1a89bd",
  fontFamily: "Tomorrow",
};




const defaultTheme = darkTheme;

const themesOptions = [
  { value: darkTheme, label: "Dark" },
  { value: lightTheme, label: "Light" },
  
];

export {
  lightTheme,
  darkTheme,
  defaultTheme,
  themesOptions,
};

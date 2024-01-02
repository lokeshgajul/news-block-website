import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const NewsProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const changeTheme = (value) => {
    setTheme(value);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#1b1b1d";
      document.body.style.color = "#fff";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "black";
    }
  };

  const value = {
    changeTheme,
    toggleTheme,
    theme,
    setTheme,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const NewsHook = () => {
  const NewsContext = useContext(Context);
  if (NewsContext === undefined) {
    throw new Error("hook is not working...");
  } else {
    return NewsContext;
  }
};

export default NewsHook;

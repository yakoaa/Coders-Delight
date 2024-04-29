import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, themesOptions } from "./style/theme";
import { GlobalStyles } from "./style/global";
import TypeBox from "./components/features/TypeBox/TypeBox";
import SentenceBox from "./components/features/SentenceBox/SentenceBox";
import Logo from "./components/common/Logo";

import FreeTypingBox from "./components/features/FreeTypingBox";
import {
  
  GAME_MODE_DEFAULT,
  GAME_MODE_SENTENCE,
} from "./constants/Constants";
import useLocalPersistState from "./hooks/useLocalPersistState";
import DefaultKeyboard from "./components/features/Keyboard/DefaultKeyboard";
import WordsCard from "./components/features/WordsCard/WordsCard";
import {
  SOUND_MODE,
  
  DEFAULT_SOUND_TYPE,
  DEFAULT_SOUND_TYPE_KEY,
} from "./components/features/sound/sound";


function App() {
  // localStorage persist theme setting
  const [theme] = useState(() => {
    const stickyTheme = window.localStorage.getItem("theme");
    if (stickyTheme !== null) {
      const localTheme = JSON.parse(stickyTheme);
      const upstreamTheme = themesOptions.find(
        (e) => e.label === localTheme.label
      ).value;
      // we will do a deep equal here. In case we want to support customized local theme.
      const isDeepEqual = localTheme === upstreamTheme;
      return isDeepEqual ? localTheme : upstreamTheme;
    }
    return defaultTheme;
  });

  // local persist game mode setting
  const [soundMode] = useLocalPersistState(false, SOUND_MODE);

  const [soundType] = useLocalPersistState(
    DEFAULT_SOUND_TYPE,
    DEFAULT_SOUND_TYPE_KEY
  );

  // local persist game mode setting
  const [gameMode] = useLocalPersistState(
    GAME_MODE_DEFAULT,
    
  );

  

  // localStorage persist focusedMode setting
  const [isFocusedMode] = useState(
    localStorage.getItem("focused-mode") === "true"
  );

  // musicMode setting
  const [isMusicMode] = useState(false);

  // coffeeMode setting
  const [isCoffeeMode] = useState(false);

  // trainer mode setting
  const [isTrainerMode] = useState(false);

  // words card mode
  const [isWordsCardMode] = useLocalPersistState(
    false,
    "IsInWordsCardMode"
  );

  const isWordGameMode =
    gameMode === GAME_MODE_DEFAULT &&
    !isCoffeeMode &&
    !isTrainerMode &&
    !isWordsCardMode;
  const isSentenceGameMode =
    gameMode === GAME_MODE_SENTENCE &&
    !isCoffeeMode &&
    !isTrainerMode &&
    !isWordsCardMode;





  useEffect(() => {
    localStorage.setItem("focused-mode", isFocusedMode);
  }, [isFocusedMode]);

  const textInputRef = useRef(null);
  const focusTextInput = () => {
    textInputRef.current && textInputRef.current.focus();
  };

  const textAreaRef = useRef(null);
  const focusTextArea = () => {
    textAreaRef.current && textAreaRef.current.focus();
  };

  const sentenceInputRef = useRef(null);
  const focusSentenceInput = () => {
    sentenceInputRef.current && sentenceInputRef.current.focus();
  };

  useEffect(() => {
    if (isWordGameMode) {
      focusTextInput();
      return;
    }
    if (isSentenceGameMode) {
      focusSentenceInput();
      return;
    }
    if (isCoffeeMode) {
      focusTextArea();
      return;
    }
    return;
  }, [
    theme,
    isFocusedMode,
    isMusicMode,
    isCoffeeMode,
    isWordGameMode,
    isSentenceGameMode,
    soundMode,
    soundType,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <>
        
        <div className="canvas">
          <GlobalStyles />
          <Logo isFocusedMode={isFocusedMode} isMusicMode={isMusicMode}></Logo>
          {isWordGameMode && (
            <TypeBox
              textInputRef={textInputRef}
              isFocusedMode={isFocusedMode}
              soundMode={soundMode}
              soundType={soundType}
              key="type-box"
              handleInputFocus={() => focusTextInput()}
            ></TypeBox>
          )}
          {isSentenceGameMode && (
            <SentenceBox
              sentenceInputRef={sentenceInputRef}
              isFocusedMode={isFocusedMode}
              soundMode={soundMode}
              soundType={soundType}
              key="sentence-box"
              handleInputFocus={() => focusSentenceInput()}
            ></SentenceBox>
          )}
          {isCoffeeMode && !isTrainerMode && !isWordsCardMode && (
            <FreeTypingBox
              textAreaRef={textAreaRef}
              soundMode={soundMode}
              soundType={soundType}
            />
          )}
          {isTrainerMode && !isCoffeeMode && !isWordsCardMode && (
            <DefaultKeyboard
              soundMode={soundMode}
              soundType={soundType}
            ></DefaultKeyboard>
          )}
          {isWordsCardMode && !isCoffeeMode && !isTrainerMode && (
            <WordsCard soundMode={soundMode} soundType={soundType}></WordsCard>
          )}
          <div className="bottomBar">
         
          </div>
          
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;

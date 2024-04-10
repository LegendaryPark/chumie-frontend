import React, { useState, useEffect } from "react";
import "./Game.css";
import { getWordPairs } from "../services/wordPairService";
import { shuffleArray } from "../utils/listUtil";

interface GameProps {
  displayGrade: boolean;
}

const Game: React.FC<GameProps> = ({ displayGrade }) => {
  const [pairs, setParis] = useState<WordPair[]>([]);
  const [englishList, setEnglishList] = useState<string[]>([]);
  const [frenchList, setFrenchList] = useState<string[]>([]);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [selectedFrench, setSelectedFrench] = useState<string | null>(null);
  const [grades, setGrades] = useState<number>(0);

  useEffect(() => {
    handleSetPairs();
  }, [displayGrade]);

  useEffect(() => {
    if (selectedEnglish && selectedFrench) {
      const targetFrench = pairs.find(
        (p) => p.english === selectedEnglish
      )?.french;

      if (targetFrench === selectedFrench) {
        setGrades((prevGrades) => prevGrades + 1);
      }

      setEnglishList((prevEnglishList) =>
        prevEnglishList.filter((el) => el !== selectedEnglish)
      );
      setFrenchList((prevFrenchList) =>
        prevFrenchList.filter((fl) => fl !== selectedFrench)
      );

      setSelectedEnglish(null);
      setSelectedFrench(null);
    }
  }, [selectedEnglish, selectedFrench]);

  const handleSetPairs = async () => {
    const wordPairs: WordPair[] = await getWordPairs();

    setParis(wordPairs);
    setEnglishList(shuffleArray([...wordPairs.map((wp) => wp.english)]));
    setFrenchList(shuffleArray([...wordPairs.map((wp) => wp.french)]));
  };

  const handleSelectWord = (word: string, language: "english" | "french") => {
    if (language === "english") {
      setSelectedEnglish(word);
    } else {
      setSelectedFrench(word);
    }
  };

  return (
    <>
      {!displayGrade ? (
        <div>{((grades / pairs.length) * 100).toFixed(2)}</div>
      ) : (
        <div className="pairs">
          <div className="list">
            <h4>English Words</h4>
            {englishList.map((english, index) => (
              <p
                key={`${index}-${english}`}
                className={`word ${
                  selectedEnglish === english ? "selected" : ""
                }`}
                onClick={() => handleSelectWord(english, "english")}
              >
                {english}
              </p>
            ))}
          </div>
          <div className="list">
            <h4>French Words</h4>
            {frenchList.map((french, index) => (
              <p
                key={`${index}-${french}`}
                className={`word ${
                  selectedFrench === french ? "selected" : ""
                }`}
                onClick={() => handleSelectWord(french, "french")}
              >
                {french}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Game;

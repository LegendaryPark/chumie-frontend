import baseInstance from "./baseInstance";

export const getWordPairs = async () => {
  try {
    const wordpairs = await baseInstance.get(`wordpair`);
    return wordpairs.data;
  } catch (error) {
    console.error("Failed to fetch word pairs", error);
  }
};

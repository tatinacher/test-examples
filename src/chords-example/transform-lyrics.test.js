import {
  isSetsEqual,
  parseString,
  searchForChords,
  splitByLines,
  transformLyrics,
} from "./transform-lyrics";

const songLine = `C              G                 Am          F
When I find myself in times of trouble, Mother Mary comes to me,`;

const songArr = [
  "C              G                 Am          F",
  "When I find myself in times of trouble, Mother Mary comes to me,",
];

const chordsFromServer = [
  { id: "1", name: "C", color: "red" },
  { id: "2", name: "G", color: "black" },
  { id: "3", name: "Am", color: "green" },
  { id: "4", name: "F", color: "yellow" },
];

const chordsWithInfo = [
  { afterSpaces: 0, beforeSpaces: 0, color: "red", name: "C" },
  { afterSpaces: 0, beforeSpaces: 14, color: "black", name: "G" },
  { afterSpaces: 0, beforeSpaces: 17, color: "green", name: "Am" },
  { afterSpaces: 0, beforeSpaces: 10, color: "yellow", name: "F" },
];

const chords = ["C", "G", "Am", "F"];

describe("Parse lyrics", () => {
  test("0. splitByLines", () => {
    expect(splitByLines(songLine)).toStrictEqual(songArr);
  });

  test("1. parseString", () => {
    expect(parseString(songArr[0])).toStrictEqual(chords);
  });

  test("2. isSetsEqual", () => {
    expect(isSetsEqual(new Set(["a", "b"]), new Set(["b", "a"]))).toBeTruthy();
    expect(isSetsEqual(new Set(["a", "b"]), new Set(["b", "c"]))).toBeFalsy();
  });

  test("3. searchForChords", () => {
    expect(
      searchForChords({ lyrics: songArr[0], chords: chordsFromServer })
    ).toStrictEqual(chordsWithInfo);

    expect(
      searchForChords({ lyrics: songArr[1], chords: chordsFromServer })
    ).toBeNull();
  });

  test("fin. transformLyrics", () => {
    expect(
      transformLyrics({ lyrics: songLine, chords: chordsFromServer })
    ).toStrictEqual([
      {
        content: chordsWithInfo,
        type: "chords",
      },
      {
        content:
          "When I find myself in times of trouble, Mother Mary comes to me,",
        type: "text",
      },
    ]);
  });
});

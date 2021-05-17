export const transformLyrics = ({ lyrics, chords }) => {
  const lyricLines = splitByLines(lyrics);

  const newLyric = lyricLines.map((lyrics) => {
    const songChords = searchForChords({ lyrics, chords });

    if (songChords !== null) {
      return {
        type: "chords",
        content: songChords,
      };
    }
    return {
      type: "text",
      content: lyrics,
    };
  });

  return newLyric;
};

export const splitByLines = (lyrics) => lyrics.split(/\r?\n/);

export const searchForChords = ({ lyrics, chords }) => {
  const lineArray = parseString(lyrics);

  const chordsArray = chords.map(({ name }) => name);
  const arraySet = new Set(chordsArray);

  const intersection = new Set(
    [...lineArray].filter((chord) => arraySet.has(chord))
  );

  if (!isSetsEqual(intersection, new Set([...lineArray]))) {
    return null;
  }

  const regexp = new RegExp(
    `${chordsArray.map((chord) => ` *${chord}`).join("|")}`,
    "g"
  );
  const chordsWithSpaces = lyrics.match(regexp);

  const result = chordsWithSpaces.map((chord) => {
    const beforeSpaces = (chord.match(/ /g) || []).length;
    const name = chord.replace(/ /g, "");
    const chordColor = chords.find((el) => el.name === name);
    return {
      name,
      beforeSpaces,
      afterSpaces: 0,
      color: chordColor.color,
    };
  });

  return result;
};

export const parseString = (line) =>
  line.replace(/\s+/g, " ").trim().split(" ");

export const isSetsEqual = (a, b) =>
  a.size === b.size && [...a].every((value) => b.has(value));

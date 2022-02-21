const parseYoutube = (
  url: string
): { valid: boolean; parsedUrl: string; id: string } => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  const valid = match && match[7].length == 11;
  return {
    valid: !!valid,
    parsedUrl: !!match ? `https://www.youtube.com/embed/${match[7]}` : '',
    id: !!match ? match[7] : '',
  };
};

export default parseYoutube;

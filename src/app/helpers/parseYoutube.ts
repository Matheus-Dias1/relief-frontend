const formatUrl = (id: string): string =>
  `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyClAApomb8To4u6whOWrVDYO526YAVbU78&part=snippet`;

const getYoutubeTitle = async (id: string): Promise<string> => {
  const res = await fetch(formatUrl(id));
  const data = await res.json();

  return data.items[0].snippet.title;
};

const parseYoutube = async (
  url: string
): Promise<{ valid: boolean; parsedUrl: string; title: string }> => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  const valid = match && match[7].length == 11;
  return {
    valid: !!valid,
    parsedUrl: match ? `https://www.youtube.com/embed/${match[7]}` : '',
    title: match ? await getYoutubeTitle(match[7]) : '',
  };
};

export default parseYoutube;

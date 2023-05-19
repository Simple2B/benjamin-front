export const formatTime = (time: number): string => {
  const minutes: number = Math.floor(time / 60);
  const seconds: number = Math.floor(time % 60);
  const formattedMinutes: string =
    minutes < 10 ? `0${minutes}` : String(minutes);
  const formattedSeconds: string =
    seconds < 10 ? `0${seconds}` : String(seconds);
  return `${formattedMinutes}:${formattedSeconds}`;
};

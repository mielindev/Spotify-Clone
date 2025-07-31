export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = "metadata";

    audio.onloadedmetadata = () => {
      resolve(Math.floor(audio.duration));
    };

    audio.onerror = () => {
      reject(new Error("Failed to load audio metadata"));
    };

    audio.src = URL.createObjectURL(file);
  });
};

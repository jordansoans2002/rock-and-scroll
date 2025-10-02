const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3001,
  pptRequestLimits: {
    maxSongs: process.env.MAX_SONGS ? Number(process.env.MAX_SONGS): 20,
    maxSlidesPerSong: process.env.MAX_SLIDES ? Number(process.env.MAX_SLIDES): 200,
    bodyLimit: process.env.BODY_LIMIT ? Number(process.env.BODY_LIMIT) : 1_000_000 // 1MB
  }
};

export default config;
const User = require("../../models/user.model");

const trackTv = async (req, res) => {
  const { userId, seriesId, seriesName, totalSeasons, watchedDate, episodeRuntime, episodeNumber, episodeName, seasonNumber, posterPath } = req.body;

  try {
    console.log(userId, seriesId, seriesName, totalSeasons, watchedDate, episodeNumber, episodeName, seasonNumber, posterPath);
    
    const userFind = await User.findOne({ userId });

    if (userFind) {

      if (!userFind.watchedMedia) {
        userFind.watchedMedia = { movies: [], tvShows: [] };
      }

      const tvFind = userFind.watchedMedia.tvShows.find(item => item.tvId.toString() === seriesId.toString());

      if (tvFind) {

        const seasonFind = tvFind.seasons.find(season => season.seasonNumber === seasonNumber);
        
        if (seasonFind) {
          // If the season exists, check if the episode is already tracked
          const episodeFind = seasonFind.episodes.find(ep => ep.episodeNumber === episodeNumber);

          if (episodeFind) {
            return res.status(200).json({ message: 'Episode already tracked' });
          } else {
            // Add the new episode to the season
            seasonFind.episodes.push({
              episodeNumber,
              episodeName,
              episodeDate: watchedDate,
              episodeStatus: true,
              episodeRuntime,
            });
            await userFind.save();
            return res.status(200).json({ message: `Episode ${episodeNumber} added to tracked season ${seasonNumber}` });
          }
        } else {
          // If season is not tracked, add the season with the episode
          tvFind.seasons.push({
            seasonNumber,
            episodes: [{
              episodeNumber,
              episodeName,
              episodeDate: watchedDate,
              episodeStatus: true
            }]
          });
          await userFind.save();
          return res.status(200).json({ message: `Season ${seasonNumber} and episode ${episodeNumber} added to tracked series` });
        }
      } else {
        // If series is not tracked, add the series with the season and the episode
        userFind.watchedMedia.tvShows.push({
          tvId: seriesId,
          tvShowName: seriesName,
          tvTotalSeasons: totalSeasons, // You can update this later if more seasons are tracked
          seasons: [{
            seasonNumber,
            episodes: [{
              episodeNumber,
              episodeName,
              episodeDate: watchedDate,
              episodeStatus: true
            }]
          }],
          posterPath
        });
        await userFind.save();
        return res.status(200).json({ message: `Series, season ${seasonNumber}, and episode ${episodeNumber} added to tracking` });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error - tracking TV show' });
  }
};

module.exports = trackTv;

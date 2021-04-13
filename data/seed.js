module.exports = async () => {
  const randomString = require('../lib/utils/random-string');
  const randomElement = require('../lib/utils/random-element');
  const randomNumber = require('../lib/utils/random-number');
  const Studios = require('../lib/models/Studios');
  const Films = require('../lib/models/Films');
  const Actors = require('../lib/models/Actors');
  const {
    ActorFilmsAssociation,
    FilmActorsAssociation,
  } = require('../lib/utils/relationships');
  const Reviewers = require('../lib/models/Reviewers');
  const Reviews = require('../lib/models/Reviews');
  const studios = await Studios.bulkCreate(
    Array(3)
      .fill()
      .map(() => ({
        name: randomString(),
        city: randomString(),
        state: randomString(),
        country: randomString(),
      }))
  );
  
  const films = await Films.bulkCreate(
    Array(9).fill().map(() => ({
      title: randomString(),
      StudioId: randomElement(studios).id,
      released: randomNumber(1990, 2021),
      cast: Array(12)
        .fill()
        .map((actor) => ({name: randomString(), dob: new Date(), pob: randomString()})),
    }))
  ,
  {
    include: [
      {
        association: FilmActorsAssociation,
        as: 'cast',
      },
    ],
  });

  const reviewers = await Reviewers.bulkCreate(
    Array(20)
      .fill()
      .map((reviewer) => {
        return {
          name: randomString(),
          company: randomString(),
        };
      })
  );

  await Reviews.bulkCreate(
    Array(150)
      .fill()
      .map((review) => {
        return {
          rating: randomNumber(1, 5),
          ReviewerId: randomElement(reviewers).id,
          review: randomString(),
          FilmId: 1,
        };
      })
  );
};

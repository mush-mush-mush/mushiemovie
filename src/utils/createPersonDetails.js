/* eslint-disable import/no-anonymous-default-export */

export default (person) => {
  return {
    id: person.id,
    name: person.name,
    poster: person.profile_path,
    backdrop: null,
    overviewData: {
      known_for: person.known_for_department,
      gender: person.gender === 2 ? 'Male' : 'Female',
      birthday: new Date(person.birthday).toDateString(),
      deathday: person.deathday ? new Date(person.deathday).toDateString() : null,
      place_of_birth: person.place_of_birth,
      also_known_as: person.also_known_as,
    },
    biography: person.biography,
    credits: person.credits.cast.sort((a, b) => b.popularity - a.popularity),
  };
};

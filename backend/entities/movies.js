import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: {
      type: String,
    },
    date: { type: Date },
    posterPath: {
      type:String,
      nullable:true,
    }
  },

});

export default Movie;
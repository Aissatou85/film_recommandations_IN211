import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id_m: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    title: {
      type: String,
    },
    date: { type: Date },
    posterPath: {
      type:String,
      nullable:true,
    },
    average: {
      type : Number,
      nullable:true,
    },
    description: {
      type : String,
      nullable:true,
    }
  },
  relations: {
    comments: {
      target: 'Comment',
      type: 'one-to-many',
      inverseSide: 'movie',
    }
  }  
});

export default Movie;
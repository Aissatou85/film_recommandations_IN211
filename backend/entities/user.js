import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id_u: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
  },
  relations: {
    comments: {
      target: 'Comment',
      type: 'one-to-many',
      inverseSide: 'user',
    }
  }
});

export default User;

import typeorm from 'typeorm';

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  columns: {
    id_c: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    text: {
      type: String,
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    userId: {
        type: String,  // Assurez-vous que ce type est bien 'uuid'
      },
      movieId: {
        type: String,  // De même pour la relation avec Movie
      }
  },
  relations: {
    user: {
        target: 'User',
        type: 'many-to-one',
        joinColumn: {
          name: 'userId',
        },
        inverseSide: 'comments',
        cascade: true,
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION"
    },
    movie: {
      target: 'Movie',
      type: 'many-to-one',
      joinColumn:{
        name: 'movieId',
      },
      inverseSide: 'comments',
      cascade: true,
    }
  }
});

export default Comment;

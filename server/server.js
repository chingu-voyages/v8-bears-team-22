/* eslint-disable no-console */
import mongod from './mongodb';
import expressApp from './expressApp';

mongod()
  .then((db) => {
    expressApp(db).listen(process.env.PORT || 5000, () => {
      console.log(`App listening on port:${process.env.PORT || 5000}`);
      console.log('🚀 Server ready at http://localhost:5000/graphql');
    });
  })
  .catch((err) => {
    console.error('Failed to make all database connections!');
    console.error(err);
    expressApp(false).listen(process.env.PORT || 5000, () => {
      console.log(`App listening on port:${process.env.PORT || 5000}`);
      console.log('🚀 Server ready at http://localhost:5000/graphql');
    });
  });

export default false;

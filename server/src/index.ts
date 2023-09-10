require('dotenv').config();

import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import expressPlayground from 'graphql-playground-middleware-express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to our API!');
});

const graphqlServer = new ApolloServer({ typeDefs, resolvers });

const startGraphqlServer = async () => {
    await graphqlServer.start();
    graphqlServer.applyMiddleware({ app });
};

const startExpressServer = () => {
    app.listen(port, () => {
        console.log(`Express server running at http://localhost:${port}`);
    });
};

app.get('/graphql', expressPlayground({ endpoint: '/graphql' }));

const startServer = async () => {
    try {
        await startGraphqlServer();
        startExpressServer();
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

startServer();

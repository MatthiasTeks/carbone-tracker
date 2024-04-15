import 'reflect-metadata';
import http from 'http';
import express from 'express';
import cors from 'cors';
import Cookies from 'cookies';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSchema } from 'type-graphql';
import { jwtVerify } from 'jose';
import { db } from './db';
import BookResolver from './resolvers/bookResolver';
import UserResolver from './resolvers/user/user-resolver';
import User from './entities/user/user';
import customAuthChecker from './lib/auth-checker';
import UserService from './services/user-service';
import CategoryResolver from './resolvers/category/category-resolvers';
import ActivityEntryResolver from './resolvers/activity-entry/activity-entry-resolvers';

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
}

export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [
      BookResolver,
      UserResolver,
      CategoryResolver,
      ActivityEntryResolver,
    ],
    validate: false,
    authChecker: customAuthChecker,
  });
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: User | null = null;

        const cookies = new Cookies(req, res);
        const token = cookies.get('token');
        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.SECRET_KEY),
            );
            const { email } = verify.payload;
            user = await UserService.readByMail(email);
          } catch (err) {
            console.error(err);
          }
        }
        return { req, res, user };
      },
    }),
  );

  await db.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4001 }, resolve),
  );
  console.info(`🚀 Server run on http://localhost:4001/`);
}

main();

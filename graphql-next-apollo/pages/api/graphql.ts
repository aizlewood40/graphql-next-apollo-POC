import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';

import { prisma } from "../../prisma/db";
import allowCors from '@/utils/cors';


export type Context = {
  prisma: PrismaClient
}

const resolvers = {
  Query: {
    getAllPokemon: async(parent: any, args: any, context: Context) => {
      return await context.prisma.pokemon.findMany();
    },
  },
};

const typeDefs = `#graphql
  enum PokemonType {
    Bug
    Dark
    Dragon
    Electric
    Fairy
    Fighting
    Fire
    Flying
    Ghost
    Grass
    Ground
    Ice
    Normal
    Poison
    Psychic
    Rock
    Steel
    Water
  }
  type Pokemon {
    id: ID!
    name: String
    captured: Boolean
    imgUrl: String
    pokemonType: [PokemonType]
  }
  type Query {
    getAllPokemon: [Pokemon]
  }
`;


const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
  includeStacktraceInErrorResponses: true,
});



export const config = {
  api: { bodyParser: false },
};


const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({req, res, prisma}),
});

export default allowCors(handler);
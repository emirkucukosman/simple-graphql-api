const { GraphQLServer } = require("graphql-yoga");

const books = [
  {
    id: 0,
    title: "Game of Thrones",
    author: "George R. R. Martin",
    price: 20,
  },
  {
    id: 1,
    title: "Martian",
    author: "Andy Weir",
    price: 10,
  },
];

const typeDefs = `
    type Book {
        id: ID!
        title: String!
        author: String!
        price: Int!
    }

    type Query {
        books: [Book!],
        book(id: ID!): Book
    }

    type Mutation {
        addBook(title: String!, author: String!, price: Int!): ID!,
        removeBook(id: ID!): [Book!],
    }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, { id }) => books.find((b) => b.id == id),
  },
  Mutation: {
    addBook: (parent, { title, author, price }) => {
      const id = books.length;
      books.push({
        id,
        title,
        author,
        price,
      });
      return id;
    },
    removeBook: (parent, { id }) => books.filter((b) => b.id != id),
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running at http://localhost:4000"));

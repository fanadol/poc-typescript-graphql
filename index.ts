import { ApolloServer, gql } from "apollo-server";

const authors = [
  {
    name: "J.K. Rowling",
    age: 54,
    books: [
      {
        title: "Harry Potter and the Chamber of Secrets"
      },
      {
        title: "Fantastic Beast And Where to Find Them"
      }
    ]
  },
  {
    name: "Michael Crichton",
    age: 64,
    books: [
      {
        title: "Prey"
      },
      {
        title: "Jurassic Park"
      }
    ]
  }
];

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: {
      name: "J.K. Rowling",
      age: 53,
      books: [
        {
          title: "Harry Potter and the Chamber of Secrets"
        },
        {
          title: "Fantastic Beast And Where to Find Them"
        }
      ]
    }
  },
  {
    title: "Jurassic Park",
    author: {
      name: "Michael Crichton",
      age: 64,
      books: [
        {
          title: "Prey"
        },
        {
          title: "Jurassic Park"
        }
      ]
    }
  }
];

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    age: Int
    books: [Book]
  }

  type Query {
    getAuthor(name: String!): Author
    getAuthors: [Author]
    getBook(title: String!): Book
    getBooks: [Book]
  }
`;

const resolvers = {
  Query: {
    getAuthor: (_, args: { name: String }) =>
      authors.find(author => author.name === args.name),
    getAuthors: () => authors,
    getBook: (_, args: { title: String }) =>
      books.find(book => book.title == args.title),
    getBooks: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

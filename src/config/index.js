export default {
  baseUrl: {
    dev: {
      normal: '/nginx/',
      done: '/test/',
      obtain: '/obtain/'
    },
    pro: {
      done: '/api/',
      public: '/public/'
    }
  },
  publicPath: [/^\/public/, /^\/obtain/]
}

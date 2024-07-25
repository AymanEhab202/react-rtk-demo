const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("../features/cakeSlice");
const icecreamReducer = require("../features/icecreamSlice");
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;

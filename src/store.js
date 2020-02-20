import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from 'modules'; //reducer

//redux 로깅 생성
// const logger = createLogger();
//store생성
const store = createStore(
  reducers
  // , applyMiddleware(logger)
)
export default store;
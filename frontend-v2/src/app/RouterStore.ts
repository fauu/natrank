import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { History } from 'history';

export class RouterStore extends BaseRouterStore {

  constructor(history?: History) {
    super();

    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

};
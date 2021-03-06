# rxjs-class-react-hook

This module is a simple class to extend that will help you create rxjs stores.

## How to use it

### Store

```typescript
import { Store } from "rxjs-class-react-hook";

export interface AppState {
    online: boolean;
    lang: string;
    theme: string;
}

const initialState: AppState = {
    online: true,
    lang: "en",
    theme: "blue",
};

class AppStore extends Store<AppState> {
    setOnline(online: boolean) {
        // Setter that merges the argument given into current state
        this.merge({ online });
    }

    setTheme(theme: string) {
        // Setter that merges the argument given with initialState and stores them in current state
        this.replace({
            online: true,
            lang: "en",
            theme,
        });
    }

    initialize() {
        // Resets the store to its initial state
        this.reset();
    }
}

const appStore = new AppStore(initialState);

export default appStore;
```

### PersistStore

Much like `Store`, `PersistStore` is a different implement implementation which enables to persist the data.
By default it auto loads and auto saves on init/changes and can be disabled.

A `LocalStoragePersistor` is packaged to enable saving to `localStorage`, but you can write your own persistors.

### Selector

Selector is a small class helper to keep selectors.
It is to extend for helping accessing data.

```typescript
import { Selector } from "rxjs-class-react-hook";

export interface UserState {
    accessToken?: string;
    loginFailed: boolean;
}

export default class UserSelector extends Selector<UserState> {
    isOnline() {
        return Boolean(this.state.accessToken);
    }

    hasLoginError() {
        return this.state.loginFailed;
    }
}
```

## The React hook

By setting the store as shown above, `appStore` will have a method available `appStore.useState()`. This method returns the _current state_ of the store and refreshes as `React.useState()` when a change is applied.

To update the store, you just have to call the methods we defined earlier (e.g. `appStore.initialize()` will reset the store state to `initialState`)

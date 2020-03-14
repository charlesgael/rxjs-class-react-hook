# rxjs-class-react-hook

This module is a simple class to extend that will help you create rxjs stores.

## How to use it

```typescript
import Store from "rxjs-class-react-hook";

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
            lang: "en"
            whitelabel
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

## The React hook

By setting the store as shown above, `appStore` will have a method available `appStore.useState()`. This method returns the _current state_ of the store and refreshes as `React.useState()` when a change is applied.

To update the store, you just have to call the methods we defined earlier (e.g. `appStore.initialize()` will reset the store state to `initialState`)

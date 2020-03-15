import { useLayoutEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

export default class Store<State> {
    private initialState: State;
    private subject: BehaviorSubject<State>;

    constructor(initialState: State) {
        this.initialState = initialState;
        this.subject = new BehaviorSubject(initialState);
    }

    private subscribe(setter: (val: State) => void) {
        return this.subject.subscribe(setter);
    }

    /** Hook to use in component that links component refresh to this state changes */
    useState() {
        const [storeState, setStoreState] = useState(this.initialState);

        useLayoutEffect(() => {
            const subs = this.subscribe(setStoreState);

            // cleanup
            return () => {
                subs.unsubscribe();
            };
        }, [setStoreState]);

        return storeState;
    }

    /** Synchronous method for accessing the store */
    getState() {
        const state = this.subject.getValue();
        return Object.freeze({ ...state });
    }

    /** Resets the state to its initial value */
    reset() {
        this.replace({});
    }

    /** Merges data with current state */
    protected merge(data: Partial<State>) {
        this.subject.next({
            ...this.subject.getValue(),
            ...data,
        });
    }

    /** Replaces current state with data */
    protected replace(data: Partial<State>) {
        this.subject.next({
            ...this.initialState,
            ...data,
        });
    }
}

import { Store } from ".";
import { Persistor } from "./Persistor";

interface PersistStoreOptions {
    /** Auto loads on store init */
    autoLoad: boolean;
    /** Auto save on store update */
    autoSave: boolean;
}

export default abstract class PersistStore<State> extends Store<State> {
    private persistor: Persistor;
    private options: PersistStoreOptions;

    constructor(initialState: State, persistor: Persistor, options?: Partial<PersistStoreOptions>) {
        super(initialState);
        this.persistor = persistor;

        this.options = {
            autoLoad: true,
            autoSave: true,
            ...options,
        };

        if (this.options.autoLoad) {
            this.load();
        }
    }

    /** Saves the store using the given persistor */
    async save() {
        await this.persistor.save(this.getState());
    }

    /** Loads the store using the given persistor */
    async load() {
        const data = await this.persistor.load();
        this.replace(data);
    }

    /** Merges data with current state */
    protected merge(data: Partial<State>) {
        super.merge(data);

        if (this.options.autoSave) this.save();
    }

    /** Replaces current state with data */
    protected replace(data: Partial<State>) {
        super.replace(data);

        if (this.options.autoSave) this.save();
    }
}

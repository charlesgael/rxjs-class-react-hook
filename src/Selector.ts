export default abstract class Selector<State> {
    protected state: State;

    constructor(state: State) {
        this.state = state;
    }
}

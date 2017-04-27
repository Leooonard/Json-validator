// @flow

type StateDependencyGraph = Array<State>;

type State = {
    stateName: string,
    nextStateNameList: Array<string>
};

class StateMachine {
    _stateDependencyGraph: StateDependencyGraph;
    _currentStateName: string;

    constructor (stateDependencyGraph: StateDependencyGraph, currentStateName: string) {
        this._stateDependencyGraph = stateDependencyGraph;
        this._currentState = this._getState(currentStateName);

        if (!this._isValidState(this._currentState)) {
            throw new Error('cant find currentStateName in stateDependencyGraph');
        }
    }

    next (nextStateName: string): bool {
        const currentState = this._currentState;
        const availableNextStateNameList = currentState.nextStateNameList;

        if (this._isValidNextStateName(nextStateName, availableNextStateNameList)) {
            const nextState = this._getState(nextStateName);

            if (this._isValidState(nextState)) {
                this._currentState = nextState;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    _isValidNextStateName (nextStateName: string, validNextStateNameList: Array<string>): bool {
        return validNextStateNameList.some(validNextStateName => validNextStateName === nextStateName);
    }

    _getState (stateName: string): State {
        const stateDependencyGraph = this._stateDependencyGraph;
        const targetState = stateDependencyGraph.filter(state => state.stateName === stateName)[0];

        return targetState;
    }

    _isValidState (state: State): bool {
        return !!state;
    }

    getCurrentStateName (): string {
        return this._currentState.stateName;
    }
}

export {
    StateMachine
};

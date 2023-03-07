import { QueryOptions, ApolloQueryResult } from "@apollo/client";
import { apolloClient } from "../utils/apollo";

interface CancellablePromise<T> extends Promise<T> {
    cancel: () => void
}

export function useCancellableQuery(options: QueryOptions<any, any>): CancellablePromise<ApolloQueryResult<any>> {
    const abortController = new AbortController()
    const observable = apolloClient.watchQuery({
        ...options,
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                signal: abortController.signal,
            },
            queryDeduplication: false
        }
    });

    type NewType = ZenObservable.Subscription;

    let subscription: NewType
    let promise = new Promise((resolve, reject) => {
        subscription = observable.subscribe(
            (res) => resolve(res),
            (err) => reject(err)
        )
    }) as CancellablePromise<ApolloQueryResult<any>>
    promise.cancel = () => {
        abortController.abort()
        subscription.unsubscribe()
    }
    return promise;
}





//This is a temprorary types line
declare global {
    // interface SymbolConstructor {
    //     readonly observable: symbol;
    // }

    namespace ZenObservable {
        interface SubscriptionObserver<T> {
            closed: boolean;
            next(value: T): void;
            error(errorValue: any): void;
            complete(): void;
        }

        interface Subscription {
            closed: boolean;
            unsubscribe(): void;
        }

        interface Observer<T> {
            start?(subscription: Subscription): any;
            next?(value: T): void;
            error?(errorValue: any): void;
            complete?(): void;
        }

        type Subscriber<T> = (observer: SubscriptionObserver<T>) => void | (() => void) | Subscription;

        interface ObservableLike<T> {
            subscribe?: Subscriber<T> | undefined;
            [Symbol.observable](): Observable<T> | ObservableLike<T>;
        }
    }
}

declare class Observable<T> {
    constructor(subscriber: ZenObservable.Subscriber<T>);

    subscribe(observer: ZenObservable.Observer<T>): ZenObservable.Subscription;
    subscribe(
        onNext: (value: T) => void,
        onError?: (error: any) => void,
        onComplete?: () => void,
    ): ZenObservable.Subscription;

    [Symbol.observable](): Observable<T>;

    forEach(callback: (value: T) => void): Promise<void>;
    map<R>(callback: (value: T) => R): Observable<R>;
    filter<S extends T>(callback: (value: T) => value is S): Observable<S>;
    filter(callback: (value: T) => boolean): Observable<T>;
    reduce(callback: (previousValue: T, currentValue: T) => T, initialValue?: T): Observable<T>;
    reduce<R>(callback: (previousValue: R, currentValue: T) => R, initialValue?: R): Observable<R>;
    flatMap<R>(callback: (value: T) => ZenObservable.ObservableLike<R>): Observable<R>;
    concat<R>(...observable: Array<Observable<R>>): Observable<R>;

    static from<R>(observable: Observable<R> | ZenObservable.ObservableLike<R> | ArrayLike<R>): Observable<R>;
    static of<R>(...items: R[]): Observable<R>;
}


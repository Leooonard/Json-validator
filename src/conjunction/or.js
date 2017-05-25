// @flow

export function mixinOr (mixinTarget, getter) {
    Object.defineProperty(mixinTarget, 'or', {
        get: getter
    })
}

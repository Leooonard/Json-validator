// @flow

export function mixinCoujunction (mixinTarget) {
    const defineGetter = defineGetProperty.bind(null, mixinTarget);

    defineGetter('is');
    defineGetter('to');
    defineGetter('be');
    defineGetter('should');
    defineGetter('could');
    defineGetter('and');
}

function defineGetProperty (obj, attrName) {
    Object.defineProperty(obj, attrName, {
        get () {
            return this;
        }
    });
}

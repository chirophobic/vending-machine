const path = require('path');
const Module = require('module');
const originalLoader = Module._load;

const mappings = {
    '@vending-machine/modules/vending-machine/domain': path.join(
        __dirname,
        '../dist/packages/modules/vending-machine/domain/',
    ),
};

const keys = Object.keys(mappings);

Module._load = function (request, parent) {
    if (!parent) return originalLoader.apply(this, arguments);
    const match = keys.find(k => request === k);
    if (match) {
        const newArguments = [...arguments];
        newArguments[0] = mappings[match];
        return originalLoader.apply(this, newArguments);
    } else {
        return originalLoader.apply(this, arguments);
    }
};

/**
 * @param {string} formula
 * @return {string}
 */
var countOfAtoms = function(formula) {
    const n = formula.length;
    const stack = [new Map()];
    let currentAtom = currentCount = '';

    const combineAtom = (atom, count) => {
        if (!atom) return;
        const atomMap = stack.at(-1);
        const originCount = atomMap.get(atom) ?? 0;
        const atomCount = count ? +count : 1;

        atomMap.set(atom, originCount + atomCount);
    };

    const mergeAtomMap = (atomMap) => {
        for (const [atom, count] of atomMap) {
            combineAtom(atom, count);
        }
    };

    const getMultiple = (index) => {
        let multiple = '';

        while (index + 1 < n && /[0-9]/.test(formula[index + 1])) {
            index += 1;
            multiple += formula[index];
        }
        return { multiple: multiple || 1, index };
    };

    for (let index = 0; index < n; index++) {
        const char = formula[index];

        if (char === '(') {
            combineAtom(currentAtom, currentCount);
            stack.push(new Map());
            currentAtom = currentCount = '';
        }
        else if (char === ')') {
            combineAtom(currentAtom, currentCount);
            currentAtom = currentCount = '';

            const atomMap = stack.pop();
            const { multiple, index: currentIndex } = getMultiple(index);

            for (const [atom, count] of atomMap) {
                atomMap.set(atom, count * multiple);
            }
            mergeAtomMap(atomMap);
            index = currentIndex;
        }
        else if (/[A-Z]/.test(char)) {
            combineAtom(currentAtom, currentCount);
            currentAtom = char;
            currentCount = '';
        }
        else if (/[a-z]/.test(char)) currentAtom += char;
        else if (/[0-9]/.test(char)) currentCount += char;
    }
    combineAtom(currentAtom, currentCount);

    const atomMap = stack[0];
    const atoms = [...atomMap.keys()].sort((a, b) => a.localeCompare(b));
    let result = '';

    for (const atom of atoms) {
        const count = atomMap.get(atom);

        result += count > 1 ? `${atom}${count}` : atom;
    }
    return result;
};
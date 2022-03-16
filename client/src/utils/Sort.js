const dirMap = {
    gt: {ASC: 1, DSC: -1},
    lt: {ASC: -1, DSC: 1},
}

const doSort = (A, B, property, direction) => {
    const a = property === 'SAT_AVG' ? parseInt(A[property]) : A[property];
    const b = property === 'SAT_AVG' ? parseInt(B[property]) : B[property];

    if (a < b) {
        return dirMap.lt[direction];
    } else if (a > b) {
        return dirMap.gt[direction];
    } else {
        return 0;
    }   
}

const createSorter = (...args) => {
    if (typeof args[0] === 'string') {
        args = [
            {
                direction: args[1],
                property: args[0]
            }
        ];
    }

    return (A, B) => {
        let ret = 0;

        args.some(sorter => {
            const {property, direction} = sorter;
            const value = doSort(A, B, property, direction);

            if (value === 0) {
                return false;
            } else {
                ret = value;
                return true;
            }
        })

        return ret;
        
    }
}
export {createSorter};
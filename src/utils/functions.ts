export const toList = <T, E>(model: T): E[] => {
    let result: E[] = [];
    Object.keys(model).forEach(key => {
        result = result.concat(model[key]);
    });
    return result;
}
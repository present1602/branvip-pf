export function joinStringArrayWithDelimeter(arrayValue: string[], delimeter = ', ') {
    if (Array.isArray(arrayValue)) {
        return arrayValue.join(',')
    }
    return ''
}
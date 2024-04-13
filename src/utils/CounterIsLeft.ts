export default function (count: number, limit: number, page: number) {
    const countIsLeft = count - (limit * page)
    return countIsLeft < 0 ? 0 : countIsLeft
}
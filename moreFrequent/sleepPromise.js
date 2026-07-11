/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(millis)
        }, millis)
    })
}


let t = Date.now()
// 100
console.log(sleep(1000).then(() => console.log(Date.now() - t)))
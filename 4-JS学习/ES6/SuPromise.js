/**
 * 手写Promise
 * @param {*} executor - 执行器，用于执行成功和失败回调函数
 * @author suzhenghui
 */
function SuPromise(executor) {
    // 初始状态为pending
    this.status = "pending";
    // 初始状态为undefined
    this.result = undefined;
    // 初始化回调函数数组
    this.cb = []
    // 保存this的引用
    var _this = this;

    // 定义resolve函数
    function resolve(res) {
        // 如果状态不是pending，则返回
        if (_this.status !== "pending") return;
        // 改变状态为fulfilled
        _this.status = "fulfilled"
        // 改变结果
        _this.result = res;

        // 遍历回调函数数组，执行成功回调函数
        _this.cb.forEach(item => {
            item.successCallBack && item.successCallBack(_this.result)
        });
    }
    // 定义reject函数
    function reject(rej) {
        // 如果状态不是pending，则返回
        if (_this.status !== "pending") return;
        // 改变状态为rejected
        _this.status = "rejected"
        // 改变结果
        _this.result = rej;
        // 遍历回调函数数组，执行失败回调函数
        _this.cb.forEach(item => {
            item.failCallBack && item.failCallBack(_this.result)
        });
    }
    // 执行executor函数
    executor(resolve, reject)
}

// 定义then函数，用于添加成功回调函数
SuPromise.prototype.then = function (successCallBack, failCallBack) {

    // 如果没有传入成功回调函数，则默认返回原值
    if (!successCallBack) {
        successCallBack = value => value;
    }
    // 如果没有传入失败回调函数，则默认返回错误对象
    if (!failCallBack) {
        failCallBack = error => error;
    }
    // 返回一个新的SuPromise实例
    return new SuPromise((resolve, reject) => {
        // 如果状态为fulfilled，则执行成功回调函数
        if (this.status === "fulfilled") {
            const result = successCallBack && successCallBack(this.result)
            // 判断result是否是Promise
            resolveIsPromise(result, resolve, reject);
        }
        // 如果状态为rejected，则执行失败回调函数
        if (this.status === "rejected") {
            const result = failCallBack && failCallBack(this.result)
            // 判断result是否是Promise
            rejectIsPromise(result, resolve, reject);
        }
        // 如果状态为pending，则收集回调函数
        if (this.status === "pending") {
            //收集回调
            this.cb.push({
                successCallBack: () => {
                    const result = successCallBack(this.result)
                    // 判断result是否是Promise
                    resolveIsPromise(result, resolve, reject);
                },
                failCallBack: () => {
                    const result = failCallBack(this.result)
                    // 判断result是否是Promise
                    rejectIsPromise(result, resolve, reject);
                }
            })
        }
    })
}

// 定义catch函数，用于添加失败回调函数
SuPromise.prototype.catch = function (failCallBack) {
    // 返回一个新的SuPromise实例，并传入失败回调函数
    return this.then(undefined, failCallBack);
}

// 封装函数 判断result是否是Promise
function resolveIsPromise(result, resolve, reject) {
    if (result instanceof SuPromise) {
        result.then(res => {
            resolve(res);
        }, rej => {
            reject(rej);
        })
    } else {
        resolve(result);
    }
}
function rejectIsPromise(result, resolve, reject) {
    if (result instanceof SuPromise) {
        result.then(res => {
            resolve(res);
        }, rej => {
            reject(rej);
        })
    } else {
        reject(result);
    }
}
/**
 * 是否是闰年
 * @param {*} val
 */
export function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

/**
 * 邮箱地址校验
 * @param {*} val
 */
export function isEmail(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(val)
}

/**
 * 是否是布尔值校验
 * @param {*} val
 */
export function isBoolean(val) {
    return (
        val === true ||
        val === false ||
        val === 0 ||
        val === 1 ||
        val === '0' ||
        val === '1' ||
        val === 'true' ||
        val === 'false' ||
        val === '是' ||
        val === '否' ||
        val.toLowerCase() === 'yes' ||
        val.toLowerCase() === 'no' ||
        val.toLowerCase() === 'on' ||
        val.toLowerCase() === 'off'
    )
}

/**
 * 是否是数字校验
 * @param {*} val
 */
export function isNumber(val) {
    var num

    num = Number(val)

    if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
        return true
    } else {
        return false
    }
}

/**
 * 是否是数组校验
 * @param {*} val
 */
export function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
}

/**
 * 是否是字符串校验
 * @param {*} val
 */
export function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]'
}

/**
 * 是否是对象校验
 * @param {*} val
 */
export function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

/**
 * 是否是函数校验
 * @param {*} val
 */
export function isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]'
}

/**
 * 是否是URL校验
 * @param {*} val
 */
export function isUrl(url) {
    return (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i).test(url)
}

/**
 * 校验val值是true还是false
 * @param {*} val 'on'|'off', 'yes'|'no', '1'|'0', 1|0, true|false, 'true'|'false','是'|'否'
 */
export function accepted(val) {
    if (val.toLowerCase() === 'on' || val.toLowerCase() === 'yes' || val === 1 || val === '1' || val === true || val === 'true' || val === '是') {
        return true
    }

    return false
}

/**
 *  字母校验
 * @param {*} val
 */
export function alpha(val) {
    return (/^[a-zA-Z]+$/).test(val)
}

/**
 *  字母+数字校验
 * @param {*} val
 */
export function alpha_dash(val) {
    return (/^[a-zA-Z0-9_\-]+$/).test(val)
}

/**
 *  数字校验
 * @param {*} val
 */
export function alpha_num(val) {
    return (/^[a-zA-Z0-9]+$/).test(val)
}
/**
 *  十六进制校验
 * @param {*} val
 */
export function hex(val) {
    return (/^[0-9a-f]+$/i).test(val)
}

/**
 * 电话号码格式校验
 * @param {*} val
 */
export function isPhone(val) {
    return (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/).test(val)
}

/**
 * 手机号码格式校验
 * @param {*} val
 */
export function isMobile(val) {
    return (/^1(3|4|5|7|8)\d{9}$/).test(val)
}

/**
 * 身份证号码校验(15位，18位，17位加字母X)
 * @param {*} val
 */
export function isIdCard(val) {
    return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(val)
}

/**
 * 中文英文校验
 * @param {*} val
 */

export function isChinese(val) {
    return (/^[\Α-\￥]+$/).test(val)
}

/**
 * 英文校验
 * @param {*} val
 */

export function isEnglish(val) {
    return (/^[A-Za-z]+$/).test(val)
}

/**
 * QQ号码校验
 * @param {*} val
 */

export function isQQ(val) {
    return (/^[1-9]\d{4,8}$/).test(val)
}

/**
 * Zip邮政编码校验
 * @param {*} val
 */

export function isZip(val) {
    return (/^[1-9]\d{4,8}$/).test(val)
}

/**
 * ip地址校验
 * @param {*} val
 */
export function isIp(val) {
    let rex = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g
    if (rex.test(val)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true
    }
    return false
}

/**
 * 安卓校验
 * @param {*} val
 */
export function isAndroid() {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
    return isAndroid
}

/**
 * iOS校验
 * @param {*} val
 */
export function isIos() {
    let u = navigator.userAgent
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return isiOS
}

/**
 * 日期校验
 * @param {*} val
 */
/*export function date(val, format) {
  return isValidDate(val);
}*/
export function isValidDate(inDate) {
  var valid = true;


  if (!inDate) {
    return false;
  }
  // reformat if supplied as mm.dd.yyyy (period delimiter)
  if (typeof inDate === 'string') {
    var pos = inDate.indexOf('.');
    if ((pos > 0 && pos <= 6)) {
      inDate = inDate.replace(/\./g, '-');
    }
  }

  var testDate = new Date(inDate);
  if (!testDate) {
    return false;
  }
  var yr = testDate.getFullYear();
  var mo = testDate.getMonth();
  var day = testDate.getDate();

  var daysInMonth = [31, (isLeapYear(yr) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (yr < 1000) { return false; }
  if (isNaN(mo)) { return false; }
  if (mo + 1 > 12) { return false; }
  if (isNaN(day)) { return false; }
  if (day > daysInMonth[mo]) { return false; }

  return valid;
}
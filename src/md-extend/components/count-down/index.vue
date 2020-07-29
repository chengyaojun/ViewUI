<template>
  <div :class="classes">
    <div :class="`${prefixCls}__wrap`">
      <slot :date-time="value">{{ this.value }}</slot>
    </div>
  </div>
</template>

<script>
    const prefixCls = 'md-count-down';
    let matchers = [];
    matchers.push(/^[0-9]*$/.source);
    // Month/Day/Year [hours:minutes:seconds]
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/
        .source);
    // Year/Day/Month [hours:minutes:seconds] and
    // Year-Day-Month [hours:minutes:seconds]
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/
        .source);
    // Cast the matchers to a regular expression object
    matchers = new RegExp(matchers.join('|'));

    function parseDateString(dateString) {
        // Pass through when a native object is sent
        if (dateString instanceof Date) {
            return dateString;
        }
        // Caste string to date object
        if (String(dateString).match(matchers)) {
            // If looks like a milisecond value cast to number before
            // final casting (Thanks to @msigley)
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            // Replace dashes to slashes
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, '/');
            }
            return new Date(dateString);
        } else {
            throw new Error('Couldn\'t cast `' + dateString +
                '` to a date object.');
        }
    }

    // Map to convert from a directive to offset object property
    const DIRECTIVE_KEY_MAP = {
        'Y': 'years',
        'm': 'months',
        'n': 'daysToMonth',
        'd': 'daysToWeek',
        'w': 'weeks',
        'W': 'weeksToMonth',
        'H': 'hours',
        'M': 'minutes',
        'S': 'seconds',
        'D': 'totalDays',
        'I': 'totalHours',
        'N': 'totalMinutes',
        'T': 'totalSeconds'
    };

    // Returns an escaped regexp from the string
    function escapedRegExp(str) {
        let sanitize = str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        return new RegExp(sanitize);
    }

    // Time string formatter
    function strftime(offsetObject) {
        return function (format) {
            let directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (directives) {
                for (let i = 0, len = directives.length; i < len; ++i) {
                    let directive = directives[i]
                            .match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        regexp = escapedRegExp(directive[0]),
                        modifier = directive[1] || '',
                        plural = directive[3] || '',
                        value = null;
                    // Get the key
                    directive = directive[2];
                    // Swap shot-versions directives
                    if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if (value !== null) {
                        // Pluralize
                        if (modifier === '!') {
                            value = pluralize(plural, value);
                        }
                        // Add zero-padding
                        if (modifier === '') {
                            if (value < 10) {
                                value = '0' + value.toString();
                            }
                        }
                        // Replace the directive
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace(/%%/, '%');
            return format;
        };
    }

    // Pluralize
    function pluralize(format, count) {
        let plural = 's', singular = '';
        if (format) {
            format = format.replace(/(:|;|\s)/gi, '').split(/\,/);
            if (format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        // Fix #187
        if (Math.abs(count) > 1) {
            return plural;
        } else {
            return singular;
        }
    }

    export default {
        name: 'count-down',
        computed: {
            classes() {
                return [
                    `${prefixCls}`
                ];
            }
        },
        props: {
            precision: {
                type: Number | String,
                default: 100
            },
            elapse: {
                type: Boolean,
                default: false,
            },
            defer: {
                type: Boolean,
                default: false
            },
            finalDate: {
                type: String | Number,
                default: ''
            },
            format: {
                type: String,
                default: '%H:%M:%S'
            },
            action: {
                type: String,
                default: '',
                validator(value) {
                    return ['pause', 'resume', 'stop', 'start', ''].indexOf(value) !== -1;
                }
            }
        },
        watch: {
            'defer': {
                handler(val) {
                    if (!val) {
                        this.start();
                    }
                }
            },
            'finalDate': {
                immediate: true,
                handler(val) {
                    this.setFinalDate(val);
                    this.start();
                }
            },
            'elapse': {
                immediate: true,
                handler(val) {
                    this._elapse = val;
                }
            },
            action(value) {
                if (value === 'pause') {
                    this.pause();
                } else if (value === 'resume') {
                    this.resume();
                } else if (value === 'stop') {
                    this.stop();
                } else if (value === 'start') {
                    this.start();
                }
            }
        },
        data() {
            return {
                prefixCls,
                firstTick: true,
                interval: null,
                offset: {},
                _finalDate: this.finalDate,
                _elapsed: this.elapsed,
                value: '',
            };
        },
        methods: {
            start: function () {
                if (this.interval !== null) {
                    clearInterval(this.interval);
                }
                let self = this;
                this.update();
                this.interval = setInterval(function () {
                    self.update.call(self);
                }, this.precision);
            },
            stop: function () {
                clearInterval(this.interval);
                this.interval = null;
                this.totalSecsLeft = null;
                this.dispatchEvent('stop');
            },
            toggle: function () {
                if (this.interval) {
                    this.stop();
                } else {
                    this.start();
                }
            },
            pause: function () {
                this.stop();
            },
            resume: function () {
                this.start();
            },
            setFinalDate: function (value) {
                this._finalDate = parseDateString(value); // Cast the given date
            },
            update: function () {
                // Stop if dom is not in the html (Thanks to @dleavitt)
                // debugger
                let now = new Date(),
                    newTotalSecsLeft;
                // Create an offset date object
                newTotalSecsLeft = this._finalDate.getTime() - now.getTime(); // Millisecs
                // Calculate the remaining time
                newTotalSecsLeft = Math.ceil(newTotalSecsLeft / 1000); // Secs
                // If is not have to elapse set the finish
                newTotalSecsLeft = !this.elapse && newTotalSecsLeft < 0 ? 0 :
                    Math.abs(newTotalSecsLeft);
                // Do not proceed to calculation if the seconds have not changed or
                // during the first tick
                if (this.totalSecsLeft === newTotalSecsLeft || this.firstTick) {
                    this.firstTick = false;
                    return;
                } else {
                    this.totalSecsLeft = newTotalSecsLeft;
                }
                // Check if the countdown has elapsed
                this._elapsed = (now >= this._finalDate);
                // Calculate the offsets
                this.offset = {
                    seconds: this.totalSecsLeft % 60,
                    minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                    hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                    days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                    weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                    weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                    months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                    years: Math.abs(this._finalDate.getFullYear() - now.getFullYear()),
                    totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                    totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                    totalMinutes: Math.floor(this.totalSecsLeft / 60),
                    totalSeconds: this.totalSecsLeft
                };
                // Dispatch an event
                if (!this._elapse && this.totalSecsLeft === 0) {
                    this.stop();
                    this.dispatchEvent('finish');
                } else {
                    this.dispatchEvent('update');
                }
            },
            dispatchEvent: function (eventName) {
                let event = {
                    finalDate: this._finalDate,
                    elapsed: this._elapsed,
                    offset: this.offset,
                    strftime: strftime(this.offset),
                };
                this.value = event.strftime(this.format);
                this.$emit(eventName, event);
            }
        }
    };
</script>

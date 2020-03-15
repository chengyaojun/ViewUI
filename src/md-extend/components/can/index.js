export default {
    name: 'Can',
    functional: true,
    props: {
        I: String,
        a: [String, Array, Object],
        of: [String, Array, Object],
        not: Boolean,
    },
    watch: {
        of(to) {
            this.can(this.I, to, this.not);
        },
        I(to) {
            this.can(to, this.of || this.a, this.not);
        },
    },
    // eslint-disable-next-line no-unused-vars
    render(h, {props, children, parent, data}) {
        const action = props.I;
        const subject = props.of || props.a;

        if (!action) {
            throw new Error('[Vue Can]: neither `I` nor `do` property exist');
        }
        if (!subject) {
            throw new Error('[Vue Can]: neither `of` nor `a` nor `this` nor `on` property exist');
        }
        const hasAction = (action, subject) => {
            return action === subject || Array.isArray(subject) && subject.indexOf(action) !== -1;
        };
        const allowed = !!(props.not ^ hasAction(action, subject));

        return allowed ? children : null;
    },
};

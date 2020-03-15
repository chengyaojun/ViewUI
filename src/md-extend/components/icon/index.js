import IconComponent from '../../../components/icon/icon.vue';
import icons from './icons';
import classNames from 'classnames';

const Icon = {
    extends:IconComponent,
    props: {
        className:String,
        title:String,
        size:{
            type:Number|String,
            default:18,
        },
        color:{
            type:String,
            default:'#000',
        },
        iconStyle:Object,
    },
    computed:{
        classes () {
            const isCustom = !icons.default.includes(this.type);
            if (isCustom) {
                return classNames({
                    'ivu-icon': true,
                    'font_family':isCustom,
                    'iconfont':isCustom,
                    [`${this.type}`]: true,
                }, this.className);
            }
            return classNames({
                'ivu-icon': true,
                'font_family':isCustom,
                'iconfont':isCustom,
                [`ivu-icon-${this.type}`]: true,
            }, this.className);
           /* return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.type}`]: this.type !== '',
                    [`${this.custom}`]: this.custom !== '',
                }
            ];*/
        },
        styles () {
            let iconStyle = this.iconStyle;
            let sizeStyle =  {
                fontSize: `${this.size}px`
            };
            let colorStyle = {
                color:this.color
            };

            return [iconStyle, sizeStyle, colorStyle];

            /*let style = {};

            if (this.size) {
                style['font-size'] = `${this.size}px`;
            }

            if (this.color) {
                style.color = this.color;
            }

            return style;*/
        }
    },
};

export default Icon;

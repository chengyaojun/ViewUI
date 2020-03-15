import SelectComp from '../../../components/select/select.vue';
import Option from '../../../components/select/option.vue';
import OptionGroup from '../../../components/select/option-group.vue';

const checkValuesNotEqual = (value,publicValue,values) => {
    const strValue = JSON.stringify(value);
    const strPublic = JSON.stringify(publicValue);
    const strValues = JSON.stringify(values.map( item => {
        return item.value;
    }));
    return strValue !== strPublic || strValue !== strValues || strValues !== strPublic;
};

const Select = {
    name: 'iSelect',
    extends: SelectComp,
    watch:{
        value(value){
            const {getInitialValue, getOptionData, publicValue, values} = this;

            this.checkUpdateStatus();

            if (value === '') this.values = [];
            // eslint-disable-next-line no-undef
            else if (checkValuesNotEqual(value,publicValue,values)) {
                // 修复option改为md-option是下拉无法选中的问题
                this.$nextTick(() => {
                    let filterValue = getInitialValue().map(getOptionData).filter(Boolean);
                    if (filterValue.length>0) {
                        this.values = filterValue;
                    }
                });
                // this.$nextTick(() => this.values = getInitialValue().map(getOptionData).filter(Boolean));
                if (!this.multiple) this.dispatch('FormItem', 'on-form-change', this.publicValue);
            }
        },
    }
};

console.log('Select', SelectComp);
console.log('Select', Select);

export { Select, Option, OptionGroup };

export default Select;

<template>
  <div>
    <Table
        :ref="refs"
        :loading="loading"
        :columns="columnsList"
        :data="thisTableData"
        :border="border"
        :show-header="showHeader"
        @on-selection-change="onSelectionChangeTable"
        disabled-hover
    >
      <template slot="header">
        <slot name="header"></slot>
      </template>
      <template slot="footer">
        <slot name="footer"></slot>
      </template>
      <template slot="loading">
        <slot name="loading"></slot>
      </template>
    </Table>
  </div>
</template>

<script>

    import Vue from 'vue';
    import DropDownCell from './drop-down-cell';
    import DatePickerCell from './date-picker-cell';
    import SelectCell from './select-cell';
    import Table from '../../../components/table/table';
    import dayjs from '../../libs/dayjs';
    import {isObject, isArray} from '../../libs/validate';

    const _isArray = isArray;
    const _isObject = isObject;

    const editButton = (vm, h, currentRow, index) => {
        return h(
            'div',
            {
                style: {
                    margin: '0 5px'
                },
                class: 'cursor-pointer',
                on: {
                    click: () => {
                        if (!currentRow.editting) {
                            if (currentRow.edittingCell) {
                                for (let name in currentRow.edittingCell) {
                                    currentRow.edittingCell[name] = false;
                                    vm.edittingStore[index].edittingCell[name] = false;
                                }
                            }
                            vm.edittingStore[index].editting = true;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                            vm.$emit('on-edit', false);
                        } else {
                            vm.edittingStore[index].saving = true;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                            let edittingRow = vm.edittingStore[index];
                            edittingRow.editting = false;
                            edittingRow.saving = false;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                            vm.$emit('on-edit', true);
                            vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                            vm.$emit(
                                'on-change',
                                vm.handleBackdata(vm.thisTableData),
                                index,
                                vm.handleBackdata(vm.thisTableData)[index]
                            );
                        }
                    }
                }
            },
            [
                h('md-tooltip', {
                    props: {
                        content: currentRow.editting ? '保存' : '编辑',
                        transfer: true,
                    }
                }, [
                    h('md-icon', {
                        props: {
                            type: currentRow.editting ? 'md-checkmark' : 'md-create',
                            size: 16,
                        }
                    })
                ])

            ]
        );
    };
    const placeholderButton = (vm, h, currentRow, index) => {
        return h('div', {
            style: {
                margin: '0 5px',
                minWidth: '20px'
            },
            class: 'cursor-pointer'
        });
    };
    const deleteButton = (vm, h, currentRow, index) => {
        let isDelete = false;
        return h('div', {}, [
            h('md-modal', {
                props: {
                    title: '您确定要删除这条数据吗?'
                    // transfer: true
                },
                on: {
                    input: () => {
                        this.$emit('input', isDelete);
                    },
                    'on-ok': () => {
                        vm.thisTableData.splice(index, 1);
                        vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                        vm.$emit(
                            'on-delete',
                            vm.handleBackdata(vm.thisTableData),
                            index,
                            currentRow
                        );
                    }
                }
            }),
            h(
                'div',
                {
                    class: 'cursor-pointer',
                    style: {
                        margin: '0 5px'
                    },
                    props: {
                        type: 'error',
                        placement: 'top'
                    },
                    on: {
                        click: () => {
                            Vue.prototype.$MdModal.confirm({
                                title: vm.modalMsg, //"您确定要删除这条数据吗?",
                                // msg:"您确定要删除这条数据吗?",
                                onOk: () => {
                                    vm.thisTableData.splice(index, 1);
                                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                                    vm.$emit(
                                        'on-delete',
                                        vm.handleBackdata(vm.thisTableData),
                                        index,
                                        currentRow
                                    );
                                }

                                // content: '<p>Content of dialog</p><p>Content of dialog</p>',
                            });
                            // isDelete = true;
                        }
                    }
                },
                [
                    h('md-tooltip', {
                            props: {
                                content: '删除',
                                transfer: true,
                            }
                        },
                        [
                            h('md-icon', {
                                props: {
                                    type: 'md-trash',
                                    size: 16,
                                }
                            })
                        ]
                    )

                ]
            )
        ]);
    };
    const enableButton = (vm, h, currentRow, index) => {
        return h(
            'div',
            {
                style: {
                    margin: '0 5px'
                },
                class: 'cursor-pointer',
                on: {
                    click: () => {
                        currentRow.status = parseInt(currentRow.status) ? 0 : 1;
                        vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                        vm.$emit(
                            'on-enable',
                            vm.handleBackdata(vm.thisTableData),
                            index,
                            currentRow
                        );
                    }
                }
            },
            [
                h('md-tooltip', {
                    props: {
                        content: '启动',
                        transfer: true,
                    },
                }, h('md-icon', {
                    props: {
                        type: parseInt(currentRow.status)
                            ? 'remove_circle_outline'
                            : 'finished'
                        // loading: currentRow.saving
                    }
                }))
            ]
        );
    };
    const customButton = (vm, h, currentRow, index, item) => {
        return h(
            'div',
            {
                style: {
                    margin: '0 5px'
                },
                class: 'cursor-pointer',
                on: {
                    click: () => {
                        if (item.action) {
                            item.action(
                                vm.handleBackdata(vm.thisTableData),
                                index,
                                vm.handleBackdata(vm.thisTableData)[index]
                            );
                        }
                        vm.$emit(
                            'on-custom',
                            vm.handleBackdata(vm.thisTableData),
                            index,
                            vm.handleBackdata(vm.thisTableData)[index]
                        );
                    }
                }
            },
            [
                h('md-icon', {
                    props: {
                        type: item.icon //currentRow.editting ? "done" : "mode_edit"
                        // loading: currentRow.saving
                    }
                })
            ]
        );
    };
    const drawerButton = (vm, h, currentRow, index) => {
        return h(
            'div',
            {
                style: {
                    margin: '0 5px'
                },
                class: 'cursor-pointer',
                on: {
                    click: () => {
                        vm.$emit(
                            'on-drawer',
                            vm.handleBackdata(vm.thisTableData),
                            index,
                            vm.handleBackdata(vm.thisTableData)[index]
                        );
                    }
                }
            },
            [
                h('md-icon', {
                    props: {
                        type: currentRow.editting ? 'done' : 'mode_edit'
                        // loading: currentRow.saving
                    }
                })
            ]
        );
    };
    const incellEditBtn = (vm, h, param) => {
        if (vm.hoverShow) {
            return h(
                'div',
                {
                    class: {
                        'show-edit-btn': vm.hoverShow
                    }
                },
                [
                    h(
                        'div',
                        {
                            props: {
                                type: 'text'
                            },
                            style: {
                                cursor: 'pointer'
                            },
                            on: {
                                click: event => {
                                    vm.edittingStore[param.index].edittingCell[
                                        param.column.key
                                        ] = true;
                                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                                }
                            }
                        },
                        [
                            h('md-icon', {
                                props: {
                                    type: 'md-create',
                                    size: 16,
                                }
                            })
                        ]
                    )
                ]
            );
        } else {
            return h(
                'div',
                {
                    props: {
                        type: 'text'
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    on: {
                        click: event => {
                            vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                        }
                    }
                },
                [
                    h('md-icon', {
                        props: {
                            type: 'md-create',
                            size: 16,
                        }
                    })
                ]
            );
        }
    };
    const saveIncellEditBtn = (vm, h, param) => {
        return h(
            'div',
            {
                props: {
                    type: 'text'
                },
                style: {
                    cursor: 'pointer'
                },
                on: {
                    click: event => {
                        vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                        vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                        vm.$emit(
                            'on-cell-change',
                            vm.handleBackdata(vm.thisTableData),
                            param.index,
                            param.column.key
                        );
                    }
                }
            },
            [
                h('md-icon', {
                    props: {
                        type: 'md-checkmark',
                        size: 16,
                    }
                })
            ]
        );
    };
    const cellInput = (vm, h, param, item) => {
        return h('Input', {
            props: {
                type: 'text',
                value: vm.edittingStore[param.index][item.key]
            },
            on: {
                'on-change'(event) {
                    let key = item.key;
                    vm.edittingStore[param.index][key] = event.target.value;
                    this.$emit(
                        'on-change-input',
                        vm.edittingStore[param.index][key],
                        param.index,
                        key
                    );
                }
            }
        });
    };
    export default {
        name: 'canEditTable',
        props: {
            refs: String,
            columnsList: Array,
            value: Array,
            url: String,
            border: {
                type: Boolean | String,
                default: true
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            editIncell: {
                type: Boolean,
                default: false
            },
            hoverShow: {
                type: Boolean,
                default: false
            },
            modalMsg: {
                type: String,
                default: '您确定要删除这条数据吗'
            }
        },
        components: {
            Table
        },
        data() {
            return {
                columns: [],
                thisTableData: [],
                edittingStore: []
            };
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let vm = this;
                let editableCell = this.columnsList.filter(item => {
                    if (item.editable) {
                        if (item.editable === true) {
                            return item;
                        }
                    }
                });
                let cloneData = JSON.parse(JSON.stringify(this.value));
                let res = [];
                cloneData = cloneData ? cloneData : [];
                res = cloneData.map((item, index) => {
                    let isEditting = false;
                    if (this.thisTableData[index]) {
                        if (this.thisTableData[index].editting) {
                            isEditting = true;
                        } else {
                            for (const cell in this.thisTableData[index].edittingCell) {
                                if (this.thisTableData[index].edittingCell[cell] === true) {
                                    isEditting = true;
                                }
                            }
                        }
                    }
                    if (isEditting) {
                        return this.thisTableData[index];
                    } else {
                        this.$set(item, 'editting', false);
                        let edittingCell = {};
                        editableCell.forEach(item => {
                            edittingCell[item.key] = false;
                        });
                        this.$set(item, 'edittingCell', edittingCell);
                        return item;
                    }
                });

                this.thisTableData = res;
                this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
                this.thisTableData && this.thisTableData.length && this.columnsList.forEach(item => {
                    if (item.editable) {
                        item.render = (h, param) => {
                            let currentRow = this.thisTableData[param.index];
                            // console.log("this.thisTableData[param.index];", this.thisTableData, this.thisTableData[param.index], param.index);
                            if (!currentRow.editting) {
                                if (this.editIncell) {
                                    return h(
                                        'Row',
                                        {
                                            props: {
                                                type: 'flex',
                                                align: 'middle',
                                                justify: 'center'
                                            }
                                        },
                                        [
                                            h(
                                                'Col',
                                                {
                                                    props: {
                                                        span: '22'
                                                    }
                                                },
                                                [
                                                    !currentRow.edittingCell[param.column.key]
                                                        ? h('span', currentRow[item.key])
                                                        : cellInput(this, h, param, item)
                                                ]
                                            ),
                                            h(
                                                'Col',
                                                {
                                                    props: {
                                                        span: '2'
                                                    }
                                                },
                                                [
                                                    currentRow.edittingCell[param.column.key]
                                                        ? saveIncellEditBtn(this, h, param)
                                                        : incellEditBtn(this, h, param)
                                                ]
                                            )
                                        ]
                                    );
                                } else {
                                    if (item.dropdown && item.dropdown[currentRow[item.key]]) {
                                        return h('span', item.dropdown[currentRow[item.key]]);
                                    }

                                    if (item.date === true || item.date === false) {
                                        let val = currentRow[item.key];
                                        return h('span', dayjs(val).format('YYYY-MM-DD HH:mm:ss'));
                                    }
                                    /*    if (item.date) {
                                          // console.log(currentRow[item.key], item.key);
                                          let val = currentRow[item.key];
                                          return h("span", dayjs(val).format("YYYY-MM-DD HH:mm:ss"));
                                        }*/
                                    if (item.select) {
                                        let array = currentRow[item.key].split(',');
                                        let val = [];
                                        for (let key in item.select.option) {
                                            let elem = item.select.option[key];
                                            let has = array.indexOf(elem.value) >= 0;
                                            if (has) {
                                                val.push(elem.label);
                                            }
                                        }
                                        let tags = [];
                                        val.forEach(elem => {
                                            let obj = h('Tag', elem);
                                            tags.push(obj);
                                        });
                                        return 'div', tags;
                                        // return h('span', val.join(","));
                                    }
                                    return h('span', currentRow[item.key]);
                                }
                            } else {
                                if (item.dropdown) {
                                    return h(DropDownCell, {
                                        props: {
                                            cell: param,
                                            editable: item.editable,
                                            mapItems: item.dropdown
                                        },
                                        on: {
                                            'on-change': cell => {
                                                let key = param.column.key;
                                                vm.edittingStore[param.index][key] = cell.row[key]; //item.dropdown[cell.row[key]];
                                                // vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                                                // vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                                            }
                                        }
                                    });
                                }
                                if (item.select) {
                                    let multiple = Boolean(item.select.multiple);
                                    let value = param.row[param.column.key].split(',');
                                    return h(SelectCell, {
                                        props: {
                                            option: item.select.option,
                                            value: value,
                                            multiple: multiple,
                                            transfer: true,
                                        },
                                        on: {
                                            'on-change': val => {
                                                let key = param.column.key;
                                                console.log(val);
                                                let array = [];
                                                if (_isArray(val)) {
                                                    array = [...val];
                                                } else {
                                                    array = [...[val]];
                                                }
                                                val &&
                                                (vm.edittingStore[param.index][key] = array.join(',')); //cell.row[key];
                                            }
                                        }
                                    });
                                }

                                if (item.date) {
                                    return h(DatePickerCell, {
                                        props: {
                                            date: param.row.key,
                                            transfer: true,
                                        },
                                        on: {
                                            'on-change': val => {
                                                let key = param.column.key;
                                                console.log('DatePickerCell:', key, val);
                                                vm.edittingStore[param.index][key] = val;
                                                //item.dropdown[cell.row[key]];
                                                // vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                                                // vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                                            }
                                        }
                                    });
                                }
                                return h('Input', {
                                    props: {
                                        type: 'text',
                                        value: currentRow[item.key]
                                    },
                                    on: {
                                        'on-change'(event) {
                                            let key = param.column.key;
                                            vm.edittingStore[param.index][key] = event.target.value;
                                            vm.$emit(
                                                'on-change-input',
                                                vm.edittingStore[param.index],
                                                param.index,
                                                key
                                            );
                                        }
                                    }
                                });
                            }
                        };
                    }
                    if (item.handle) {
                        item.render = (h, param) => {
                            let currentRowData = this.thisTableData[param.index];
                            let children = [];
                            item.handle.forEach(item => {
                                if (item === 'edit') {
                                    children.push(editButton(this, h, currentRowData, param.index));
                                } else if (item === 'delete') {
                                    children.push(
                                        deleteButton(this, h, currentRowData, param.index)
                                    );
                                } else if (item === 'enable') {
                                    children.push(
                                        enableButton(this, h, currentRowData, param.index)
                                    );
                                } else if (item === 'drawer') {
                                    children.push(
                                        drawerButton(this, h, currentRowData, param.index)
                                    );
                                } else if (item === '' || item === 'placeholder') {
                                    children.push(
                                        placeholderButton(this, h, currentRowData, param.index)
                                    );
                                }

                                if (_isObject(item)) {
                                    if (item.type === 'custom') {
                                        children.push(
                                            customButton(this, h, currentRowData, param.index, item)
                                        );
                                    }
                                }
                            });
                            return h(
                                'div',
                                {
                                    class: ['display-flex', 'align-items-center']
                                },
                                children
                            );
                        };
                    }
                });
            },
            handleBackdata(data) {
                let clonedData = JSON.parse(JSON.stringify(data));
                clonedData.forEach(item => {
                    delete item.editting;
                    delete item.edittingCell;
                    delete item.saving;
                });
                return clonedData;
            },
            onSelectionChangeTable(selection) {
                this.$emit('on-selection-change', selection);
            }
        },
        watch: {
            columnsList(to) {
                this.init();
            },
            value(data) {
                if (data) {
                    this.init();
                }
            },
            columnsList(data) {
                if (data) {
                    this.init();
                }
            }
        }
    };
</script>


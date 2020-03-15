export default {
  'success': true,
  'result': [
    /*{
      'id': 1,
      'code': 'md-view.code.document',
      'name': '文档',
      'level': 'document',
      'icon': 'ios-book',
      'route': null,
      'permDTOList': [],
      'childList': []
    },*/
    {
      'id': 2,
      'code': 'md-view.code.guide',
      'name': '入门指南',
      'level': '',
      'icon': 'md-book',
      'route': '/guide',
      'permDTOList': [],
      'childList': [
        {
          'id': 21,
          'code': 'md-view.code.guide.install',
          'name': '安装',
          'level': 'guide.install',
          // 'icon': 'md-albums',
          'icon': null,
          'route': '/guide/install',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 22,
          'code': 'md-view.code.guide.start',
          'name': '快速上手',
          'level': 'guide.start',
          // 'icon': 'md-albums',
          'icon': null,
          'route': '/guide/start',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 23,
          'code': 'md-view.code.guide.theme',
          'name': '定制主题',
          'level': 'guide.theme',
          // 'icon': 'md-albums',
          'icon': null,
          'route': '/guide/theme',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 26,
          'code': 'md-view.code.guide.i18n',
          'name': '国际化',
          'level': 'guide.i18n',
          // 'icon': 'md-albums',
          'icon': null,
          'route': '/guide/i18n',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 24,
          'code': 'md-view.code.guide.update',
          'name': '更新日志',
          'level': 'guide.update',
          // 'icon': 'md-albums',
          'icon': null,
          'route': '/guide/update',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 25,
          'code': 'md-view.code.guide.case',
          'name': '运用案例',
          'level': 'guide.case',
          // 'icon': 'md-albums',
          'icon': null,
          'route': '/guide/case',
          'permDTOList': [],
          'childList': []
        }
      ]
    },
    {
      'id': 3,
      'code': 'md-view.code.components',
      'name': '组件',
      'level': 'components',
      'icon': 'logo-buffer',
      'route': '/components',
      'permDTOList': [],
      'childList': [
        {
          'id': 31,
          'code': 'md-view.code.components.md-btn',
          'name': '按钮',
          'level': 'components.md-btn',
          'icon': 'logo-youtube',
          'route': '/components/md-btn',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 32,
          'code': 'md-view.code.components.icons',
          'name': '图标',
          'level': 'components.md-icon',
          'icon': 'logo-buffer',
          // 'route': '/components/md-icon',
          'route': '/icons',
          'permDTOList': [],
          'childList': [
            {
              'id': 31,
              'code': 'md-view.code.components.icons.start',
              'name': '如何使用',
              'level': 'components.icon.start',
              'icon': 'logo-buffer',
              'route': '/components/icons/start',
              'permDTOList': [],
              'childList': []
            },
            {
              'id': 32,
              'code': 'md-view.code.components.icons.default',
              'name': '默认图标',
              'level': 'components.icon.default',
              'icon': 'logo-buffer',
              'route': '/components/icons/default',
              'permDTOList': [],
              'childList': []
            },
            {
              'id': 33,
              'code': 'md-view.code.components.icons.mdicons',
              'name': 'MDicons',
              'level': 'components.icon.mdicons',
              'icon': 'logo-buffer',
              'route': '/components/icons/md',
              'permDTOList': [],
              'childList': []
            }, {
              'id': 33,
              'code': 'md-view.code.components.icons.hyl',
              'name': '海翼链',
              'level': 'components.icon.hyl',
              'icon': 'logo-buffer',
              'route': '/components/icons/hyl',
              'permDTOList': [],
              'childList': []
            }, {
              'id': 33,
              'code': 'md-view.code.components.icons.crm',
              'name': 'CRM',
              'level': 'components.icon.crm',
              'icon': 'logo-buffer',
              'route': '/components/icons/crm',
              'permDTOList': [],
              'childList': []
            }, {
              'id': 33,
              'code': 'md-view.code.components.icons.baofu',
              'name': '宝付官网',
              'level': 'components.icon.baofu',
              'icon': 'logo-buffer',
              'route': '/components/icons/baofu',
              'permDTOList': [],
              'childList': []
            }
          ]
        },
        {
          'id': 35,
          'code': 'md-view.code.form',
          'name': '表单',
          'level': 'components.form',
          'icon': 'md-list-box',
          'route': '/components/form',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 33,
          'code': 'md-view.code.components.md-table',
          'name': '表格',
          'level': 'components.md-table',
          'icon': 'ios-grid',
          'route': '/components/md-table',
          'permDTOList': [],
          'childList': [
            {
              'id': 330,
              'code': 'md-view.code.components.md-table.dragable',
              'name': '可拖拽表格',
              'level': 'components.md-table.dragable',
              'icon': 'md-move',
              'route': '/components/md-table/dragable',
              'permDTOList': [],
              'childList': []
            },
            {
              'id': 331,
              'code': 'md-view.code.components.md-table.editable',
              'name': '可编辑表格',
              'level': 'components.md-table.editable',
              'icon': 'md-create',
              'route': '/components/md-table/editable',
              'permDTOList': [],
              'childList': []
            },
            {
              'id': 332,
              'code': 'md-view.code.components.md-table.expandable',
              'name': '可扩展表格',
              'level': 'components.md-table.expandable',
              'icon': 'md-expand',
              'route': '/components/md-table/expandable',
              'permDTOList': [],
              'childList': []
            }, {
              'id': 333,
              'code': 'md-view.code.components.md-table.exportable',
              'name': '表格导出数据',
              'level': 'components.md-table.exportable',
              'icon': 'md-download',
              'route': '/components/md-table/exportable',
              'permDTOList': [],
              'childList': []
            }
          ]
        },
        /*{
          'id': 34,
          'code': 'md-view.code.components.md-split-pane',
          'name': '分割窗口',
          'level': 'components.md-split-pane',
          'icon': 'md-pause',
          'route': '/components/md-split-pane',
          'permDTOList': [],
          'childList': []
        },*/
         {
          'id': 34,
          'code': 'md-view.code.components.md-tree',
          'name': '可拖拽树',
          'level': 'components.md-tree',
          'icon': 'ios-create',
          'route': '/components/md-tree',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 35,
          'code': 'md-view.code.components.md-print',
          'name': '打印',
          'level': 'components.md-print',
          'icon': 'md-print',
          'route': '/components/md-print',
          'permDTOList': [],
          'childList': []
        }, {
          'id': 36,
          'code': 'md-view.code.components.md-rich-editor',
          'name': '富文本编辑',
          'level': 'components.md-rich-editor',
          'icon': 'ios-create',
          'route': '/components/md-rich-editor',
          'permDTOList': [],
          'childList': []
        }, {
          'id': 37,
          'code': 'md-view.code.components.md-d3',
          'name': '数据可视化',
          'level': 'components.md-d3',
          'icon': 'ios-create',
          'route': '/md-d3',
          'permDTOList': [],
          'childList': [
            {
              'id': 360,
              'code': 'md-view.code.components.md-d3.donut',
              'name': '环形图',
              'level': 'components.md-d3.donut',
              'icon': 'md-aperture',
              'route': '/components/md-d3/donut',
              'permDTOList': [],
              'childList': []
            },
            {
              'id': 361,
              'code': 'md-view.code.components.md-d3.pie',
              'name': '饼图',
              'level': 'components.md-d3.pie',
              'icon': 'md-pie',
              'route': '/components/md-d3/pie',
              'permDTOList': [],
              'childList': []
            },
            {
              'id': 361,
              'code': 'md-view.code.components.md-d3.tree',
              'name': '树状组织结构图',
              'level': 'components.md-d3.tree',
              'icon': 'md-git-network',
              'route': '/components/md-d3/tree',
              'permDTOList': [],
              'childList': []
            }
          ]
        }
      ]
    },

    /*      {
              'id': 4,
              'code': 'md-view.code.upload-data',
              'name': '上传数据',
              'level': 'upload-data',
              'icon': 'md-cloud-upload',
              'route': null,
              'permDTOList': [],
              'childList': [{
                      'id': 41,
                      'code': 'md-view.code.upload-data.upload-csv',
                      'name': '上传CSV文件',
                      'level': 'uploadCSV',
                      'icon': 'ios-document',
                      'route': '',
                      'permDTOList': [],
                      'childList': null
                  },
                  {
                      'id': 42,
                      'code': 'md-view.code.upload-data.copy-table',
                      'name': '粘贴表格数据',
                      'level': 'copyTable',
                      'icon': 'md-clipboard',
                      'route': '',
                      'permDTOList': [],
                      'childList': null
                  }
              ]
          },
          {
              'id': 5,
              'code': 'md-view.code.excel',
              'name': 'Excel',
              'level': 'excel',
              'icon': 'ios-stats',
              'route': null,
              'permDTOList': [],
              'childList': [{
                      'id': 51,
                      'code': 'md-view.code.excel.upload-excel',
                      'name': '上传Excel',
                      'level': 'upload-excel',
                      'icon': 'md-add',
                      'route': '',
                      'permDTOList': [],
                      'childList': null
                  },
                  {
                      'id': 52,
                      'code': 'md-view.code.excel.export-excel',
                      'name': '导出excel',
                      'level': 'export-excel',
                      'icon': 'md-download',
                      'route': '',
                      'permDTOList': [],
                      'childList': null
                  }
              ]
          },*/
    {
      'id': 6,
      'code': 'md-view.code.directives',
      'name': '指令',
      'level': 'directives',
      'icon': 'ios-navigate',
      'route': '/directives',
      'permDTOList': [],
      'childList': [
        {
          'id': 61,
          'code': 'md-view.code.directives.style',
          'name': '样式指令',
          'level': 'directives.style',
          'icon': 'ios-navigate',
          'route': '/directives/style',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 62,
          'code': 'md-view.code.directives.resize',
          'name': 'v-resize',
          'level': 'directives.resize',
          'icon': 'ios-navigate',
          'route': '/directives/resize',
          'permDTOList': [],
          'childList': []
        },{
          'id': 63,
          'code': 'md-view.code.directives.resize',
          'name': 'v-scroll',
          'level': 'directives.scroll',
          'icon': 'ios-navigate',
          'route': '/directives/scroll',
          'permDTOList': [],
          'childList': []
        },
      ]
    },
    {
      'id': 7,
      'code': 'md-view.code.multi-level-menus',
      'name': '多级菜单',
      'level': 'multi-level-menus',
      'icon': 'md-menu',
      'route': null,
      'permDTOList': [],
      'childList': [
        {
          'id': 71,
          'code': 'md-view.code..multi-level-menus..multi-level-menus21',
          'name': 'Level-2-1',
          'level': 'multi-level-menus21',
          'icon': 'md-funnel',
          'route': '',
          'permDTOList': [],
          'childList': null
        },
        {
          'id': 72,
          'code': 'md-view.code..multi-level-menus..multi-level-menus22',
          'name': 'Level-2-2',
          'level': 'multi-level-menus22',
          'icon': 'md-funnel',
          'route': '',
          'permDTOList': [],
          'childList': [{
            'id': 721,
            'code': 'md-view.code..multi-level-menus..multi-level-menus221',
            'name': 'Level-2-2-1',
            'level': 'multi-level-menus221',
            'icon': 'md-funnel',
            'route': '',
            'permDTOList': [],
            'childList': null
          }, {
            'id': 722,
            'code': 'md-view.code..multi-level-menus..multi-level-menus222',
            'name': 'Level-2-2-2',
            'level': 'multi-level-menus222',
            'icon': 'md-funnel',
            'route': '',
            'permDTOList': [],
            'childList': null
          }]

        },
        {
          'id': 73,
          'code': 'md-view.code..multi-level-menus..multi-level-menus23',
          'name': 'Level-2-3',
          'level': 'multi-level-menus23',
          'icon': 'md-funnel',
          'route': '',
          'permDTOList': [],
          'childList': null
        }]
    },
    {
      'id': 8,
      'code': 'md-view.code.error-page',
      'name': '错误页',
      'level': 'error-page',
      'icon': 'md-alert',
      'route': null,
      'permDTOList': [],
      'childList': [
        {
          'id': 81,
          'code': 'md-view.code.error-page.error',
          'name': '错误',
          'level': 'error',
          'icon': 'md-alert',
          'route': '/error',
          'permDTOList': [],
          'childList': null
        },
        {
          'id': 81,
          'code': 'md-view.code.error-page.403',
          'name': '403',
          'level': '403',
          'icon': 'md-alert',
          'route': '/error-page/403',
          'permDTOList': [],
          'childList': null
        },
        {
          'id': 82,
          'code': 'md-view.code.error-page.404',
          'name': '404',
          'level': '404',
          'icon': 'md-alert',
          'route': '/error-page/404',
          'permDTOList': [],
          'childList': null
        },
        {
          'id': 84,
          'code': 'md-view.code.error-page.500',
          'name': '500',
          'level': '500',
          'icon': 'md-alert',
          'route': '/error-page/500',
          'permDTOList': [],
          'childList': null
        },
      ]
    },
    {
      'id': 9,
      'code': 'md-view.code.utilities',
      'name': '工具',
      'level': 'utilities',
      'icon': 'md-menu',
      'route': '/utilities',
      'permDTOList': [],
      'childList': [
        {
          'id': 91,
          'code': 'md-view.code.utilities.permission',
          'name': '权限管理',
          'level': 'utilities-permission',
          'icon': 'md-albums',
          'route': '/utilities/permission',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 91,
          'code': 'md-view.code.utilities.validate',
          'name': '常用校验',
          'level': 'utilities-validate',
          'icon': 'md-albums',
          'route': '/utilities/validate',
          'permDTOList': [],
          'childList': []
        },
        {
          'id': 91,
          'code': 'md-view.code.utilities.capture',
          'name': '屏幕截取',
          'level': 'utilities-capture',
          'icon': 'md-camera',
          'route': '/utilities/capture',
          'permDTOList': [],
          'childList': []
        }
      ]
    },
  ],
  'code': '2001',
  'msg': 'success'
}

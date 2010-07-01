/*
 * Copyright 2010 Vijay Kiran<mail@vijaykiran.com>
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/**
 * Toolbar.js : JcrExplorer
 *
 * @author    Vijay Kiran<mail@vijaykiran.com>
 *
 */


/*global Ext, JcrExplorer */
Ext.ns('JcrExplorer');

JcrExplorer.Toolbar = Ext.extend(Ext.Toolbar, {
    initComponent:function() {
        Ext.apply(this, {
            viewConfig:{
                forceFit:true
            },
            height:80,
            items: [
                {
                    xtype:'buttongroup',
                    title:'Nodes',
                    defaults:{
                        width: 55,
                        scale: 'large',
                        iconAlign: 'top',
                        handler: this.handleButton
                    },
                    items: [
                        {
                            text: 'Add',
                            iconCls: 'node-add'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'node-delete'
                        },
                        {
                            text: 'Copy',
                            iconCls: 'node-copy'
                        },
                        {
                            text: 'Rename',
                            iconCls: 'node-rename'
                        },
                        {
                            text: 'Move',
                            iconCls: 'node-move'
                        }
                    ]
                },
                {
                    xtype:'buttongroup',
                    title:'Properties',
                    defaults:{
                        width: 55,
                        scale: 'large',
                        iconAlign: 'top',
                        handler: this.handleButton
                    },
                    items: [
                        {
                            text: 'Add',
                            iconCls: 'prop-add'

                        },
                        {
                            text: 'Delete',
                            iconCls: 'prop-delete'
                        }
                    ]
                },
                {
                    xtype:'buttongroup',
                    title:'XML',
                    defaults:{
                        width: 55,
                        scale: 'large',
                        iconAlign: 'top',
                        handler: this.handleButton
                    },
                    items: [
                        {
                            text: 'Import',
                            iconCls: 'import-xml'
                        },
                        {
                            text: 'Export',
                            iconCls: 'export-xml'
                        }
                    ]
                },
                {
                    xtype:'buttongroup',
                    title:'CND',
                    defaults:{
                        width: 55,
                        scale: 'large',
                        iconAlign: 'top',
                        handler: this.handleButton
                    },
                    items: [
                        {
                            text: 'Import',
                            iconCls: 'import-cnd'
                        },
                        {
                            text: 'Export',
                            iconCls: 'export-cnd'
                        }
                    ]
                },
                '->',
                {
                    xtype:'buttongroup',
                    title:'Utils',
                    defaults:{
                        width: 55,
                        scale: 'large',
                        iconAlign: 'top',
                        handler: this.handleButton
                    },
                    items: [
                        {
                            text: 'Console',
                            iconCls: 'console'
                        }
                    ]
                },
                {
                    xtype:'buttongroup',
                    title:'Session',
                    defaults:{
                        width: 55,
                        scale: 'large',
                        iconAlign: 'top',
                        handler: this.handleButton
                    },
                    items: [
                        {
                            text: 'Save',
                            iconCls: 'save'
                        },
                        {
                            text: 'Reset',
                            iconCls: 'reset'
                        },
                        {
                            text: 'logout',
                            iconCls: 'logout'
                        }
                    ]
                }
            ]
        });

        JcrExplorer.Toolbar.superclass.initComponent.apply(this, arguments);
        this.addNodeBtn = this.items.itemAt(0);
    },

    onRender:function() {
        JcrExplorer.Toolbar.superclass.onRender.apply(this, arguments);
    },

    handleButton:function() {
        Ext.Msg.show({
            title:'JCR Explorer',
            msg: 'This feature is not yet implemented.',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
    }
});

Ext.reg('toolbar', JcrExplorer.Toolbar);

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
 * NodePropertiesPanel.js : JcrExplorer
 *
 * @author    Vijay Kiran<mail@vijaykiran.com>
 *
 */


/*global Ext, JcrExplorer */
Ext.ns('JcrExplorer');

JcrExplorer.NodePropertiesPanel = Ext.extend(Ext.FormPanel, {

    initComponent:function() {
        Ext.apply(this, {
            autoHeight: false,
            bodyStyle: 'background-color:#fff;',
            border:false,
            padding: 10,
            autoScroll:true,
            labelWidth: 400,
            defaults:{
                width: 600
            },
            labelSeparator: ' ',
            labelAlign:'top',
            tbar:[
                {
                    text: this.id
                }
            ],
            items:[
                {
                    fieldLabel: 'Path',
                    xtype: 'textfield',
                    labelStyle: 'font-weight:bold;',
                    value: this.id

                }
            ],
            bbar:[
                {
                    text:'Save',
                    type:'submit'
                },
                {
                    text: 'Reset',
                    type: 'reset'
                }
            ]
        });

        JcrExplorer.NodePropertiesPanel.superclass.initComponent.apply(this, arguments);

        this.store = new Ext.data.JsonStore({
            autoLoad: true,
            method: 'GET',
            url: '/jcrexplorer/nodeService/props?node=' + this.id,
            root: "props",
            fields:['name', 'type', 'value']
        });

        this.store.on('exception', this.handleException, this);
        this.store.on('load', this.loadProperties, this);

    },
    onRender:function() {
        JcrExplorer.NodePropertiesPanel.superclass.onRender.apply(this, arguments);

    },

    handleException:function(dp, type, action, options, response, arg) {
        Ext.Msg.show({
            title:'Error',
            msg: 'Unable to load properties for this node from the server.<br/>please check the log for more information.',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
        });
    },

    loadProperties:function(store, records, options) {
        var length = records.length;
        for (var i = 0, len = length; i < length; ++i) {
            switch (records[i].get('type')) {
                default:
                    this.add(
                    {
                        fieldLabel: records[i].get('name'),
                        xtype: 'textfield',
                        labelStyle: 'font-weight:bold;',
                        value: records[i].get('value')
                    });
            }

        }
    }



});

Ext.reg('node_props_panel', JcrExplorer.NodePropertiesPanel);

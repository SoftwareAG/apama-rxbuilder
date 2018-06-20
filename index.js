/* 
* Copyright (c) 2018 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Blockly.Blocks['custom_operator'] = {
    init: function () {
        this.jsonInit({
            "message0": "Test",
            "inputsInline": false,
            "previousStatement": "Operator",
            "nextStatement": "Operator",
            "colour": 330,
            "tooltip": "",
            "helpUrl": ""
        });
    },
    getProcedureCall: function () {
        return this.getFieldValue();
    },
    renameProcedure: function (oldName, newName) {
        var currentName = this.getProcedureCall();
        if (currentName == oldName) {
            this.setFieldValue(newName);
        }
    },
    onchange: function (event) {
        if (!this.workspace || this.workspace.isFlyout) {
            return;
        }
        if (event.type == Blockly.Events.BLOCK_CREATE) {
            var name_1 = this.getProcedureCall();
            var def = Blockly.Procedures.getDefinition(name_1, this.workspace);
            if (!def) {
                this.setWarningText("Operator \"" + this.getProcedureCall() + "\" does not exist");
            }
            else {
                this.setWarningText(null);
            }
        }
        else if (event.type == Blockly.Events.BLOCK_DELETE) {
            var name_2 = this.getProcedureCall();
            var def = Blockly.Procedures.getDefinition(name_2, this.workspace);
            if (!def) {
                Blockly.Events.setGroup(event.group);
                this.unplug(true);
                this.dispose();
                Blockly.Events.setGroup(false);
            }
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('operator-name', this.getProcedureCall());
        return container;
    },
    domToMutation: function (xmlElement) {
        this.setFieldValue(xmlElement.getAttribute('operator-name'));
    }
};
Blockly.Blocks['custom_operator_definition'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Operator')
            .appendField(new Blockly.FieldTextInput('', Blockly.Procedures.rename), 'OperatorName');
        this.appendStatementInput('Operators')
            .setCheck('Operator');
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    getProcedureDef: function () {
        return [this.getFieldValue('OperatorName'), [], false];
    }
};
Blockly.Blocks['custom_operator_arg'] = {
    init: function () {
        this.jsonInit({
            "message0": "o",
            "output": ["Observable", "CustomOperatorArg"],
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        });
    },
    onchange: function (event) {
        if (event.type == Blockly.Events.BLOCK_MOVE && event.blockId == this.id) {
            if (!event.oldParentId && !event.newParentId) {
                this.dispose();
            }
            if (event.newParentId) {
                var container = this.getRootBlock();
                if (container && container.type != 'complex_custom_operator_definition') {
                    this.dispose();
                }
            }
        }
    }
};
Blockly.Blocks['complex_custom_operator_definition'] = {
    init: function () {
        this.appendValueInput("Arg")
            .setCheck("CustomOperatorArg")
            .appendField("Operator")
            .appendField(new Blockly.FieldTextInput("", Blockly.Procedures.rename), "OperatorName")
            .appendField("using Observable");
        this.appendStatementInput("Code")
            .setCheck("Observable");
        this.appendValueInput("Return")
            .setCheck("Observable")
            .appendField("Return");
        this.setInputsInline(true);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    onchange: function (event) {
        if (!this.workspace || this.workspace.isFlyout) {
            return;
        }
        if (!this.getInput('Arg').connection.targetConnection) {
            var newArgBlock = this.workspace.newBlock('custom_operator_arg');
            newArgBlock.initSvg();
            newArgBlock.render();
            this.getInput('Arg').connection.connect(newArgBlock.outputConnection);
        }
    },
    getProcedureDef: function () {
        return [this.getFieldValue('OperatorName'), [], false];
    }
};
Blockly.defineBlocksWithJsonArray([
    {
        "type": "lambda",
        "message0": "%1 => %2",
        "args0": [
            {
                "type": "field_input",
                "name": "Arg",
                "text": "x"
            },
            {
                "type": "field_input",
                "name": "Expression",
                "text": "x * 10"
            }
        ],
        "inputsInline": false,
        "output": [
            "lambda"
        ],
        "colour": 230,
        "tooltip": "A lambda function or predicate",
        "helpUrl": ""
    }, {
        "type": "custom_action",
        "message0": "action: %1",
        "args0": [
            {
                "type": "field_input",
                "name": "ActionName",
                "text": "customAction"
            }
        ],
        "output": "CustomAction",
        "colour": 230,
        "tooltip": "A custom action that requires manual implementation",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "operators",
        "message0": "Observable %1 %2",
        "args0": [
            {
                "type": "input_value",
                "name": "SourceObservable",
                "check": "Observable",
                "align": "RIGHT"
            },
            {
                "type": "input_statement",
                "name": "Operators",
                "check": "Operator"
            }
        ],
        "inputsInline": false,
        "output": "Observable",
        "colour": 20,
        "tooltip": "Apply a series of operations to an Observable",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "subscribe",
        "message0": "Subscribe %1 onNext %2 onError %3 onComplete %4",
        "args0": [
            {
                "type": "input_value",
                "name": "SourceObservable",
                "check": "Observable"
            },
            {
                "type": "input_value",
                "name": "onNext",
                "check": [
                    "action<any>",
                    "CustomAction"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "onError",
                "check": [
                    "action<any>",
                    "CustomAction"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "onComplete",
                "check": [
                    "action<>",
                    "CustomAction"
                ],
                "align": "RIGHT"
            }
        ],
        "previousStatement": "Observable",
        "nextStatement": "Observable",
        "colour": 230,
        "tooltip": "Subscribe to an Observable to provide output",
        "helpUrl": ""
    },
    {
        "type": "log_value",
        "message0": "Log at %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "logLevel",
                "options": [
                    ["DEBUG", "DEBUG"],
                    ["INFO", "INFO"],
                    ["WARN", "WARN"],
                    ["ERROR", "ERROR"],
                    ["CRIT", "CRIT"],
                ]
            }
        ],
        "output": "action<any>",
        "colour": 60,
        "tooltip": "Log a value",
        "helpUrl": ""
    },
    {
        "type": "to_channel",
        "message0": "To Channel %1 %2",
        "args0": [
            {
                "type": "field_input",
                "name": "ChannelName",
                "text": "MyFirstChannel"
            },
            {
                "type": "input_value",
                "name": "SourceObservable",
                "check": "Observable"
            }
        ],
        "previousStatement": "Observable",
        "nextStatement": "Observable",
        "colour": 230,
        "tooltip": "Send every value to a channel",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "from_channel",
        "message0": "From Channel: %1",
        "args0": [
            {
                "type": "field_input",
                "name": "CHANNEL_NAME",
                "text": "MyFirstChannel"
            }
        ],
        "output": "Observable",
        "colour": 230,
        "tooltip": "Get all events sent to a channel as an Observable",
        "helpUrl": ""
    },
    {
        "type": "from_stream",
        "message0": "From Stream: from %1 in %2 select %3 %4 - on channel: %5",
        "args0": [
            {
                "type": "field_input",
                "name": "var",
                "text": "d"
            },
            {
                "type": "field_input",
                "name": "listener",
                "text": "all Data()"
            },
            {
                "type": "field_input",
                "name": "query",
                "text": "d.dValue"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "channel",
                "text": "TemperatureSensorReadings"
            }
        ],
        "output": "Observable",
        "colour": 230,
        "tooltip": "Get all values from a stream as an Observable",
        "helpUrl": ""
    },
    {
        "type": "from_values",
        "message0": "From Values: [%1]",
        "args0": [
            {
                "type": "field_input",
                "name": "Values",
                "text": "1, 2, 3"
            }
        ],
        "output": "Observable",
        "colour": 230,
        "tooltip": "Create an observable containing the provided values",
        "helpUrl": ""
    },
    {
        "type": "interval",
        "message0": "Interval: %1 Seconds",
        "args0": [
            {
                "type": "field_number",
                "name": "Interval",
                "value": 10,
                "min": 0
            }
        ],
        "output": "Observable",
        "colour": 230,
        "tooltip": "Create an observable containing the provided values",
        "helpUrl": ""
    }
]);
Blockly.Blocks['value'] = {
    init: function () {
        this.jsonInit({
            "type": "value",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "\"hello world\""
                }
            ],
            "inputsInline": false,
            "output": [
                "value"
            ],
            "colour": 230,
            "tooltip": "A value",
            "helpUrl": ""
        });
        this.setMovable(false);
    }
};
Blockly.Blocks['set_var'] = {
    init: function () {
        this.jsonInit({
            "message0": "Variable %1 %2",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "Variable",
                    "variable": "obs"
                },
                {
                    "type": "input_value",
                    "name": "Observable",
                    "check": "Observable"
                }
            ],
            "previousStatement": "Observable",
            "nextStatement": "Observable",
            "colour": 285,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};
Blockly.Blocks['get_var'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "Variable",
                    "variable": "observable1"
                }
            ],
            "output": "Observable",
            "colour": 285,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};
Blockly.defineBlocksWithJsonArray([
    {
        "type": "iak_to",
        "message0": "To Analytics Kit %1 StreamName %2 Type %3 SourceId %4 Timestamp %5 dValue %6 sValue %7 xValue %8 yValue %9 zValue %10",
        "args0": [
            {
                "type": "input_value",
                "name": "Observable",
                "check": "Observable",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "StreamName",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "Type",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "SourceId",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "timestamp",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "dValue",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "sValue",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "xValue",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "yValue",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "zValue",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            }
        ],
        "previousStatement": "Observable",
        "nextStatement": "Observable",
        "colour": 150,
        "tooltip": "Sends data to the analytics kit.",
        "helpUrl": ""
    },
    {
        "type": "iak_from",
        "message0": "From Analytics Kit, on Channel %1",
        "args0": [
            {
                "type": "field_input",
                "name": "Channel",
                "text": "MyFirstChannel"
            }
        ],
        "output": "Observable",
        "colour": 150,
        "tooltip": "Receive Data(...) events from the analytics kit.",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "reduce_with_initial",
        "message0": "Reduce %1 Starting value %2",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            },
            {
                "type": "input_value",
                "name": "Initial",
                "align": "RIGHT",
                "check": "value"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Collect all of the values into an accumulator, emitting the accumulated value once complete",
        "helpUrl": ""
    },
    {
        "type": "average",
        "message0": "Average",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Calculate the average of all values in an Observable. Emitting once complete.",
        "helpUrl": ""
    },
    {
        "type": "count",
        "message0": "Count",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Count the number of values in an Observable. Emitting once complete.",
        "helpUrl": ""
    },
    {
        "type": "sum",
        "message0": "Sum",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Calculate the sum of all values in an Observable. Emitting once complete.",
        "helpUrl": ""
    },
    {
        "type": "concat_string",
        "message0": "Concat String",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Concatenate all values in an Observable. Emitting once complete.",
        "helpUrl": ""
    },
    {
        "type": "max",
        "message0": "Max",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Find the max of all values in an Observable. Emitting once complete.",
        "helpUrl": ""
    },
    {
        "type": "min",
        "message0": "Min",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Find the min of all values in an Observable. Emitting once complete.",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "with_latest_from",
        "message0": "withLatestFrom %1 combiner %2",
        "args0": [
            {
                "type": "input_value",
                "name": "OtherObservable",
                "check": "Observable"
            },
            {
                "type": "input_value",
                "name": "Combiner",
                "check": [
                    "lambda",
                    "CustomAction"
                ],
                "align": "RIGHT"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 0,
        "tooltip": "Combine this observable with the latest value from another",
        "helpUrl": ""
    },
    {
        "type": "combine_latest",
        "message0": "combineLatest %1 combiner %2",
        "args0": [
            {
                "type": "input_value",
                "name": "OtherObservable",
                "check": "Observable"
            },
            {
                "type": "input_value",
                "name": "Combiner",
                "check": [
                    "lambda",
                    "CustomAction"
                ],
                "align": "RIGHT"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 0,
        "tooltip": "Combine this observable with another, emitting whenever either update",
        "helpUrl": ""
    },
    {
        "type": "merge",
        "message0": "Merge %1",
        "args0": [
            {
                "type": "input_value",
                "name": "OtherObservable",
                "check": "Observable"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 0,
        "tooltip": "Combine the output from multiple observables",
        "helpUrl": ""
    },
    {
        "type": "zip",
        "message0": "Zip %1 combiner %2",
        "args0": [
            {
                "type": "input_value",
                "name": "OtherObservable",
                "check": "Observable"
            },
            {
                "type": "input_value",
                "name": "Combiner",
                "check": [
                    "lambda",
                    "CustomAction"
                ],
                "align": "RIGHT"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 0,
        "tooltip": "Combine this observable with another, based on the value arrival order (eg. [A,B,C] + [1,2,3] => [A:1,B:2,C:3])",
        "helpUrl": ""
    },
    {
        "type": "concat",
        "message0": "Concat %1",
        "args0": [
            {
                "type": "input_value",
                "name": "OtherObservable",
                "check": "Observable"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 0,
        "tooltip": "Connect to the main observable and then, after the main completes, connect to the provided one",
        "helpUrl": ""
    },
    {
        "type": "start_with",
        "message0": "Start With [ %1 ]",
        "args0": [
            {
                "type": "field_input",
                "name": "Values",
                "text": "1, 2, 3"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 0,
        "tooltip": "Put the provided values onto the observable before emitting any other values",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "contains",
        "message0": "Contains %1",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Check whether an observable emits a value that matches the predicate",
        "helpUrl": ""
    },
    {
        "type": "every",
        "message0": "Every %1",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Check whether every value emitted by observable matches the predicate",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "catch_error",
        "message0": "Catch Error %1",
        "args0": [
            {
                "type": "input_value",
                "name": "OnError",
                "check": "Observable"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 30,
        "tooltip": "If the main observable errors, use the provided observable instead",
        "helpUrl": ""
    },
    {
        "type": "retry",
        "message0": "Retry %1 Times",
        "args0": [
            {
                "type": "field_number",
                "name": "count",
                "value": 3,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 30,
        "tooltip": "Reconnect to an observable n times after it errors",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "filter",
        "message0": "Filter %1",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Filter the values",
        "helpUrl": ""
    },
    {
        "type": "take",
        "message0": "Take %1",
        "args0": [
            {
                "type": "field_number",
                "name": "count",
                "value": 10,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Take the first n values from an observable",
        "helpUrl": ""
    },
    {
        "type": "skip",
        "message0": "Skip %1",
        "args0": [
            {
                "type": "field_number",
                "name": "count",
                "value": 10,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Skip the first n values from an observable",
        "helpUrl": ""
    },
    {
        "type": "take_last",
        "message0": "Take Last %1",
        "args0": [
            {
                "type": "field_number",
                "name": "count",
                "value": 10,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Take the last n values from an observable",
        "helpUrl": ""
    },
    {
        "type": "skip_last",
        "message0": "Skip Last %1",
        "args0": [
            {
                "type": "field_number",
                "name": "count",
                "value": 10,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Skip the last n values from an observable",
        "helpUrl": ""
    },
    {
        "type": "distinct",
        "message0": "Distinct",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Remove all duplicate values.",
        "helpUrl": ""
    },
    {
        "type": "distinct_by",
        "message0": "Distinct By %1",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Remove all duplicate values.",
        "helpUrl": ""
    },
    {
        "type": "distinct_until_changed",
        "message0": "Distinct Until Changed",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Remove all back to back duplicate values.",
        "helpUrl": ""
    },
    {
        "type": "distinct_by_until_changed",
        "message0": "Distinct By Until Changed %1",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Remove all back to back duplicate values.",
        "helpUrl": ""
    },
    {
        "type": "ignore_elements",
        "message0": "Ignore Elements",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Send no values, but complete and errors are still processed.",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "map",
        "message0": "Map %1",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Modify every value",
        "helpUrl": ""
    },
    {
        "type": "flat_map",
        "message0": "FlatMap %1",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Convert every value to multiple values and add each item to the output",
        "helpUrl": ""
    },
    {
        "type": "moving_count_window",
        "message0": "Moving window of %1 values, updating every %2 value(s) %3 %4 Merge Output",
        "args0": [
            {
                "type": "field_number",
                "name": "count",
                "value": 5,
                "min": 0,
                "precision": 1
            },
            {
                "type": "field_number",
                "name": "skip",
                "value": 1,
                "min": 0,
                "precision": 1
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "Operators",
                "check": "Operator"
            }
        ],
        "inputsInline": true,
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "A moving count window",
        "helpUrl": ""
    },
    {
        "type": "scan_with_initial",
        "message0": "Scan %1 Starting value %2",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            },
            {
                "type": "input_value",
                "name": "Initial",
                "align": "RIGHT",
                "check": "value"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Collect all of the values into an accumulator, emitting the new accumulated value every time",
        "helpUrl": ""
    },
    {
        "type": "group_by_for_each",
        "message0": "Grouping By %1 %2 Merge Output",
        "args0": [
            {
                "type": "input_value",
                "name": "Action",
                "check": [
                    "lambda",
                    "CustomAction"
                ]
            },
            {
                "type": "input_statement",
                "name": "Operators",
                "check": "Operator"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "window_time_for_each",
        "message0": "Time Window, emitting every %1 second(s) %2 %3 Merge Output",
        "args0": [
            {
                "type": "field_input",
                "name": "Duration",
                "text": "5"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "Operators",
                "check": "Operator"
            }
        ],
        "inputsInline": true,
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "A moving count window",
        "helpUrl": ""
    },
    {
        "type": "buffer_count",
        "message0": "Buffer %1 Values",
        "args0": [
            {
                "type": "field_number",
                "name": "Count",
                "value": 5,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Emit values in batches of size n. Emitting every n values.",
        "helpUrl": ""
    },
    {
        "type": "buffer_count_skip",
        "message0": "Buffer %1 Values , emitting every %2",
        "args0": [
            {
                "type": "field_number",
                "name": "Count",
                "value": 5,
                "min": 1,
                "precision": 1
            },
            {
                "type": "field_number",
                "name": "Skip",
                "value": 1,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Emit values in batches of size n. Emitting every m values.",
        "helpUrl": ""
    },
    {
        "type": "pairwise",
        "message0": "Pairwise",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Emit the current value and the previous value as a sequence.",
        "helpUrl": ""
    },
    {
        "type": "buffer_time",
        "message0": "Buffer %1 seconds",
        "args0": [
            {
                "type": "field_number",
                "name": "Duration",
                "value": 10,
                "min": 0
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Collect all of the values within a time window, emitting them together.",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "delay",
        "message0": "Delay %1 seconds",
        "args0": [
            {
                "type": "field_number",
                "name": "duration",
                "value": 10,
                "min": 0
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Delay every item from an observable by a fixed duration",
        "helpUrl": ""
    },
    {
        "type": "repeat",
        "message0": "Repeat %1 Times",
        "args0": [
            {
                "type": "field_number",
                "name": "count",
                "value": 3,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Reconnect to an observable n times after it completes",
        "helpUrl": ""
    },
    {
        "type": "throttle",
        "message0": "Throttle %1 seconds , emitting %2 value",
        "args0": [
            {
                "type": "field_number",
                "name": "Duration",
                "value": 10,
                "min": 0
            },
            {
                "type": "field_dropdown",
                "name": "End",
                "options": [
                    ["First", "First"],
                    ["Last", "Last"]
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Throttle the values. Only emitting a value every t seconds.",
        "helpUrl": ""
    },
    {
        "type": "timestamp",
        "message0": "Timestamp",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Wrap each event in a TimestampedValue(...) event containing the value and a timestamp",
        "helpUrl": ""
    },
    {
        "type": "timeout",
        "message0": "Timeout %1 seconds",
        "args0": [
            {
                "type": "field_number",
                "name": "Duration",
                "value": 10,
                "min": 0
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 230,
        "tooltip": "Throw an error if we don't see a value in 't' seconds",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "moving_average",
        "message0": "Moving Average of last %1 Values",
        "args0": [
            {
                "type": "field_number",
                "name": "Count",
                "value": 5,
                "min": 1,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 195,
        "tooltip": "Calculate a moving average",
        "helpUrl": ""
    },
    {
        "type": "delta",
        "message0": "Delta",
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 195,
        "tooltip": "Calculate the difference between the current and the previous value.",
        "helpUrl": ""
    },
    {
        "type": "moving_gradient",
        "message0": "Moving Gradient of last %1 Values",
        "args0": [
            {
                "type": "field_number",
                "name": "Count",
                "value": 5,
                "min": 2,
                "precision": 1
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 195,
        "tooltip": "Calculate a moving gradient",
        "helpUrl": ""
    },
    {
        "type": "variance",
        "message0": "Variance %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "Type",
                "options": [
                    ["Sample", "Sample"],
                    ["Population", "Population"]
                ]
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 195,
        "tooltip": "Calculate the variance of all values in an Observable. Emitting once complete.",
        "helpUrl": ""
    },
    {
        "type": "volatility_bands",
        "message0": "Bollinger Bands, %1 Standard Deviations from the Mean of the last %2 Values",
        "args0": [
            {
                "type": "field_input",
                "name": "StdDevs",
                "text": "2"
            },
            {
                "type": "field_input",
                "name": "Count",
                "text": "5"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 194,
        "tooltip": "Calculates values required to plot Bollinger Bands",
        "helpUrl": ""
    }
]);
Blockly.defineBlocksWithJsonArray([
    {
        "type": "threshold",
        "message0": "%1 Threshold at %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "Direction",
                "options": [
                    ["Bi-directional", "Both"],
                    ["Rising", "Rising"],
                    ["Falling", "Falling"]
                ]
            },
            {
                "type": "field_number",
                "name": "Threshold",
                "value": 123.4
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 195,
        "tooltip": "A threshold on received numeric values. Outputs a value when the threshold is crossed.",
        "helpUrl": ""
    },
    {
        "type": "corridor",
        "message0": "Corridor %1 Value %2 Upper %3 Lower %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "Value",
                "check": [
                    "lambda",
                    "CustomAction"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "Upper",
                "check": [
                    "lambda",
                    "CustomAction"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "Lower",
                "check": [
                    "lambda",
                    "CustomAction"
                ],
                "align": "RIGHT"
            }
        ],
        "previousStatement": "Operator",
        "nextStatement": "Operator",
        "colour": 195,
        "tooltip": "Detect when a value leaves a central corridor",
        "helpUrl": ""
    }
]);
System.register("generators/rxepl/output", ["generators/rxepl"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function Output(Generator) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.subscribe = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_1.RX_EPL_PACKAGE_NAME + '.ISubscription');
                Blockly.RxEPL.definitions_.usings.push(rxepl_1.RX_EPL_PACKAGE_NAME + '.Subscriber');
                var source_observable = Blockly.RxEPL.valueToCode(block, 'SourceObservable', 0);
                var onNext = Blockly.RxEPL.valueToCode(block, 'onNext', 0);
                if (onNext) {
                    var connectedBlock = block.getInputTargetBlock('onNext');
                    if (connectedBlock.outputConnection.check_.indexOf('CustomAction') != -1) {
                        Blockly.RxEPL.addCustomAction_(connectedBlock, onNext, 1, null);
                    }
                    onNext = '.onNext(' + onNext + ')';
                }
                var onError = Blockly.RxEPL.valueToCode(block, 'onError', 0);
                if (onError) {
                    var connectedBlock = block.getInputTargetBlock('onError');
                    if (connectedBlock.outputConnection.check_.indexOf('CustomAction') != -1) {
                        Blockly.RxEPL.addCustomAction_(connectedBlock, onError, 1, null);
                    }
                    onError = '.onError(' + onError + ')';
                }
                var onComplete = Blockly.RxEPL.valueToCode(block, 'onComplete', 0);
                if (onComplete) {
                    var connectedBlock = block.getInputTargetBlock('onComplete');
                    if (connectedBlock.outputConnection.check_.indexOf('CustomAction') != -1) {
                        Blockly.RxEPL.addCustomAction_(connectedBlock, onComplete, 0, null);
                    }
                    onComplete = '.onComplete(' + onComplete + ')';
                }
                var subscribe = '.subscribe(Subscriber.create()' + onNext + onError + onComplete + ');\n';
                subscribe = Blockly.RxEPL.prefixLines(subscribe, Blockly.RxEPL.INDENT);
                if (source_observable) {
                    var subscription = 'ISubscription ' + Blockly.RxEPL.variableDB_.getDistinctName('s', 'Subscription');
                    return subscription + ' := ' + source_observable + '\n' + subscribe;
                }
                else {
                    return Blockly.RxEPL.prefixLines(subscribe, '//');
                }
            };
            class_1.prototype.log_value = function (block) {
                var logLevel = block.getFieldValue('logLevel');
                Blockly.RxEPL.definitions_.actions.push("action logAt" + logLevel + "(any value) {\n" + Blockly.RxEPL.INDENT + "log value.valueToString() at " + logLevel + ";\n}\n");
                return ["logAt" + logLevel];
            };
            class_1.prototype.to_channel = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_1.RX_EPL_PACKAGE_NAME + '.IDisposable');
                var channelName = Blockly.RxEPL.quote_(block.getFieldValue('ChannelName'));
                var source_observable = Blockly.RxEPL.valueToCode(block, 'SourceObservable', 0);
                var disposable = Blockly.RxEPL.variableDB_.getDistinctName('d', 'IDisposable');
                return "IDisposable " + disposable + " := " + source_observable + "\n" +
                    Blockly.RxEPL.INDENT + (".toChannel(" + channelName + ");\n");
            };
            return class_1;
        }(Generator));
    }
    exports_1("Output", Output);
    var rxepl_1;
    return {
        setters: [
            function (rxepl_1_1) {
                rxepl_1 = rxepl_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/numberformatter", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function formatNumber(num, type) {
        if (typeof num === 'number') {
            switch (type) {
                case 'float': {
                    return num + (num === Math.floor(num) ? '.0' : '');
                }
                case 'decimal': {
                    return formatNumber(num, 'float') + 'd';
                }
                default: {
                    return num.toFixed(0);
                }
            }
        }
        else if (typeof num === 'string') {
            if (num.match(/^\s*\d*(\.\d*)?d?\s*$/g)) {
                return formatNumber(parseFloat(num), type);
            }
        }
        return num;
    }
    exports_2("formatNumber", formatNumber);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/source", ["generators/rxepl", "generators/rxepl/numberformatter"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function Source(Generator) {
        return (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_2.prototype.from_channel = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_2.RX_EPL_PACKAGE_NAME + '.Observable');
                var channel_name = block.getFieldValue('CHANNEL_NAME');
                return ['Observable.fromChannel(' + Blockly.RxEPL.quote_(channel_name) + ')'];
            };
            class_2.prototype.from_stream = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_2.RX_EPL_PACKAGE_NAME + '.Observable');
                var variable = block.getFieldValue('var');
                var listener = block.getFieldValue('listener');
                var query = block.getFieldValue('query');
                var channel = block.getFieldValue('channel');
                Blockly.RxEPL.definitions_.subscriptions.push(channel);
                return ['Observable.fromStream(from ' + variable + ' in ' + listener + ' select <any> ' + query + ')'];
            };
            class_2.prototype.from_values = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_2.RX_EPL_PACKAGE_NAME + '.Observable');
                var values = block.getFieldValue('Values');
                return ['Observable.fromValues([' + values + '])'];
            };
            class_2.prototype.interval = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_2.RX_EPL_PACKAGE_NAME + '.Observable');
                var interval = numberformatter_1.formatNumber(block.getFieldValue('Interval'), 'float');
                return ["Observable.interval(" + interval + ")"];
            };
            return class_2;
        }(Generator));
    }
    exports_3("Source", Source);
    var rxepl_2, numberformatter_1;
    return {
        setters: [
            function (rxepl_2_1) {
                rxepl_2 = rxepl_2_1;
            },
            function (numberformatter_1_1) {
                numberformatter_1 = numberformatter_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators/aggregation", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function Aggregation(Generator) {
        return (function (_super) {
            __extends(class_3, _super);
            function class_3() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_3.prototype.reduce_with_initial = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var initial = Blockly.RxEPL.valueToCode(block, 'Initial', 0);
                var inputBlock = block.getInputTargetBlock("Action");
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.function2(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 2, 'any');
                }
                return ".reduceWithInitial(" + action + ", " + initial + ");\n";
            };
            class_3.prototype.average = function (block) {
                return '.average();\n';
            };
            class_3.prototype.count = function (block) {
                return '.count();\n';
            };
            class_3.prototype.sum = function (block) {
                return '.sum();\n';
            };
            class_3.prototype.concat_string = function (block) {
                return '.concatString();\n';
            };
            class_3.prototype.max = function (block) {
                return '.max();\n';
            };
            class_3.prototype.min = function (block) {
                return '.min();\n';
            };
            return class_3;
        }(Generator));
    }
    exports_4("Aggregation", Aggregation);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators/combining", ["generators/rxepl"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function Combining(Generator) {
        return (function (_super) {
            __extends(class_4, _super);
            function class_4() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_4.prototype.with_latest_from = function (block) {
                var otherObservable = Blockly.RxEPL.valueToCode(block, 'OtherObservable', 0);
                if (otherObservable) {
                    var action = Blockly.RxEPL.valueToCode(block, 'Combiner', 0);
                    var inputBlock = block.getInputTargetBlock('Combiner');
                    var inputTypes = inputBlock.outputConnection.check_;
                    if (inputTypes.indexOf('lambda') != -1) {
                        action = "Lambda.function(" + action + ")";
                    }
                    else if (inputTypes.indexOf('CustomAction') != -1) {
                        Blockly.RxEPL.addCustomAction_(inputBlock, action, 'many', 'any');
                    }
                    return '.withLatestFrom([\n' +
                        Blockly.RxEPL.prefixLines(otherObservable, Blockly.RxEPL.INDENT) + '\n' +
                        ("], " + action + ");\n");
                }
                else {
                    return '';
                }
            };
            class_4.prototype.combine_latest = function (block) {
                var otherObservable = Blockly.RxEPL.valueToCode(block, 'OtherObservable', 0);
                if (otherObservable) {
                    var action = Blockly.RxEPL.valueToCode(block, 'Combiner', 0);
                    var inputBlock = block.getInputTargetBlock('Combiner');
                    var inputTypes = inputBlock.outputConnection.check_;
                    if (inputTypes.indexOf('lambda') != -1) {
                        action = "Lambda.function(" + action + ")";
                    }
                    else if (inputTypes.indexOf('CustomAction') != -1) {
                        Blockly.RxEPL.addCustomAction_(inputBlock, action, 'many', 'any');
                    }
                    return '.combineLatest([\n' +
                        Blockly.RxEPL.prefixLines(otherObservable, Blockly.RxEPL.INDENT) + '\n' +
                        ("], " + action + ");\n");
                }
                else {
                    return '';
                }
            };
            class_4.prototype.merge = function (block) {
                var otherObservable = Blockly.RxEPL.valueToCode(block, 'OtherObservable', 0);
                if (otherObservable) {
                    return '.merge([\n' +
                        Blockly.RxEPL.prefixLines(otherObservable, Blockly.RxEPL.INDENT) + '\n' +
                        "]);\n";
                }
                else {
                    return '';
                }
            };
            class_4.prototype.zip = function (block) {
                var otherObservable = Blockly.RxEPL.valueToCode(block, 'OtherObservable', 0);
                if (otherObservable) {
                    var action = Blockly.RxEPL.valueToCode(block, 'Combiner', 0);
                    var inputBlock = block.getInputTargetBlock('Combiner');
                    var inputTypes = inputBlock.outputConnection.check_;
                    if (inputTypes.indexOf('lambda') != -1) {
                        action = "Lambda.function(" + action + ")";
                    }
                    else if (inputTypes.indexOf('CustomAction') != -1) {
                        Blockly.RxEPL.addCustomAction_(inputBlock, action, 'many', 'any');
                    }
                    return '.zip([\n' +
                        Blockly.RxEPL.prefixLines(otherObservable, Blockly.RxEPL.INDENT) + '\n' +
                        ("], " + action + ");\n");
                }
                else {
                    return '';
                }
            };
            class_4.prototype.concat = function (block) {
                var otherObservable = Blockly.RxEPL.valueToCode(block, 'OtherObservable', 0);
                if (otherObservable) {
                    return '.concat([\n' +
                        Blockly.RxEPL.prefixLines(otherObservable, Blockly.RxEPL.INDENT) + '\n' +
                        "]);\n";
                }
                else {
                    return '';
                }
            };
            class_4.prototype.start_with = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_3.RX_EPL_PACKAGE_NAME + '.Observable');
                var values = block.getFieldValue('Values');
                return ".startWith([<any> " + values + "]);\n";
            };
            return class_4;
        }(Generator));
    }
    exports_5("Combining", Combining);
    var rxepl_3;
    return {
        setters: [
            function (rxepl_3_1) {
                rxepl_3 = rxepl_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators/conditional", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function Conditional(Generator) {
        return (function (_super) {
            __extends(class_5, _super);
            function class_5() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_5.prototype.contains = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.predicate(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'boolean');
                }
                return ".contains(" + action + ");\n";
            };
            class_5.prototype.every = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.predicate(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'boolean');
                }
                return ".every(" + action + ");\n";
            };
            return class_5;
        }(Generator));
    }
    exports_6("Conditional", Conditional);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators/errorHandling", ["generators/rxepl/numberformatter"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function ErrorHandling(Generator) {
        return (function (_super) {
            __extends(class_6, _super);
            function class_6() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_6.prototype.catch_error = function (block) {
                var onError = Blockly.RxEPL.valueToCode(block, 'OnError', 0);
                if (onError) {
                    return '.catchError(\n' +
                        Blockly.RxEPL.prefixLines(onError, Blockly.RxEPL.INDENT) + '\n' +
                        ");\n";
                }
                else {
                    return '';
                }
            };
            class_6.prototype.retry = function (block) {
                var count = numberformatter_2.formatNumber(block.getFieldValue('count'), 'integer');
                return ".retry(" + count + ");\n";
            };
            return class_6;
        }(Generator));
    }
    exports_7("ErrorHandling", ErrorHandling);
    var numberformatter_2;
    return {
        setters: [
            function (numberformatter_2_1) {
                numberformatter_2 = numberformatter_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators/filtering", ["generators/rxepl/numberformatter"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function Filtering(Generator) {
        return (function (_super) {
            __extends(class_7, _super);
            function class_7() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_7.prototype.filter = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.predicate(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'boolean');
                }
                return ".filter(" + action + ");\n";
            };
            class_7.prototype.take = function (block) {
                var count = numberformatter_3.formatNumber(block.getFieldValue('count'), 'integer');
                return ".take(" + count + ");\n";
            };
            class_7.prototype.skip = function (block) {
                var count = numberformatter_3.formatNumber(block.getFieldValue('count'), 'integer');
                return ".skip(" + count + ");\n";
            };
            class_7.prototype.take_last = function (block) {
                var count = numberformatter_3.formatNumber(block.getFieldValue('count'), 'integer');
                return ".takeLast(" + count + ");\n";
            };
            class_7.prototype.skip_last = function (block) {
                var count = numberformatter_3.formatNumber(block.getFieldValue('count'), 'integer');
                return ".skipLast(" + count + ");\n";
            };
            class_7.prototype.distinct = function (block) {
                return '.distinct();\n';
            };
            class_7.prototype.distinct_by = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.predicate(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'boolean');
                }
                return ".distinctBy(" + action + ");\n";
            };
            class_7.prototype.distinct_until_changed = function (block) {
                return '.distinctUntilChanged();\n';
            };
            class_7.prototype.distinct_by_until_changed = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.predicate(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'boolean');
                }
                return ".distinctByUntilChanged(" + action + ");\n";
            };
            class_7.prototype.ignore_elements = function (block) {
                return '.ignoreElements();\n';
            };
            return class_7;
        }(Generator));
    }
    exports_8("Filtering", Filtering);
    var numberformatter_3;
    return {
        setters: [
            function (numberformatter_3_1) {
                numberformatter_3 = numberformatter_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators/transforming", ["generators/rxepl/numberformatter"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function Transforming(Generator) {
        return (function (_super) {
            __extends(class_8, _super);
            function class_8() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_8.prototype.map = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.function1(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'any');
                }
                return ".map(" + action + ");\n";
            };
            class_8.prototype.flat_map = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.function1(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'any');
                }
                return ".flatMap(" + action + ");\n";
            };
            class_8.prototype.moving_count_window = function (block) {
                var count = numberformatter_4.formatNumber(block.getFieldValue('count'), 'integer');
                var skip = numberformatter_4.formatNumber(block.getFieldValue('skip'), 'integer');
                var operators = (Blockly.RxEPL.statementToCode(block, 'Operators') || '')
                    .split(';\n')
                    .map(function (x) { return x.trim(); })
                    .filter(function (x) { return x != ''; });
                var window;
                do {
                    window = Blockly.RxEPL.variableDB_.getDistinctName('window', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[window]);
                Blockly.RxEPL.definitions_.customActionTypes[window] = 'action<any> returns any';
                var pipe = operators.length > 0 ? '\n' + Blockly.RxEPL.prefixLines(operators.join('\n'), Blockly.RxEPL.INDENT) : '';
                Blockly.RxEPL.definitions_.actions.push("action " + window + "(any valuesInWindowSeq) returns any {\n" + Blockly.RxEPL.prefixLines("return Observable.fromValues(valuesInWindowSeq)" + pipe + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return ".bufferCountSkip(" + count + ", " + skip + ");\n" +
                    (".flatMap(" + window + ");\n");
            };
            class_8.prototype.scan_with_initial = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var initial = Blockly.RxEPL.valueToCode(block, 'Initial', 0);
                var inputBlock = block.getInputTargetBlock("Action");
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.function2(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 2, 'any');
                }
                return ".scanWithInitial(" + action + ", " + initial + ");\n";
            };
            class_8.prototype.group_by_for_each = function (block) {
                var action = Blockly.RxEPL.valueToCode(block, 'Action', 0);
                var inputBlock = block.getInputTargetBlock('Action');
                var inputTypes = inputBlock.outputConnection.check_;
                if (inputTypes.indexOf('lambda') != -1) {
                    action = "Lambda.function1(" + action + ")";
                }
                else if (inputTypes.indexOf('CustomAction') != -1) {
                    Blockly.RxEPL.addCustomAction_(inputBlock, action, 1, 'any');
                }
                var operators = (Blockly.RxEPL.statementToCode(block, 'Operators') || '')
                    .split(';\n')
                    .map(function (x) { return x.trim(); })
                    .filter(function (x) { return x != ''; });
                var group;
                do {
                    group = Blockly.RxEPL.variableDB_.getDistinctName('withEveryGroup', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[group]);
                Blockly.RxEPL.definitions_.customActionTypes[group] = 'action<any> returns any';
                var pipe = operators.length > 0 ? '\n' + Blockly.RxEPL.prefixLines(operators.join('\n'), Blockly.RxEPL.INDENT) : '';
                Blockly.RxEPL.definitions_.actions.push("action " + group + "(any observableOfValues) returns any {\n" + Blockly.RxEPL.prefixLines("return (<IObservable> observableOfValues)" + pipe + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return ".groupBy(" + action + ");\n" +
                    (".flatMap(" + group + ");\n");
            };
            class_8.prototype.window_time_for_each = function (block) {
                var duration = numberformatter_4.formatNumber(block.getFieldValue('Duration'), 'float');
                var operators = (Blockly.RxEPL.statementToCode(block, 'Operators') || '')
                    .split(';\n')
                    .map(function (x) { return x.trim(); })
                    .filter(function (x) { return x != ''; });
                var window;
                do {
                    window = Blockly.RxEPL.variableDB_.getDistinctName('window', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[window]);
                Blockly.RxEPL.definitions_.customActionTypes[window] = 'action<any> returns any';
                var pipe = operators.length > 0 ? '\n' + Blockly.RxEPL.prefixLines(operators.join('\n'), Blockly.RxEPL.INDENT) : '';
                Blockly.RxEPL.definitions_.actions.push("action " + window + "(any valuesInWindowSeq) returns any {\n" + Blockly.RxEPL.prefixLines("return Observable.fromValues(valuesInWindowSeq)" + pipe + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return ".windowTime(" + duration + ");\n" +
                    (".flatMap(" + window + ");\n");
            };
            class_8.prototype.buffer_count = function (block) {
                var count = numberformatter_4.formatNumber(block.getFieldValue('Count'), 'integer');
                return ".bufferCount(" + count + ");\n";
            };
            class_8.prototype.buffer_count_skip = function (block) {
                var count = numberformatter_4.formatNumber(block.getFieldValue('Count'), 'integer');
                var skip = numberformatter_4.formatNumber(block.getFieldValue('Skip'), 'integer');
                return ".bufferCountSkip(" + count + ", " + skip + ");\n";
            };
            class_8.prototype.pairwise = function (block) {
                return '.pairwise();\n';
            };
            class_8.prototype.buffer_time = function (block) {
                var duration = numberformatter_4.formatNumber(block.getFieldValue('Duration'), 'float');
                return ".bufferTime(" + duration + ");\n";
            };
            return class_8;
        }(Generator));
    }
    exports_9("Transforming", Transforming);
    var numberformatter_4;
    return {
        setters: [
            function (numberformatter_4_1) {
                numberformatter_4 = numberformatter_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators/utilities", ["generators/rxepl/numberformatter"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    function Utilities(Generator) {
        return (function (_super) {
            __extends(class_9, _super);
            function class_9() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_9.prototype.delay = function (block) {
                var duration = numberformatter_5.formatNumber(block.getFieldValue('duration'), 'float');
                return ".delay(" + duration + ");\n";
            };
            class_9.prototype.repeat = function (block) {
                var count = numberformatter_5.formatNumber(block.getFieldValue('count'), 'integer');
                return ".repeat(" + count + ");\n";
            };
            class_9.prototype.throttle = function (block) {
                var duration = numberformatter_5.formatNumber(block.getFieldValue('Duration'), 'float');
                var end = block.getFieldValue('End');
                return ".throttle" + end + "(" + duration + ");\n";
            };
            class_9.prototype.timestamp = function (block) {
                return '.timestamp();\n';
            };
            class_9.prototype.timeout = function (block) {
                var duration = numberformatter_5.formatNumber(block.getFieldValue('Duration'), 'float');
                return ".timeout(" + duration + ");\n";
            };
            return class_9;
        }(Generator));
    }
    exports_10("Utilities", Utilities);
    var numberformatter_5;
    return {
        setters: [
            function (numberformatter_5_1) {
                numberformatter_5 = numberformatter_5_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/operators", ["generators/rxepl/operators/aggregation", "generators/rxepl/operators/combining", "generators/rxepl/operators/conditional", "generators/rxepl/operators/errorHandling", "generators/rxepl/operators/filtering", "generators/rxepl/operators/transforming", "generators/rxepl/operators/utilities"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    function Operators_Main(Generator) {
        return (function (_super) {
            __extends(class_10, _super);
            function class_10() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_10.prototype.operators = function (block) {
                var source_observable = Blockly.RxEPL.valueToCode(block, 'SourceObservable', 0);
                var operators = (Blockly.RxEPL.statementToCode(block, 'Operators') || '')
                    .split(';\n')
                    .map(function (x) { return x.trim(); })
                    .filter(function (x) { return x != ''; });
                if (operators.length > 0) {
                    var pipe = operators.join('\n');
                    pipe = Blockly.RxEPL.prefixLines(pipe, Blockly.RxEPL.INDENT);
                    return [source_observable + '\n' + pipe];
                }
                else {
                    return [source_observable];
                }
            };
            return class_10;
        }(Generator));
    }
    function Operators(Generator) {
        return Operators_Main(aggregation_1.Aggregation(combining_1.Combining(conditional_1.Conditional(errorHandling_1.ErrorHandling(filtering_1.Filtering(transforming_1.Transforming(utilities_1.Utilities(Generator))))))));
    }
    exports_11("Operators", Operators);
    var aggregation_1, combining_1, conditional_1, errorHandling_1, filtering_1, transforming_1, utilities_1;
    return {
        setters: [
            function (aggregation_1_1) {
                aggregation_1 = aggregation_1_1;
            },
            function (combining_1_1) {
                combining_1 = combining_1_1;
            },
            function (conditional_1_1) {
                conditional_1 = conditional_1_1;
            },
            function (errorHandling_1_1) {
                errorHandling_1 = errorHandling_1_1;
            },
            function (filtering_1_1) {
                filtering_1 = filtering_1_1;
            },
            function (transforming_1_1) {
                transforming_1 = transforming_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/functions", ["generators/rxepl"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function Functions(Generator) {
        return (function (_super) {
            __extends(class_11, _super);
            function class_11() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_11.prototype.lambda = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_4.LAMBDA_PACKAGE_NAME + '.Lambda');
                var arg = block.getFieldValue('Arg');
                if (!arg) {
                    arg = 'x';
                    block.setFieldValue('Arg', 'x');
                }
                var expression = block.getFieldValue('Expression');
                if (!expression) {
                    expression = arg;
                    block.setFieldValue('Expression', 'x');
                }
                return [Blockly.RxEPL.quote_(arg + ' => ' + expression)];
            };
            class_11.prototype.custom_action = function (block) {
                var actionName = block.getFieldValue('ActionName');
                return [actionName];
            };
            return class_11;
        }(Generator));
    }
    exports_12("Functions", Functions);
    var rxepl_4;
    return {
        setters: [
            function (rxepl_4_1) {
                rxepl_4 = rxepl_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/values", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function Values(Generator) {
        return (function (_super) {
            __extends(class_12, _super);
            function class_12() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_12.prototype.value = function (block) {
                return [block.getFieldValue('value')];
            };
            return class_12;
        }(Generator));
    }
    exports_13("Values", Values);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/customOperators", ["generators/rxepl"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function CustomOperators(Generator) {
        return (function (_super) {
            __extends(class_13, _super);
            function class_13() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_13.prototype.custom_operator = function (block) {
                return ".complexPipe(" + block.getProcedureCall() + ");\n";
            };
            class_13.prototype.custom_operator_definition = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_5.RX_EPL_PACKAGE_NAME + '.IObservable');
                var operators = (Blockly.RxEPL.statementToCode(block, 'Operators') || '')
                    .split(';\n')
                    .map(function (x) { return x.trim(); })
                    .filter(function (x) { return x != ''; });
                var operatorName = block.getFieldValue('OperatorName');
                Blockly.RxEPL.definitions_.customActionTypes[operatorName] = 'action<IObservable> returns IObservable';
                var pipe = operators.length > 0 ? '\n' + Blockly.RxEPL.prefixLines(operators.join('\n'), Blockly.RxEPL.INDENT) : '';
                Blockly.RxEPL.definitions_.actions.push("action " + operatorName + "(IObservable o) returns IObservable {\n" + Blockly.RxEPL.prefixLines("return o" + pipe + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return '';
            };
            class_13.prototype.custom_operator_arg = function (block) {
                return ['o'];
            };
            class_13.prototype.complex_custom_operator_definition = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_5.RX_EPL_PACKAGE_NAME + '.IObservable');
                var argName = Blockly.RxEPL.valueToCode(block, 'Arg', 0);
                var code = Blockly.RxEPL.statementToCode(block, 'Code');
                var returnVal = Blockly.RxEPL.valueToCode(block, 'Return', 0);
                var operatorName = block.getFieldValue('OperatorName');
                Blockly.RxEPL.definitions_.customActionTypes[operatorName] = 'action<IObservable> returns IObservable';
                Blockly.RxEPL.definitions_.actions.push("action " + operatorName + "(IObservable " + argName + ") returns IObservable {\n" + code + Blockly.RxEPL.prefixLines("return " + returnVal + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return '';
            };
            return class_13;
        }(Generator));
    }
    exports_14("CustomOperators", CustomOperators);
    var rxepl_5;
    return {
        setters: [
            function (rxepl_5_1) {
                rxepl_5 = rxepl_5_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/variables", ["generators/rxepl"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    function Variables(Generator) {
        return (function (_super) {
            __extends(class_14, _super);
            function class_14() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_14.prototype.set_var = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_6.RX_EPL_PACKAGE_NAME + '.IObservable');
                var varName = block.workspace.getVariableById(block.getFieldValue('Variable')).name;
                var varValue = Blockly.RxEPL.valueToCode(block, 'Observable', 0);
                return "IObservable " + varName + " := " + varValue + ";\n";
            };
            class_14.prototype.get_var = function (block) {
                return [block.workspace.getVariableById(block.getFieldValue('Variable')).name];
            };
            return class_14;
        }(Generator));
    }
    exports_15("Variables", Variables);
    var rxepl_6;
    return {
        setters: [
            function (rxepl_6_1) {
                rxepl_6 = rxepl_6_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/prebuilt/detectors", ["generators/rxepl"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function getInputTargetAsAction(block, target) {
        var action = Blockly.RxEPL.valueToCode(block, target, 0);
        if (!action) {
            return action;
        }
        var inputBlock = block.getInputTargetBlock(target);
        var inputTypes = inputBlock.outputConnection.check_;
        if (inputTypes.indexOf('lambda') != -1) {
            action = "Lambda.function1(" + action + ")";
        }
        else if (inputTypes.indexOf('CustomAction') != -1) {
            Blockly.RxEPL.addCustomAction_(inputBlock, action, 2, 'any');
        }
        return action;
    }
    function Detectors(Generator) {
        return (function (_super) {
            __extends(class_15, _super);
            function class_15() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_15.prototype.threshold = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_7.LAMBDA_PACKAGE_NAME + '.Lambda');
                var direction = block.getFieldValue('Direction');
                var threshold = block.getFieldValue('Threshold');
                var predicate;
                switch (direction) {
                    case 'Rising': {
                        predicate = "current > " + threshold + " and prev <= " + threshold;
                        break;
                    }
                    case 'Falling': {
                        predicate = "current < " + threshold + " and prev >= " + threshold;
                        break;
                    }
                    default: {
                        predicate = "(current > " + threshold + " and prev <= " + threshold + ") or (current < " + threshold + " and prev >= " + threshold + ")";
                        break;
                    }
                }
                return '.pairwise();\n' +
                    (".filter(Lambda.predicate(\"[prev, current] => " + predicate + "\"));\n");
            };
            class_15.prototype.corridor = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_7.LAMBDA_PACKAGE_NAME + '.Lambda');
                var value = getInputTargetAsAction(block, "Value");
                var upper = getInputTargetAsAction(block, "Upper");
                var lower = getInputTargetAsAction(block, "Lower");
                var corridor;
                do {
                    corridor = Blockly.RxEPL.variableDB_.getDistinctName('corridor', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[corridor]);
                Blockly.RxEPL.definitions_.customActionTypes[corridor] = 'action<any> returns any';
                Blockly.RxEPL.definitions_.actions.push("action " + corridor + "(any value) returns any {\n" + Blockly.RxEPL.prefixLines('return [\n' +
                    Blockly.RxEPL.prefixLines(upper + "(value),\n" +
                        (lower + "(value),\n") +
                        (value + "(value)\n"), Blockly.RxEPL.INDENT) +
                    '];\n', Blockly.RxEPL.INDENT) + "}\n");
                return ".map(" + corridor + ");\n" +
                    '.pairwise();\n' +
                    '.filter(Lambda.predicate("[prev, curr] => (prev[2] < prev[0] and curr[2] > curr[0]) or (prev[2] > prev[1] and curr[2] < curr[1])"))';
            };
            return class_15;
        }(Generator));
    }
    exports_16("Detectors", Detectors);
    var rxepl_7;
    return {
        setters: [
            function (rxepl_7_1) {
                rxepl_7 = rxepl_7_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/prebuilt/calculating", ["generators/rxepl"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function Calculating(Generator) {
        return (function (_super) {
            __extends(class_16, _super);
            function class_16() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_16.prototype.moving_average = function (block) {
                var count = block.getFieldValue('Count');
                var window;
                do {
                    window = Blockly.RxEPL.variableDB_.getDistinctName('window', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[window]);
                Blockly.RxEPL.definitions_.customActionTypes[window] = 'action<any> returns any';
                var pipe = Blockly.RxEPL.prefixLines('.average()', Blockly.RxEPL.INDENT);
                Blockly.RxEPL.definitions_.actions.push("action " + window + "(any valuesInWindowSeq) returns any {\n" + Blockly.RxEPL.prefixLines("return Observable.fromValues(valuesInWindowSeq)\n" + pipe + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return ".bufferCountSkip(" + count + ", 1);\n" +
                    (".flatMap(" + window + ");\n");
            };
            class_16.prototype.delta = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_8.LAMBDA_PACKAGE_NAME + '.Lambda');
                return '.pairwise();\n' +
                    '.map(Lambda.function1("[prev, current] => current - prev"));\n';
            };
            class_16.prototype.moving_gradient = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_8.LAMBDA_PACKAGE_NAME + '.Lambda');
                var count = block.getFieldValue('Count');
                var window;
                do {
                    window = Blockly.RxEPL.variableDB_.getDistinctName('window', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[window]);
                Blockly.RxEPL.definitions_.customActionTypes[window] = 'action<any> returns any';
                var pipe = Blockly.RxEPL.prefixLines('.pairwise()\n' +
                    '.map(Lambda.function1("[prev, current] => (current.value - prev.value) / (current.timestamp - prev.timestamp)"))\n' +
                    '.average()', Blockly.RxEPL.INDENT);
                Blockly.RxEPL.definitions_.actions.push("action " + window + "(any valuesInWindowSeq) returns any {\n" + Blockly.RxEPL.prefixLines("return Observable.fromValues(valuesInWindowSeq)\n" + pipe + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return '.timestamp();\n' +
                    (".bufferCountSkip(" + count + ", 1);\n") +
                    (".flatMap(" + window + ");\n");
            };
            class_16.prototype.variance = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_8.LAMBDA_PACKAGE_NAME + '.Lambda');
                var type = block.getFieldValue('Type');
                return '.scanWithInitial(Lambda.function2("[m2, prevAvg, prevCount], value => [m2 + (value - prevAvg) * (value - (prevAvg + (value - prevAvg) / (prevCount + 1))), (prevAvg + (value - prevAvg) / (prevCount + 1)), prevCount + 1]"), [0, 0, 0]);\n' +
                    '.skip(1);\n' +
                    '.takeLast(1);\n' +
                    (type == 'Population' ? '.map(Lambda.function1("[m2, avg, count] => m2 / count"));\n' : '.map(Lambda.function1("[m2, avg, count] => m2 / (count - 1)"));\n');
            };
            class_16.prototype.volatility_bands = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_8.LAMBDA_PACKAGE_NAME + '.Lambda');
                var stdDevCount = block.getFieldValue('StdDevs');
                var valueCount = block.getFieldValue('Count');
                Blockly.RxEPL.definitions_.events.push('event BollingerBand {\n' +
                    Blockly.RxEPL.INDENT + "float upperBound;\n" +
                    Blockly.RxEPL.INDENT + "float lowerBound;\n" +
                    Blockly.RxEPL.INDENT + "float avg;\n" +
                    Blockly.RxEPL.INDENT + "float value;\n" +
                    "}\n");
                var window;
                do {
                    window = Blockly.RxEPL.variableDB_.getDistinctName('window', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[window]);
                Blockly.RxEPL.definitions_.customActionTypes[window] = 'action<any> returns any';
                var pipe = Blockly.RxEPL.prefixLines('.scanWithInitial(Lambda.function2("[m2, prevAvg, prevCount], value => [m2 + (value - prevAvg) * (value - (prevAvg + (value - prevAvg) / (prevCount + 1))), (prevAvg + (value - prevAvg) / (prevCount + 1)), prevCount + 1, value]"), [0, 0, 0])\n' +
                    '.skip(1)\n' +
                    '.takeLast(1)\n' +
                    '.map(Lambda.function1("[m2, avg, count, value] => [(m2 / (count - 1)).sqrt(), avg, value]"))', Blockly.RxEPL.INDENT);
                Blockly.RxEPL.definitions_.actions.push("action " + window + "(any valuesInWindowSeq) returns any {\n" + Blockly.RxEPL.prefixLines("return Observable.fromValues(valuesInWindowSeq)\n" + pipe + ";\n", Blockly.RxEPL.INDENT) + "}\n");
                return ".bufferCountSkip(" + valueCount + ", 1);\n" +
                    (".flatMap(" + window + ");\n") +
                    (".map(Lambda.function1(\"[stdDev, avg, value] => BollingerBand(avg + " + stdDevCount + " * std, avg - " + stdDevCount + " * std, avg, value)\"));\n");
            };
            return class_16;
        }(Generator));
    }
    exports_17("Calculating", Calculating);
    var rxepl_8;
    return {
        setters: [
            function (rxepl_8_1) {
                rxepl_8 = rxepl_8_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/prebuilt", ["generators/rxepl/prebuilt/detectors", "generators/rxepl/prebuilt/calculating"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    function Prebuilt(Generator) {
        return calculating_1.Calculating(detectors_1.Detectors(Generator));
    }
    exports_18("Prebuilt", Prebuilt);
    var detectors_1, calculating_1;
    return {
        setters: [
            function (detectors_1_1) {
                detectors_1 = detectors_1_1;
            },
            function (calculating_1_1) {
                calculating_1 = calculating_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/connectivity/iak", ["generators/rxepl"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    function getInputTargetAsAction(block, target) {
        var action = Blockly.RxEPL.valueToCode(block, target, 0);
        if (!action) {
            return action;
        }
        var inputBlock = block.getInputTargetBlock(target);
        var inputTypes = inputBlock.outputConnection.check_;
        if (inputTypes.indexOf('lambda') != -1) {
            action = "Lambda.function1(" + action + ")";
        }
        else if (inputTypes.indexOf('CustomAction') != -1) {
            Blockly.RxEPL.addCustomAction_(inputBlock, action, 2, 'any');
        }
        return action;
    }
    function IAK(Generator) {
        return (function (_super) {
            __extends(class_17, _super);
            function class_17() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_17.prototype.iak_to = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_9.RX_EPL_PACKAGE_NAME + '.ISubscription');
                Blockly.RxEPL.definitions_.usings.push(rxepl_9.RX_EPL_PACKAGE_NAME + '.Subscriber');
                Blockly.RxEPL.definitions_.usings.push('com.industry.analytic.Data');
                var source_observable = Blockly.RxEPL.valueToCode(block, 'Observable', 0);
                var streamName = getInputTargetAsAction(block, 'StreamName');
                var type = getInputTargetAsAction(block, 'Type');
                var sourceid = getInputTargetAsAction(block, 'SourceId');
                var timestamp = getInputTargetAsAction(block, 'timestamp');
                var dvalue = getInputTargetAsAction(block, 'dValue');
                var svalue = getInputTargetAsAction(block, 'sValue');
                var xvalue = getInputTargetAsAction(block, 'xValue');
                var yvalue = getInputTargetAsAction(block, 'yValue');
                var zvalue = getInputTargetAsAction(block, 'zValue');
                var toIak;
                do {
                    toIak = Blockly.RxEPL.variableDB_.getDistinctName('toIndustryAnalyticsKit', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[toIak]);
                Blockly.RxEPL.definitions_.customActionTypes[toIak] = 'action<any>';
                Blockly.RxEPL.definitions_.actions.push("action " + toIak + "(any value) {\n" + Blockly.RxEPL.prefixLines('Data data := new Data;\n' +
                    '\n' +
                    'data.streamName := ' + (streamName ? streamName + "(value).valueToString();\n" : '"";\n') +
                    'data.type := ' + (type ? type + "(value).valueToString();\n" : '"c";\n') +
                    'data.sourceId := ' + (sourceid ? sourceid + "(value).valueToString();\n" : '"";\n') +
                    'data.timestamp := ' + (timestamp ? "<decimal> " + timestamp + "(value);\n" : '<decimal> Lambda.function1("x => currentTime.toDecimal()")(value);\n') +
                    (dvalue ? "data.dValue := <decimal> " + dvalue + "(value);\n" : '') +
                    (svalue ? "data.sValue := " + svalue + "(value).valueToString();\n" : '') +
                    (xvalue ? "data.xValue := <float> " + xvalue + "(value);\n" : '') +
                    (yvalue ? "data.yValue := <float> " + yvalue + "(value);\n" : '') +
                    (zvalue ? "data.zValue := <float> " + zvalue + "(value);\n" : '') +
                    '\n' +
                    "send data to data.streamName;\n", Blockly.RxEPL.INDENT) + "}\n");
                var subscribe = ".subscribe(Subscriber.create().onNext(" + toIak + "));\n";
                subscribe = Blockly.RxEPL.prefixLines(subscribe, Blockly.RxEPL.INDENT);
                if (source_observable) {
                    var subscription = 'ISubscription ' + Blockly.RxEPL.variableDB_.getDistinctName('s', 'Subscription');
                    return subscription + ' := ' + source_observable + '\n' + subscribe;
                }
                else {
                    return Blockly.RxEPL.prefixLines(subscribe, '//');
                }
            };
            class_17.prototype.iak_from = function (block) {
                Blockly.RxEPL.definitions_.usings.push('com.industry.analytic.Data');
                var channel = block.getFieldValue('Channel');
                Blockly.RxEPL.definitions_.subscriptions.push(channel);
                return ["Observable.fromStream(from d in all Data(streamName = " + Blockly.RxEPL.quote_(channel) + ") select <any> d)"];
            };
            return class_17;
        }(Generator));
    }
    exports_19("IAK", IAK);
    var rxepl_9;
    return {
        setters: [
            function (rxepl_9_1) {
                rxepl_9 = rxepl_9_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/connectivity/cumulocity", ["generators/rxepl"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    function getInputTargetAsAction(block, target) {
        var action = Blockly.RxEPL.valueToCode(block, target, 0);
        if (!action) {
            return action;
        }
        var inputBlock = block.getInputTargetBlock(target);
        var inputTypes = inputBlock.outputConnection.check_;
        if (inputTypes.indexOf('lambda') != -1) {
            action = "Lambda.function1(" + action + ")";
        }
        else if (inputTypes.indexOf('CustomAction') != -1) {
            Blockly.RxEPL.addCustomAction_(inputBlock, action, 2, 'any');
        }
        return action;
    }
    function Cumulocty(Generator) {
        return (function (_super) {
            __extends(class_18, _super);
            function class_18() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_18.prototype.c8y_to_measurement = function (block) {
                Blockly.RxEPL.definitions_.usings.push(rxepl_10.RX_EPL_PACKAGE_NAME + '.ISubscription');
                Blockly.RxEPL.definitions_.usings.push(rxepl_10.RX_EPL_PACKAGE_NAME + '.Subscriber');
                Blockly.RxEPL.definitions_.usings.push('com.apama.cumulocity.Measurement');
                Blockly.RxEPL.definitions_.usings.push('com.apama.cumulocity.MeasurementValue');
                var source_observable = Blockly.RxEPL.valueToCode(block, 'Observable', 0);
                var id = getInputTargetAsAction(block, 'Id');
                var type = getInputTargetAsAction(block, 'Type');
                var source = getInputTargetAsAction(block, 'Source');
                var timestamp = getInputTargetAsAction(block, 'Timestamp');
                var fragment = getInputTargetAsAction(block, 'FragmentName');
                var series = getInputTargetAsAction(block, 'SeriesName');
                var value = getInputTargetAsAction(block, 'MeasurementValue');
                var unit = getInputTargetAsAction(block, 'MeasurementUnit');
                var toC8y;
                do {
                    toC8y = Blockly.RxEPL.variableDB_.getDistinctName('toCumulocityMeasurement', 'action');
                } while (Blockly.RxEPL.definitions_.customActionTypes[toC8y]);
                Blockly.RxEPL.definitions_.customActionTypes[toC8y] = 'action<any>';
                var measurementValue = 'MeasurementValue(\n' +
                    Blockly.RxEPL.prefixLines(value + "(value).valueToString(),\n" +
                        (unit + "(value).valueToString(),\n") +
                        'new dictionary<string, any>', Blockly.RxEPL.INDENT) +
                    '\n)\n';
                Blockly.RxEPL.definitions_.actions.push("action " + toC8y + "(any value) {\n" + Blockly.RxEPL.prefixLines('Measurement m := new Measurement;\n' +
                    '\n' +
                    'm.id := ' + (id ? id + "(value).valueToString();\n" : '"";\n') +
                    'm.type := ' + (type ? type + "(value).valueToString();\n" : '"";\n') +
                    'm.source := ' + (source ? source + "(value).valueToString();\n" : '"";\n') +
                    'm.time := ' + (timestamp ? "<float> " + timestamp + "(value)" : '<float> Lambda.function1("x => currentTime")(value)') + ';\n' +
                    'm.measurement := {\n' +
                    Blockly.RxEPL.prefixLines((fragment ? fragment + "(value).valueToString()" : '""') + ': {\n' + Blockly.RxEPL.prefixLines((series ? series + "(value).valueToString()" : '""') + ': ' + measurementValue, Blockly.RxEPL.INDENT)
                        + '}\n', Blockly.RxEPL.INDENT) +
                    '};\n' +
                    '\n' +
                    "send m to Measurement.CHANNEL;\n", Blockly.RxEPL.INDENT) + "}\n");
                var subscribe = ".subscribe(Subscriber.create().onNext(" + toC8y + "));\n";
                subscribe = Blockly.RxEPL.prefixLines(subscribe, Blockly.RxEPL.INDENT);
                if (source_observable) {
                    var subscription = 'ISubscription ' + Blockly.RxEPL.variableDB_.getDistinctName('s', 'Subscription');
                    return subscription + ' := ' + source_observable + '\n' + subscribe;
                }
                else {
                    return Blockly.RxEPL.prefixLines(subscribe, '//');
                }
            };
            class_18.prototype.c8y_from_measurement = function (block) {
                Blockly.RxEPL.definitions_.usings.push('com.apama.cumulocity.Measurement');
                return ["Observable.fromStream(from m in all Measurement() select <any> m)"];
            };
            return class_18;
        }(Generator));
    }
    exports_20("Cumulocty", Cumulocty);
    var rxepl_10;
    return {
        setters: [
            function (rxepl_10_1) {
                rxepl_10 = rxepl_10_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl/connectivity", ["generators/rxepl/connectivity/iak", "generators/rxepl/connectivity/cumulocity"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    function Connectivity(Generator) {
        return cumulocity_1.Cumulocty(iak_1.IAK(Generator));
    }
    exports_21("Connectivity", Connectivity);
    var iak_1, cumulocity_1;
    return {
        setters: [
            function (iak_1_1) {
                iak_1 = iak_1_1;
            },
            function (cumulocity_1_1) {
                cumulocity_1 = cumulocity_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("generators/rxepl", ["generators/rxepl/output", "generators/rxepl/source", "generators/rxepl/operators", "generators/rxepl/functions", "generators/rxepl/values", "generators/rxepl/customOperators", "generators/rxepl/variables", "generators/rxepl/prebuilt", "generators/rxepl/connectivity"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var output_1, source_1, operators_1, functions_1, values_1, customOperators_1, variables_1, prebuilt_1, connectivity_1, RX_EPL_PACKAGE_NAME, LAMBDA_PACKAGE_NAME, RxEplGenerator_Base, RxEplGenerator;
    return {
        setters: [
            function (output_1_1) {
                output_1 = output_1_1;
            },
            function (source_1_1) {
                source_1 = source_1_1;
            },
            function (operators_1_1) {
                operators_1 = operators_1_1;
            },
            function (functions_1_1) {
                functions_1 = functions_1_1;
            },
            function (values_1_1) {
                values_1 = values_1_1;
            },
            function (customOperators_1_1) {
                customOperators_1 = customOperators_1_1;
            },
            function (variables_1_1) {
                variables_1 = variables_1_1;
            },
            function (prebuilt_1_1) {
                prebuilt_1 = prebuilt_1_1;
            },
            function (connectivity_1_1) {
                connectivity_1 = connectivity_1_1;
            }
        ],
        execute: function () {
            exports_22("RX_EPL_PACKAGE_NAME", RX_EPL_PACKAGE_NAME = "com.industry.rx_epl");
            exports_22("LAMBDA_PACKAGE_NAME", LAMBDA_PACKAGE_NAME = "com.industry.lambdas");
            RxEplGenerator_Base = (function (_super) {
                __extends(RxEplGenerator_Base, _super);
                function RxEplGenerator_Base() {
                    var _this = _super.call(this, 'RxEPL') || this;
                    _this.INDENT = "\t";
                    _this.addReservedWords([
                        'package', 'using',
                        'monitor', 'persistent',
                        'action', 'return', 'returns', 'spawn',
                        'send', 'emit', 'enqueue', 'route', 'to',
                        'event', 'on', 'all', 'wait',
                        'context', 'listener', 'sequence', 'dictionary', 'float', 'decimal', 'integer', 'string', 'boolean', 'any', 'optional',
                        'static', 'constant', 'new',
                        'while', 'if', 'then', 'else', 'as', 'break', 'continue',
                        'true', 'false', 'not', 'and', 'or', 'xor',
                        'log', 'print', 'at',
                        'die', 'throw'
                    ].join(','));
                    return _this;
                }
                RxEplGenerator_Base.prototype.init = function (workspace) {
                    this.definitions_ = {
                        'usings': [],
                        'actions': [],
                        'customActionTypes': Object.create(null),
                        'events': [],
                        'subscriptions': []
                    };
                    if (!this.variableDB_) {
                        this.variableDB_ = new Blockly.Names(Blockly.RxEPL.RESERVED_WORDS_);
                    }
                    else {
                        this.variableDB_.reset();
                    }
                    Blockly.RxEPL.variableDB_.setVariableMap(workspace.getVariableMap());
                };
                RxEplGenerator_Base.prototype.finish = function (code) {
                    if (code) {
                        code = Blockly.RxEPL.prefixLines(code, Blockly.RxEPL.INDENT);
                    }
                    var actions = '';
                    this.definitions_.actions = this.definitions_.actions.filter(function (x, i, a) { return a.indexOf(x) === i; }).sort();
                    if (this.definitions_.actions.length > 0) {
                        actions = '\n' + this.definitions_.actions.join('\n');
                    }
                    this.definitions_.subscriptions = this.definitions_.subscriptions.filter(function (x, i, a) { return a.indexOf(x) === i; }).sort();
                    if (this.definitions_.subscriptions.length > 0) {
                        code = Blockly.RxEPL.prefixLines(this.definitions_.subscriptions.map(this.quote_).join(');\n'), Blockly.RxEPL.INDENT + 'monitor.subscribe(') + ');\n\n' + code;
                    }
                    code = 'monitor Main {\n' +
                        Blockly.RxEPL.prefixLines('action onload() {\n' + code + '}\n' + actions, Blockly.RxEPL.INDENT) +
                        '}\n';
                    this.definitions_.events = this.definitions_.events.filter(function (x, i, a) { return a.indexOf(x) === i; }).sort();
                    if (this.definitions_.events.length > 0) {
                        code = this.definitions_.events.join('\n') + '\n' + code;
                    }
                    this.definitions_.usings = this.definitions_.usings.filter(function (x, i, a) { return a.indexOf(x) === i; }).sort();
                    if (this.definitions_.usings.length > 0) {
                        code = Blockly.RxEPL.prefixLines(this.definitions_.usings.join(';\n'), 'using ') + ';\n\n' + code;
                    }
                    return code;
                };
                RxEplGenerator_Base.prototype.scrubNakedValue = function (line) {
                    return Blockly.RxEPL.prefixLines(line, '// ') + ';\n';
                };
                RxEplGenerator_Base.prototype.quote_ = function (string) {
                    string = string.replace(/\\/g, '\\\\')
                        .replace(/\n/g, '\\\n')
                        .replace(/"/g, '\\"');
                    return '"' + string + '"';
                };
                RxEplGenerator_Base.prototype.scrub_ = function (block, code) {
                    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
                    var nextCode = Blockly.RxEPL.blockToCode(nextBlock);
                    return code + nextCode;
                };
                RxEplGenerator_Base.prototype.addCustomAction_ = function (block, actionName, argCount, returnType) {
                    var type = Blockly.RxEPL.definitions_.customActionTypes[actionName];
                    var argTypes = typeof argCount == 'number' ?
                        Array(argCount).fill('any').join(',') :
                        'sequence<any>';
                    var args = typeof argCount == 'number' ?
                        Array(argCount).fill('any value').map(function (x, i) { return x + (i ? (i + 1) : ''); }).join(', ') :
                        'sequence<any> values';
                    var rtn = returnType ? ' returns ' + returnType : '';
                    if (!type) {
                        Blockly.RxEPL.definitions_.usings.push('com.apama.exceptions.Exception');
                        Blockly.RxEPL.definitions_.customActionTypes[actionName] = 'action<' + argTypes + '>' + rtn;
                        Blockly.RxEPL.definitions_.actions.push('action ' + actionName + '(' + args + ')' + rtn + ' {\n' +
                            Blockly.RxEPL.INDENT + '// TODO: Implement me!\n' +
                            Blockly.RxEPL.INDENT + 'throw Exception("Not yet implemented", "NotImplemented");\n' +
                            '}\n');
                        block.setWarningText(null);
                    }
                    else if (type != 'action<' + argTypes + '>' + rtn) {
                        block.setWarningText('Action "' + actionName + '" cannot be used here.\n  Already has type: "' + type + '".\n  Needs to be "' + 'action<' + argTypes + '>' + rtn + '"');
                    }
                };
                return RxEplGenerator_Base;
            }(Blockly.Generator));
            exports_22("RxEplGenerator_Base", RxEplGenerator_Base);
            exports_22("RxEplGenerator", RxEplGenerator = connectivity_1.Connectivity(prebuilt_1.Prebuilt(variables_1.Variables(customOperators_1.CustomOperators(values_1.Values(functions_1.Functions(operators_1.Operators(output_1.Output(source_1.Source(RxEplGenerator_Base))))))))));
        }
    };
});
System.register("flyouts/customOperators", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    function customOperatorFlyout(workspace) {
        var newOperatorName = Blockly.RxEPL.variableDB_.getDistinctName('CustomOperator', 'CustomOperator');
        var blockText = '<xml>' +
            ("<block type=\"custom_operator_definition\"><field name=\"OperatorName\" variabletype=\"CustomOperator\">" + newOperatorName + "</field></block>") +
            ("<block type=\"complex_custom_operator_definition\"><field name=\"OperatorName\" variabletype=\"CustomOperator\">" + newOperatorName + "</field><value name=\"Arg\"><block type=\"custom_operator_arg\"></block></value><value name=\"Return\"><shadow type=\"custom_operator_arg\"></shadow></value></block>") +
            Blockly.Procedures.allProcedures(workspace)[0]
                .map(function (_a) {
                var name = _a[0];
                return "<block type=\"custom_operator\"><mutation operator-name=\"" + name + "\"></mutation></block>";
            })
                .join() +
            '</xml>';
        return Blockly.Xml.textToDom(blockText).childNodes;
    }
    exports_23("customOperatorFlyout", customOperatorFlyout);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("flyouts/variables", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    function variablesFlyout(workspace) {
        var newObservableName = Blockly.RxEPL.variableDB_.getDistinctName('obs', 'Variable');
        var blockText = '<xml>' +
            ("<block type=\"set_var\"><field name=\"Variable\">" + newObservableName + "</field></block>") +
            Blockly.Variables.allUsedVarModels(workspace)
                .map(function (v) { return "<block type=\"get_var\"><field name=\"Variable\">" + v.name + "</field></block>"; })
                .join() +
            '</xml>';
        return Blockly.Xml.textToDom(blockText).childNodes;
    }
    exports_24("variablesFlyout", variablesFlyout);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("overwriteBuiltin", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    function overwriteBuiltin() {
        var Blockly = window.Blockly;
        if (window.navigator.pointerEnabled) {
            Blockly.bindEvent_.TOUCH_MAP = {
                mousedown: 'pointerdown',
                mousemove: 'pointermove',
                mouseup: 'pointerup'
            };
            document.body.style.touchAction = 'none';
        }
        Blockly.FlyoutButton.prototype.createDom = function () {
            var cssClass = this.isLabel_ ? 'blocklyFlyoutLabel' : 'blocklyFlyoutButton';
            if (this.cssClass_) {
                cssClass += ' ' + this.cssClass_;
            }
            this.svgGroup_ = Blockly.utils.createSvgElement('g', { 'class': cssClass }, this.workspace_.getCanvas());
            if (!this.isLabel_) {
                var shadow = Blockly.utils.createSvgElement('rect', {
                    'class': 'blocklyFlyoutButtonShadow',
                    'rx': 4, 'ry': 4, 'x': 1, 'y': 1
                }, this.svgGroup_);
            }
            var rect = Blockly.utils.createSvgElement('rect', {
                'class': this.isLabel_ ?
                    'blocklyFlyoutLabelBackground' : 'blocklyFlyoutButtonBackground',
                'rx': 4, 'ry': 4
            }, this.svgGroup_);
            var svgText = Blockly.utils.createSvgElement('text', {
                'class': this.isLabel_ ? 'blocklyFlyoutLabelText' : 'blocklyText',
                'x': 0,
                'y': 0,
                'text-anchor': 'middle'
            }, this.svgGroup_);
            if (this.isLabel_) {
                this.text_.split(/\\n/g).forEach(function (text, i) {
                    var tspan = Blockly.utils.createSvgElement('tspan', __assign({ 'x': 0, 'dy': i ? '1.2em' : '.6em', 'text-anchor': 'start' }, (i ? {} : { y: 5 })), svgText);
                    tspan.textContent = text;
                });
            }
            else {
                svgText.textContent = this.text_;
            }
            if (this.isLabel_) {
                this.width = Array.prototype.slice.call(svgText.childNodes)
                    .map(function (node) { return Blockly.Field.getCachedWidth(node); })
                    .reduce(function (maxW, width) { return Math.max(maxW, width); });
                this.height = 16 * this.text_.split(/\\n/g).length;
            }
            else {
                this.width = Blockly.Field.getCachedWidth(svgText);
                this.height = 20;
            }
            if (!this.isLabel_) {
                this.width += 2 * Blockly.FlyoutButton.MARGIN;
                shadow.setAttribute('width', this.width);
                shadow.setAttribute('height', this.height);
            }
            rect.setAttribute('width', this.width);
            rect.setAttribute('height', this.height);
            svgText.setAttribute('x', this.width / 2);
            svgText.setAttribute('y', this.height - Blockly.FlyoutButton.MARGIN);
            this.updateTransform_();
            this.mouseUpWrapper_ = Blockly.bindEventWithChecks_(this.svgGroup_, 'mouseup', this, this.onMouseUp_);
            return this.svgGroup_;
        };
        Blockly.Field.getCachedWidth = function (a) {
            var b = a.textContent + "\n" + a.className.baseVal, c;
            if (Blockly.Field.cacheWidths_ && (c = Blockly.Field.cacheWidths_[b]))
                return c;
            try {
                if (goog.userAgent.IE || goog.userAgent.EDGE) {
                    try {
                        c = a.getBBox().width;
                    }
                    catch (d) {
                        c = a.getComputedTextLength();
                    }
                }
                else {
                    c = a.getComputedTextLength();
                }
            }
            catch (d) {
                return 8 * a.textContent.length;
            }
            Blockly.Field.cacheWidths_ && (Blockly.Field.cacheWidths_[b] = c);
            return c;
        };
        Blockly.Xml.blockToDom = function (block, opt_noId) {
            var element = goog.dom.createDom(block.isShadow() ? 'shadow' : 'block');
            element.setAttribute('type', block.type);
            if (!opt_noId) {
                element.setAttribute('id', block.id);
            }
            if (block.mutationToDom) {
                var mutation = block.mutationToDom();
                if (mutation && (mutation.hasChildNodes() || mutation.hasAttributes())) {
                    element.appendChild(mutation);
                }
            }
            Blockly.Xml.allFieldsToDom_(block, element);
            var commentText = block.getCommentText();
            if (commentText) {
                var commentElement = goog.dom.createDom('comment', null, commentText);
                if (typeof block.comment == 'object') {
                    commentElement.setAttribute('pinned', block.comment.isVisible());
                    var hw = block.comment.getBubbleSize();
                    commentElement.setAttribute('h', hw.height);
                    commentElement.setAttribute('w', hw.width);
                    commentElement.setAttribute('dx', block.comment.bubble_ ? block.comment.bubble_.relativeLeft_ : 0);
                    commentElement.setAttribute('dy', block.comment.bubble_ ? block.comment.bubble_.relativeTop_ : 0);
                }
                element.appendChild(commentElement);
            }
            if (block.data) {
                var dataElement = goog.dom.createDom('data', null, block.data);
                element.appendChild(dataElement);
            }
            for (var i = 0, input; input = block.inputList[i]; i++) {
                var container;
                var empty = true;
                if (input.type == Blockly.DUMMY_INPUT) {
                    continue;
                }
                else {
                    var childBlock = input.connection.targetBlock();
                    if (input.type == Blockly.INPUT_VALUE) {
                        container = goog.dom.createDom('value');
                    }
                    else if (input.type == Blockly.NEXT_STATEMENT) {
                        container = goog.dom.createDom('statement');
                    }
                    var shadow = input.connection.getShadowDom();
                    if (shadow && (!childBlock || !childBlock.isShadow())) {
                        container.appendChild(Blockly.Xml.cloneShadow_(shadow));
                    }
                    if (childBlock) {
                        container.appendChild(Blockly.Xml.blockToDom(childBlock, opt_noId));
                        empty = false;
                    }
                }
                container.setAttribute('name', input.name);
                if (!empty) {
                    element.appendChild(container);
                }
            }
            if (block.inputsInlineDefault != block.inputsInline) {
                element.setAttribute('inline', block.inputsInline);
            }
            if (block.isCollapsed()) {
                element.setAttribute('collapsed', true);
            }
            if (block.disabled) {
                element.setAttribute('disabled', true);
            }
            if (!block.isDeletable() && !block.isShadow()) {
                element.setAttribute('deletable', false);
            }
            if (!block.isMovable() && !block.isShadow()) {
                element.setAttribute('movable', false);
            }
            if (!block.isEditable()) {
                element.setAttribute('editable', false);
            }
            var nextBlock = block.getNextBlock();
            if (nextBlock) {
                var container = goog.dom.createDom('next', null, Blockly.Xml.blockToDom(nextBlock, opt_noId));
                element.appendChild(container);
            }
            var shadow = block.nextConnection && block.nextConnection.getShadowDom();
            if (shadow && (!nextBlock || !nextBlock.isShadow())) {
                container.appendChild(Blockly.Xml.cloneShadow_(shadow));
            }
            return element;
        };
        Blockly.Xml.domToBlockHeadless_ = function (xmlBlock, workspace) {
            var block = null;
            var prototypeName = xmlBlock.getAttribute('type');
            goog.asserts.assert(prototypeName, 'Block type unspecified: %s', xmlBlock.outerHTML);
            var id = xmlBlock.getAttribute('id');
            block = workspace.newBlock(prototypeName, id);
            var blockChild = null;
            for (var i = 0, xmlChild; xmlChild = xmlBlock.childNodes[i]; i++) {
                if (xmlChild.nodeType == 3) {
                    continue;
                }
                var input;
                var childBlockElement = null;
                var childShadowElement = null;
                for (var j = 0, grandchild; grandchild = xmlChild.childNodes[j]; j++) {
                    if (grandchild.nodeType == 1) {
                        if (grandchild.nodeName.toLowerCase() == 'block') {
                            childBlockElement = (grandchild);
                        }
                        else if (grandchild.nodeName.toLowerCase() == 'shadow') {
                            childShadowElement = (grandchild);
                        }
                    }
                }
                if (!childBlockElement && childShadowElement) {
                    childBlockElement = childShadowElement;
                }
                var name = xmlChild.getAttribute('name');
                switch (xmlChild.nodeName.toLowerCase()) {
                    case 'mutation':
                        if (block.domToMutation) {
                            block.domToMutation(xmlChild);
                            if (block.initSvg) {
                                block.initSvg();
                            }
                        }
                        break;
                    case 'comment':
                        block.setCommentText(xmlChild.textContent);
                        var visible = xmlChild.getAttribute('pinned');
                        if (visible && !block.isInFlyout) {
                            setTimeout(function () {
                                if (block.comment && block.comment.setVisible) {
                                    block.comment.setVisible(visible == 'true');
                                }
                            }, 1);
                        }
                        var bubbleW = parseInt(xmlChild.getAttribute('w'), 10);
                        var bubbleH = parseInt(xmlChild.getAttribute('h'), 10);
                        if (!isNaN(bubbleW) && !isNaN(bubbleH) &&
                            block.comment && block.comment.setVisible) {
                            block.comment.setBubbleSize(bubbleW, bubbleH);
                        }
                        var bubbleDX = parseInt(xmlChild.getAttribute('dx'), 10);
                        var bubbleDY = parseInt(xmlChild.getAttribute('dy'), 10);
                        if (!isNaN(bubbleDX) && !isNaN(bubbleH) && block.comment && block.comment.setVisible) {
                            block.comment.dx = bubbleDX;
                            block.comment.dy = bubbleDY;
                        }
                        break;
                    case 'data':
                        block.data = xmlChild.textContent;
                        break;
                    case 'title':
                    case 'field':
                        Blockly.Xml.domToField_(block, name, xmlChild);
                        break;
                    case 'value':
                    case 'statement':
                        input = block.getInput(name);
                        if (!input) {
                            console.warn('Ignoring non-existent input ' + name + ' in block ' +
                                prototypeName);
                            break;
                        }
                        if (childShadowElement) {
                            input.connection.setShadowDom(childShadowElement);
                        }
                        if (childBlockElement) {
                            blockChild = Blockly.Xml.domToBlockHeadless_(childBlockElement, workspace);
                            if (blockChild.outputConnection) {
                                input.connection.connect(blockChild.outputConnection);
                            }
                            else if (blockChild.previousConnection) {
                                input.connection.connect(blockChild.previousConnection);
                            }
                            else {
                                goog.asserts.fail('Child block does not have output or previous statement.');
                            }
                        }
                        break;
                    case 'next':
                        if (childShadowElement && block.nextConnection) {
                            block.nextConnection.setShadowDom(childShadowElement);
                        }
                        if (childBlockElement) {
                            goog.asserts.assert(block.nextConnection, 'Next statement does not exist.');
                            goog.asserts.assert(!block.nextConnection.isConnected(), 'Next statement is already connected.');
                            blockChild = Blockly.Xml.domToBlockHeadless_(childBlockElement, workspace);
                            goog.asserts.assert(blockChild.previousConnection, 'Next block does not have previous statement.');
                            block.nextConnection.connect(blockChild.previousConnection);
                        }
                        break;
                    default:
                        console.warn('Ignoring unknown tag: ' + xmlChild.nodeName);
                }
            }
            var inline = xmlBlock.getAttribute('inline');
            if (inline) {
                block.setInputsInline(inline == 'true');
            }
            var disabled = xmlBlock.getAttribute('disabled');
            if (disabled) {
                block.setDisabled(disabled == 'true');
            }
            var deletable = xmlBlock.getAttribute('deletable');
            if (deletable) {
                block.setDeletable(deletable == 'true');
            }
            var movable = xmlBlock.getAttribute('movable');
            if (movable) {
                block.setMovable(movable == 'true');
            }
            var editable = xmlBlock.getAttribute('editable');
            if (editable) {
                block.setEditable(editable == 'true');
            }
            var collapsed = xmlBlock.getAttribute('collapsed');
            if (collapsed) {
                block.setCollapsed(collapsed == 'true');
            }
            if (xmlBlock.nodeName.toLowerCase() == 'shadow') {
                var children = block.getChildren();
                for (var i = 0, child; child = children[i]; i++) {
                    goog.asserts.assert(child.isShadow(), 'Shadow block not allowed non-shadow child.');
                }
                goog.asserts.assert(block.getVarModels().length == 0, 'Shadow blocks cannot have variable references.');
                block.setShadow(true);
            }
            return block;
        };
        var oldLayoutBubble = Blockly.Bubble.prototype.layoutBubble_;
        Blockly.Bubble.prototype.layoutBubble_ = function () {
            if (this.dx && this.dy) {
                this.relativeLeft_ = this.dx;
                this.relativeTop_ = this.dy;
                return;
            }
            oldLayoutBubble.call(this);
        };
        Blockly.Comment.prototype.setBubbleSize = function (width, height) {
            if (this.textarea_) {
                this.bubble_.setBubbleSize(width, height, this.dx, this.dy);
            }
            else {
                this.width_ = width;
                this.height_ = height;
            }
        };
        var oldBubbleSetBubbleSize = Blockly.Bubble.prototype.setBubbleSize;
        Blockly.Bubble.prototype.setBubbleSize = function (width, height, dx, dy) {
            if (dx && dy) {
                this.dx = dx;
                this.dy = dy;
            }
            oldBubbleSetBubbleSize.call(this, width, height);
        };
    }
    exports_25("overwriteBuiltin", overwriteBuiltin);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("index", ["generators/rxepl", "clipboard-polyfill", "flyouts/customOperators", "flyouts/variables", "overwriteBuiltin"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    function resizeElement(sourceElement, targetElement) {
        var element = sourceElement;
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        targetElement.style.left = x + 'px';
        targetElement.style.top = y + 'px';
        targetElement.style.width = sourceElement.offsetWidth + 'px';
        targetElement.style.height = sourceElement.offsetHeight + 'px';
    }
    function resize() {
        resizeElement(blocklyArea, blocklyDiv);
        resizeElement(codeArea, codeDiv);
        Blockly.svgResize(workspace);
    }
    function removeNestedHighlighting(e) {
        Array.prototype.slice.call(e.children)
            .filter(function (e) { return ["br"].indexOf(e.tagName) == -1; })
            .forEach(function (child) {
            removeNestedHighlighting(child);
            child.outerHTML = child.innerHTML;
        });
    }
    var rxepl_11, clipboard_polyfill_1, customOperators_2, variables_2, overwriteBuiltin_1, url, blocklyArea, blocklyDiv, codeArea, codeDiv, codeOutput, copyCode, newWorkspace, saveWorkspace, openWorkspace, exportWorkspace, sampleRepeat, sampleAvg, workspace, workspaceSvg;
    return {
        setters: [
            function (rxepl_11_1) {
                rxepl_11 = rxepl_11_1;
            },
            function (clipboard_polyfill_1_1) {
                clipboard_polyfill_1 = clipboard_polyfill_1_1;
            },
            function (customOperators_2_1) {
                customOperators_2 = customOperators_2_1;
            },
            function (variables_2_1) {
                variables_2 = variables_2_1;
            },
            function (overwriteBuiltin_1_1) {
                overwriteBuiltin_1 = overwriteBuiltin_1_1;
            }
        ],
        execute: function () {
            overwriteBuiltin_1.overwriteBuiltin();
            OverlayScrollbars(document.getElementsByClassName('scrollArea'), {});
            Blockly.RxEPL = new rxepl_11.RxEplGenerator();
            url = window.location.href.split('#')[0];
            blocklyArea = document.getElementById('blocklyArea');
            blocklyDiv = document.getElementById('blocklyDiv');
            codeArea = document.getElementById('codeArea');
            codeDiv = document.getElementById('codeDiv');
            codeOutput = document.getElementById('codeOutput');
            copyCode = Array.prototype.slice.call(document.getElementsByClassName('copy-code'));
            newWorkspace = Array.prototype.slice.call(document.getElementsByClassName('new-workspace'));
            saveWorkspace = Array.prototype.slice.call(document.getElementsByClassName('save-workspace'));
            openWorkspace = Array.prototype.slice.call(document.getElementsByClassName('open-workspace'));
            exportWorkspace = Array.prototype.slice.call(document.getElementsByClassName('export-workspace'));
            sampleRepeat = Array.prototype.slice.call(document.getElementsByClassName('sample-repeat'));
            sampleAvg = Array.prototype.slice.call(document.getElementsByClassName('sample-avg'));
            workspace = Blockly.inject(blocklyDiv, {
                toolbox: document.getElementById('toolbox'),
                zoom: { controls: true, wheel: true }
            });
            workspaceSvg = workspace;
            if (window.localStorage && window.localStorage[url]) {
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(window.localStorage[url]), workspace);
            }
            else {
                Blockly.Xml.domToWorkspace(document.getElementById('workspace'), workspace);
            }
            workspaceSvg.registerToolboxCategoryCallback('CUSTOM_OPERATORS', customOperators_2.customOperatorFlyout);
            workspaceSvg.registerToolboxCategoryCallback('USER_VARS', variables_2.variablesFlyout);
            window.addEventListener('resize', resize, false);
            resize();
            workspace.scrollCenter();
            workspace.addChangeListener(function (event) {
                if (window.localStorage) {
                    window.localStorage.setItem(url, Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)));
                }
                var usedVars = Blockly.Variables.allUsedVarModels(workspace).map(function (v) { return v.getId(); });
                workspace.getVariablesOfType('Observable')
                    .map(function (v) { return v.getId(); })
                    .filter(function (v) { return usedVars.indexOf(v) == -1; })
                    .forEach(function (v) { return workspace.deleteVariableById(v); });
                var block = workspace.getBlockById(event.blockId);
                if (block && block.previousConnection && block.previousConnection.check_[0] == 'Operator') {
                    if (!event.newParentId && !block.getSurroundParent()) {
                        var nextBlock = block;
                        do {
                            nextBlock.setDisabled(true);
                        } while (nextBlock = nextBlock.getNextBlock());
                    }
                    else {
                        var nextBlock = block;
                        do {
                            nextBlock.setDisabled(false);
                        } while (nextBlock = nextBlock.getNextBlock());
                    }
                }
                codeOutput.innerText = Blockly.RxEPL.workspaceToCode(workspace);
                codeOutput.innerHTML = codeOutput.innerHTML
                    .replace(/<br>/g, '\n')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/(\")(\\\"|.)*?\"/g, function (str) { return "<span class=\"string\">" + str + "</span>"; });
                ['monitor', 'action', 'using', 'log', 'at', 'return', 'returns', 'event', 'new', 'send', 'to'].forEach(function (keyWord) {
                    codeOutput.innerHTML = codeOutput.innerHTML
                        .replace(/<br>/g, '\n')
                        .replace(/&nbsp;/g, ' ')
                        .replace(new RegExp("(^|\\s)" + keyWord + "($|\\s)", 'gm'), function (str) { return "<span class=\"keyword\">" + str + "</span>"; });
                });
                codeOutput.innerHTML = codeOutput.innerHTML
                    .replace(/<br>/g, '\n')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/\/\/.*$/gm, function (str) { return "<span class=\"comment\">" + str + "</span>"; });
                Array.prototype.slice.call(codeOutput.children).forEach(removeNestedHighlighting);
                resize();
            });
            copyCode.forEach(function (e) { return e.addEventListener('click', function () {
                var _this = this;
                clipboard.writeText(Blockly.RxEPL.workspaceToCode(workspace))
                    .then(function () {
                    _this.classList.add('done');
                    return new Promise(function (resolve) { return setTimeout(resolve, 100); });
                })
                    .then(function () {
                    _this.classList.remove('done');
                });
            }, false); });
            newWorkspace.forEach(function (e) { return e.addEventListener('click', function () {
                if (confirm('You will lose any unsaved changes, are you sure you would like to create a new workspace?')) {
                    workspace.clear();
                    Blockly.Events.recordUndo = false;
                    Blockly.Xml.domToWorkspace(document.getElementById('workspace'), workspace);
                    Blockly.Events.recordUndo = true;
                    workspace.scrollCenter();
                }
            }, false); });
            saveWorkspace.forEach(function (e) { return e.addEventListener('click', function () {
                var fileName = prompt("Enter a filename", "RxEPL");
                if (fileName) {
                    fileName = fileName.trim();
                    if (fileName.indexOf(".") == -1) {
                        fileName = fileName + ".rxblocks";
                    }
                    var code = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace));
                    var blob = new Blob([code], { type: "text/plain;charset=utf-8" });
                    saveAs(blob, fileName);
                }
            }, false); });
            exportWorkspace.forEach(function (e) { return e.addEventListener('click', function () {
                var fileName = prompt("Enter a filename", "RxEPL");
                if (fileName) {
                    fileName = fileName.trim();
                    if (fileName.indexOf(".") == -1) {
                        fileName = fileName + ".mon";
                    }
                    var code = Blockly.RxEPL.workspaceToCode(workspace);
                    if (navigator.platform == "Win32") {
                        code = code.replace(/\n/g, '\r\n');
                    }
                    var blob = new Blob([code], { type: "text/plain;charset=utf-8" });
                    saveAs(blob, fileName);
                }
            }, false); });
            document.getElementById('load-file')
                .addEventListener('change', function () {
                if (this.files.length) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        workspace.clear();
                        Blockly.Events.recordUndo = false;
                        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(this.result), workspace);
                        Blockly.Events.recordUndo = true;
                        workspace.scrollCenter();
                    };
                    reader.readAsText(this.files[0]);
                }
            }, false);
            openWorkspace.forEach(function (e) { return e.addEventListener('click', function () {
                document.getElementById('load-file').click();
            }, false); });
            sampleRepeat.forEach(function (e) { return e.addEventListener('click', function () {
                if (confirm('You will lose any unsaved changes, are you sure you would like to create a new workspace?')) {
                    workspace.clear();
                    Blockly.Events.recordUndo = false;
                    Blockly.Xml.domToWorkspace(document.getElementById('sample-repeat'), workspace);
                    Blockly.Events.recordUndo = true;
                    workspace.scrollCenter();
                }
            }, false); });
            sampleAvg.forEach(function (e) { return e.addEventListener('click', function () {
                if (confirm('You will lose any unsaved changes, are you sure you would like to create a new workspace?')) {
                    workspace.clear();
                    Blockly.Events.recordUndo = false;
                    Blockly.Xml.domToWorkspace(document.getElementById('sample-avg'), workspace);
                    Blockly.Events.recordUndo = true;
                    workspace.scrollCenter();
                }
            }, false); });
            window.copySelected = function () {
                clipboard.writeText(Blockly.Xml.domToPrettyText(Blockly.Xml.blockToDom(Blockly.selected, true)));
            };
        }
    };
});
Blockly.defineBlocksWithJsonArray([
    {
        "type": "c8y_from_measurement",
        "message0": "From Cumulocity Measurement",
        "output": "Observable",
        "colour": 150,
        "tooltip": "Receive Measurement(...) events from the Cumulocity Plugin.",
        "helpUrl": ""
    },
    {
        "type": "c8y_to_measurement",
        "message0": "To Cumulocity Measurement %1 ID %2 Type %3 Source %4 Timestamp %5 Fragment Name %6 Series Name %7 Measurement Value %8 Measurement Unit %9",
        "args0": [
            {
                "type": "input_value",
                "name": "Observable",
                "check": "Observable",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "Id",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "Type",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "Source",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "Timestamp",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "FragmentName",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "SeriesName",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "MeasurementValue",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "MeasurementUnit",
                "check": [
                    "lambda",
                    "action"
                ],
                "align": "RIGHT"
            }
        ],
        "previousStatement": "Observable",
        "nextStatement": "Observable",
        "colour": 150,
        "tooltip": "Sends every value as a Measurement to Cumulocity via the Apama Cumulocity Connectivity Plugin",
        "helpUrl": ""
    }
]);
//# sourceMappingURL=index.js.map
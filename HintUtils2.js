/**
 * HintUtils2 was created as a place to put utilities that do not require third party dependencies so
 * they can be used by tern-worker.js and other JS files.
 * This is done because of the require config in tern-worker.js needed to load tern libraries. Libraries
 * that include, say "acorn", will fail to load.
 */
define(function (require, exports, module) {
    "use strict";

    /**
     * Format the given parameter array. Handles separators between
     * parameters, syntax for optional parameters, and the order of the
     * parameter type and parameter name.
     *
     * @param {!Array.<{name: string, type: string, isOptional: boolean}>} params -
     * array of parameter descriptors
     * @param {function(string)=} appendSeparators - callback function to append separators.
     * The separator is passed to the callback.
     * @param {function(string, number)=} appendParameter - callback function to append parameter.
     * The formatted parameter type and name is passed to the callback along with the
     * current index of the parameter.
     * @param {boolean=} typesOnly - only show parameter types. The
     * default behavior is to include both parameter names and types.
     * @return {string} - formatted parameter hint
     */
    function formatParameterHint(params, appendSeparators, appendParameter, typesOnly) {
        var result = "",
            pendingOptional = false;

        params.forEach(function (value, i) {
            var param = value.type,
                separators = "";

            if (value.isOptional) {
                // if an optional param is following by an optional parameter, then
                // terminate the bracket. Otherwise enclose a required parameter
                // in the same bracket.
                if (pendingOptional) {
                    separators += "]";
                }

                pendingOptional = true;
            }

            if (i > 0) {
                separators += ", ";
            }

            if (value.isOptional) {
                separators += "[";
            }

            if (appendSeparators) {
                appendSeparators(separators);
            }

            result += separators;

            if (!typesOnly) {
                param += " " + value.name;
            }

            if (appendParameter) {
                appendParameter(param, i);
            }

            result += param;

        });

        if (pendingOptional) {
            if (appendSeparators) {
                appendSeparators("]");
            }

            result += "]";
        }

        return result;
    }

    exports.formatParameterHint = formatParameterHint;
});

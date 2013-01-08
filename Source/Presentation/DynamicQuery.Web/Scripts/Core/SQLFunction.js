var DQ = DQ || {};

DQ.Sql = function () {
    var sqlFunctions = [],
        init = function () {
            sqlFunctions.push({
                Name: 'ADD',
                Description: 'Beszúr',
                ReplaceText: '{0}',
                WorkWithSelection: false
            });
            sqlFunctions.push({
                Name: 'REMOVE',
                Description: 'Töröl',
                ReplaceText: '{0}',
                WorkWithSelection: true
            });
            sqlFunctions.push({
                Name: '+',
                Description: '+ (Összeadás)',
                ReplaceText: '+ {0}',
                WorkWithSelection: false
            });
            sqlFunctions.push({
                Name: '*',
                Description: '* (Szorzás)',
                ReplaceText: '* {0}',
                WorkWithSelection: false
            });
            sqlFunctions.push({
                Name: '-',
                Description: '- (Kivonás)',
                ReplaceText: '- {0}',
                WorkWithSelection: false
            });
            sqlFunctions.push({
                Name: '/',
                Description: '/ (Osztás)',
                ReplaceText: '/ {0}',
                WorkWithSelection: false
            });
            sqlFunctions.push({
                Name: 'COUNT',
                Description: 'COUNT (Megszámol)',
                ReplaceText: 'COUNT({0})',
                WorkWithSelection: true
            });
            sqlFunctions.push({
                Name: 'SUM',
                Description: 'SUM (Összesen)',
                ReplaceText: 'SUM({0})',
                WorkWithSelection: true
            });
            sqlFunctions.push({
                Name: 'AVG',
                Description: 'AVG (Átlag)',
                ReplaceText: 'AVG({0})',
                WorkWithSelection: true
            });
        },
        getSqlFunction = function (value) {
            for (var i = 0; i < sqlFunctions.length; i++) {
                if (sqlFunctions[i].Name == value) {
                    return sqlFunctions[i];
                }
            }
            return null;
        },
        getSqlFunctions = function () {
            return sqlFunctions;
        };
    return {
        Init: init,
        GetSQLFunctions: getSqlFunctions,
        GetSQLFunction: getSqlFunction
    };
};
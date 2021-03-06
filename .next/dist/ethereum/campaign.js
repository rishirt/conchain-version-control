'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Doc = require('./build/Doc.json');

var _Doc2 = _interopRequireDefault(_Doc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (address) {
  return new _web2.default.eth.Contract(JSON.parse(_Doc2.default.interface), address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWRkcmVzcyIsImV0aCIsIkNvbnRyYWN0IiwiSlNPTiIsInBhcnNlIiwiaW50ZXJmYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7a0JBRWdCLFVBQVVBLE9BQVYsRUFBbUI7QUFDakMsU0FBTyxJQUFJLGNBQUtDLEdBQUwsQ0FBU0MsUUFBYixDQUFzQkMsS0FBS0MsS0FBTCxDQUFXLGNBQUlDLFNBQWYsQ0FBdEIsRUFBaURMLE9BQWpELENBQVA7QUFDRCxDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2ViMyBmcm9tICcuL3dlYjMnO1xuaW1wb3J0IERvYyBmcm9tICcuL2J1aWxkL0RvYy5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIChhZGRyZXNzKSB7XG4gIHJldHVybiBuZXcgd2ViMy5ldGguQ29udHJhY3QoSlNPTi5wYXJzZShEb2MuaW50ZXJmYWNlKSwgYWRkcmVzcyk7XG59KTsiXX0=
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiYWRkcmVzcyIsImV0aCIsIkNvbnRyYWN0IiwiSlNPTiIsInBhcnNlIiwiaW50ZXJmYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7a0JBRWdCLFVBQVVBLE9BQVYsRUFBbUI7QUFDakMsU0FBTyxJQUFJLGNBQUtDLEdBQUwsQ0FBU0MsUUFBYixDQUFzQkMsS0FBS0MsS0FBTCxDQUFXLGNBQUlDLFNBQWYsQ0FBdEIsRUFBaURMLE9BQWpELENBQVA7QUFDRCxDIiwiZmlsZSI6InVua25vd24ifQ==
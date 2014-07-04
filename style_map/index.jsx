/*
  all[Paragraph|Character|Object]Stylesなどを渡して、hashのarrayを返す
  
  ## arguments
  * all_styles: <Array of XxxxxStyles> スタイルの配列
  * opts:
      sepa: <String> スタイルグループを連結するセパレータ (デフォルト ::)

  ## properties
  map: <Array> name, parent, obj のハッシュの配列
  list: <Array> 表示用に parentとnameをsepaで連結した配列

*/
StyleMap = this.StyleMap = function (all_sytles, opts) {
  var opts = opts || {};
  
  this.map = [];
  this.list;
  this.sepa = opts['sepa'] == undefined ? "::" : opts['sepa'];
  
  var unshift_parent = function (style, mem) {
    if (style.parent.constructor.name === 'Document') {
      return mem
    }
    else {
      mem.unshift(style.parent.name);
      return arguments.callee(style.parent, mem);
    }
  }

  for (var i=0, len=all_sytles.length; i < len ; i++) {
    var style = all_sytles[i];
    this.map.push({});
    var _ary = this.map[this.map.length-1];
    _ary['obj'] = style;
    _ary['name'] = style.name;
    _ary['parent'] = unshift_parent(style, []);
  };
  
  var display_list = function (map, separator) {
    var ret = [];
    for (var i=0, len=map.length; i < len ; i++) {
      var _map = map[i];
      ret.push(_map['parent'].concat(_map['name']).join(separator));
    };
    return ret
  }
  
  this.list = display_list(this.map, this.sepa);
}
#include "./index.jsx"
var doc = app.documents[0];
var aps = new StyleMap(doc.allParagraphStyles);
var cps = new StyleMap(doc.allCharacterStyles);

var u;
var w = new Window('dialog', u, u);
w.orientation = 'column';
w.margins = 5;
w.spacing = 5;
w.alignChildren = ['fill', 'fill'];

w.cstyle_ddl = w.add('dropdownlist', u, cps.list);
w.pstyle_ddl = w.add('dropdownlist', u, aps.list);

w.cstyle_ddl.title = "Char Style!!";
w.pstyle_ddl.title = "Para Style!!";

w.cstyle_ddl.selection = 0;
w.pstyle_ddl.selection = 0;

w.pstyle_ddl.onChange = function () {
  alert(aps.map[w.pstyle_ddl.selection.index].toSource());
}

w.show();

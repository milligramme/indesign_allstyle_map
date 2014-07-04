#include "../style_map/index.jsx"

var doc = app.documents.add(false);
var p_style_grp = doc.paragraphStyleGroups.add({name:"XXX"});
p_style_grp.paragraphStyles.add({name:"YYY"});


var aps = new StyleMap(doc.allParagraphStyles);
var acs = new StyleMap(doc.allCharacterStyles,{sepa:"//"});

var t1, t2, t3, t4, t5, t6;
t1 = (aps.map[0]['name'] == "[段落スタイルなし]");
t2 = (aps.map[aps.map.length-1]['name'] == "YYY");
t3 = (aps.sepa == "::");
t4 = (aps.list[aps.list.length-1] == "XXX::YYY");
t5 = (aps.list.length === aps.map.length);
t6 = (acs.sepa == "//");



$.writeln(t1 && t2 && t3 && t4 && t5 && t6);

doc.close(SaveOptions.NO);
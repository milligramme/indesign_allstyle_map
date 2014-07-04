# StyleMap.jsx

ScriptUI から InDesign のスタイルグループフォルダで管理された多段スタイルを扱いやすくする




{name, parent, obj} のハッシュ

    [({obj:resolve("/document[@id=2]//paragraph-style[@id=108]"), name:"[段落スタイルなし]", parent:[]}), ({obj:resolve("/document[@id=2]//paragraph-style[@id=111]"), name:"[基本段落]", parent:[]}), ({obj:resolve("/document[@id=2]//paragraph-style[@id=114]"), name:"スタイルA", parent:[]}), ({obj:resolve("/document[@id=2]//paragraph-style[@id=236]"), name:"スタイルB", parent:[]}), ({obj:resolve("/document[@id=2]//paragraph-style[@id=229]"), name:"スタイルC", parent:["スタイルグループZ"]}), ({obj:resolve("/document[@id=2]//paragraph-style[@id=237]"), name:"スタイルC", parent:["スタイルグループY"]})]

と表示用のスタイルグループ+名前の配列(everyItem().nameのような) 

    ["[段落スタイルなし]", "[基本段落]", "スタイルA", "スタイルB", "スタイルグループZ::スタイルC", "スタイルグループY::スタイルC"]

を作る

# problem

~~~javascript

// - [基本段落]
// - スタイルA
// - スタイルB
// - スタイルグループZ/スタイルC
// - スタイルグループY/スタイルC

var doc = app.documents[0];

var ev = doc.paragraphStyles.everyItem();

// documentからみて第一階層のみしか扱えない、スタイルグループ内のスタイルは無視される
$.writeln(ev.constructor.name);// => (ParagraphStyle)
$.writeln(ev.name); // [段落スタイルなし],[基本段落],スタイルA,スタイルB (Array)
$.writeln(ev.parent); // [object Document],[object Document],[object Document],[object Document]


var al = doc.allParagraphStyles;

// everyItem()はつかえない
$.writeln(al.constructor.name);// => (Array)
var al_list_name = [];
var al_list_parent = [];
for (var i=0, len=al.length; i < len ; i++) {
  al_list_name.push(al[i].name);
  al_list_parent.push(al[i].parent);
};

// グループ名がちがったら同じスタイル名も使えるので nameだけだとUI側から区別がつかなくなる
$.writeln(al_list_name); // [段落スタイルなし],[基本段落],スタイルA,スタイルB,スタイルC,スタイルC (Array)
$.writeln(al_list_parent); // [object Document],[object Document],[object Document],[object Document],[object ParagraphStyleGroup],[object ParagraphStyleGroup]


// スタイル名での呼び出し
doc.paragraphStyles.item("スタイルB"); // => スタイルB
doc.paragraphStyles.item("スタイルC"); // エラー

// スタイルグループも必要で冗長
doc.paragraphStyleGroup.item("スタイルグループZ").paragraphStyles.item("スタイルC"); // => スタイルC

// 多段になるとさらに
doc.paragraphStyleGroup.item("スタイルグループZ").paragraphStyleGroup.item("スタイルグループZ").paragraphStyles.item("スタイルC"); // => スタイルC

// allParagraphStyleではitemで呼び出しできない
$.writeln('item' in doc.allParagraphStyles); // false

~~~

# usage

see `example.jsx`




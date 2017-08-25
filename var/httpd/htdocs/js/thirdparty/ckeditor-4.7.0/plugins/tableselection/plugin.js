﻿/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){function B(a,b){var c=a.getAscendant("table"),d=b.getAscendant("table"),k=CKEDITOR.tools.buildTableMap(c),f=a.getAscendant("tr",!0).$.rowIndex,e=b.getAscendant("tr",!0).$.rowIndex,p=[],r={},n,l;c.contains(d)&&(b=b.getAscendant({td:1,th:1}),e=b.getAscendant("tr",!0).$.rowIndex);f>e&&(c=f,f=e,e=c,c=a,a=b,b=c);for(c=0;c<k[f].length;c++)if(a.$===k[f][c]){n=c;break}for(c=0;c<k[e].length;c++)if(b.$===k[e][c]){l=c;break}n>l&&(c=n,n=l,l=c);for(c=f;c<=e;c++)for(f=n;f<=l;f++)d=new CKEDITOR.dom.element(k[c][f]),
d.$&&!d.getCustomData("selected_cell")&&(p.push(d),CKEDITOR.dom.element.setMarker(r,d,"selected_cell",!0));CKEDITOR.dom.element.clearAllMarkers(r);return p}function D(a){a=a.data.$;return CKEDITOR.env.ie&&9>CKEDITOR.env.version?1===a.button:0===a.button}function J(a){return(a=a.editable().findOne(".cke_table-faked-selection"))&&a.getAscendant("table")}function C(a,b){var c=a.editable().find(".cke_table-faked-selection"),d;a.fire("lockSnapshot");a.editable().removeClass("cke_table-faked-selection-editor");
for(d=0;d<c.count();d++)c.getItem(d).removeClass("cke_table-faked-selection");0<c.count()&&c.getItem(0).getAscendant("table").removeClass("cke_table-faked-selection-table");a.fire("unlockSnapshot");b&&(h={active:!1},a.getSelection().isInTable()&&a.getSelection().reset())}function x(a,b){var c=[],d,k;for(k=0;k<b.length;k++)d=a.createRange(),d.setStartBefore(b[k]),d.setEndAfter(b[k]),c.push(d);a.getSelection().selectRanges(c)}function K(a){var b=a.editable().find(".cke_table-faked-selection");1>b.count()||
(b=B(b.getItem(0),b.getItem(b.count()-1)),x(a,b))}function L(a,b,c){var d=t(a.getSelection(!0));b=b.is("table")?null:b;var k;(k=h.active&&!h.first)&&!(k=b)&&(k=a.getSelection().getRanges(),k=1<d.length||k[0]&&!k[0].collapsed?!0:!1);if(k)h.first=b||d[0],h.dirty=b?!1:1!==d.length;else if(h.active&&b){d=B(h.first,b);if(!h.dirty&&1===d.length)return C(a,"mouseup"===c.name);h.dirty=!0;h.last=b;x(a,d)}}function M(a){var b=(a=a.editor||a.sender.editor)&&a.getSelection(),c=b&&b.getRanges()||[],d;if(b&&(C(a),
b.isInTable()&&b.isFake)){1===c.length&&c[0]._getTableElement()&&c[0]._getTableElement().is("table")&&(d=c[0]._getTableElement());d=t(b,d);a.fire("lockSnapshot");for(b=0;b<d.length;b++)d[b].addClass("cke_table-faked-selection");0<d.length&&(a.editable().addClass("cke_table-faked-selection-editor"),d[0].getAscendant("table").addClass("cke_table-faked-selection-table"));a.fire("unlockSnapshot")}}function y(a){function b(a,b){return a&&b?a.equals(b)||a.contains(b)||b.contains(a)||a.getCommonAncestor(b).is(r):
!1}function c(a){return!a.getAscendant("table",!0)&&a.getDocument().equals(d.document)}var d=a.editor||a.listenerData.editor,k=d.getSelection(1),f=J(d),e=a.data.getTarget(),p=e&&e.getAscendant({td:1,th:1},!0),e=e&&e.getAscendant("table",!0),r={table:1,thead:1,tbody:1,tfoot:1,tr:1,td:1,th:1};(function(a,d,f,e){return"mousedown"===a.name&&(D(a)||!e)||"mouseup"===a.name&&!c(a.data.getTarget())&&!b(f,e)?!0:!1})(a,k,f,e)&&C(d,!0);!h.active&&"mousedown"===a.name&&D(a)&&e&&(h={active:!0},CKEDITOR.document.on("mouseup",
y,null,{editor:d}));(p||e)&&L(d,p||e,a);"mouseup"===a.name&&(D(a)&&(c(a.data.getTarget())||b(f,e))&&K(d),h={active:!1},CKEDITOR.document.removeListener("mouseup",y))}function N(a){var b=a.data.getTarget().getAscendant({td:1,th:1},!0);b&&!b.hasClass("cke_table-faked-selection")&&(a.cancel(),a.data.preventDefault())}function O(a,b){function c(a){a.cancel()}var d=a.getSelection(),k=d.createBookmarks(),f=a.document,e=a.createRange(),p=f.getDocumentElement().$,r=CKEDITOR.env.ie&&9>CKEDITOR.env.version,
n=a.blockless||CKEDITOR.env.ie?"span":"div",l,m,z,q;f.getById("cke_table_copybin")||(l=f.createElement(n),m=f.createElement(n),m.setAttributes({id:"cke_table_copybin","data-cke-temp":"1"}),l.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"}),l.setStyle("ltr"==a.config.contentsLangDirection?"left":"right","-5000px"),l.setHtml(a.getSelectedHtml(!0)),a.fire("lockSnapshot"),m.append(l),a.editable().append(m),q=a.on("selectionChange",c,null,null,0),r&&(z=p.scrollTop),e.selectNodeContents(l),
e.select(),r&&(p.scrollTop=z),setTimeout(function(){m.remove();d.selectBookmarks(k);q.removeListener();a.fire("unlockSnapshot");b&&(a.extractSelectedHtml(),a.fire("saveSnapshot"))},100))}function G(a){var b=a.editor||a.sender.editor;b.getSelection().isInTable()&&O(b,"cut"===a.name)}function P(a){function b(a){a=a.getRanges()[0];var b=a.endContainer.getAscendant("tr",!0);if(b&&a.collapsed){if(a.checkBoundaryOfElement(b,CKEDITOR.START))return 1;if(a.checkBoundaryOfElement(b,CKEDITOR.END))return 2}return 0}
function c(a){var b=0,d;for(d=0;d<a.length;d++)a[d].length>b&&(b=a[d].length);return b}function d(a){var b=a.getAscendant("table"),d=a.getParent().$.rowIndex,b=CKEDITOR.tools.buildTableMap(b),c;for(c=0;c<b[d].length;c++)if((new CKEDITOR.dom.element(b[d][c])).equals(a))return c}var k=a.editor,f=k.dataProcessor,e=k.getSelection(),p=new CKEDITOR.dom.element("body"),r=0,n=0,l=0,m=0,z={},q,g,h,u,w,v;f||(f=new CKEDITOR.htmlDataProcessor(k));p.setHtml(f.toHtml(a.data.dataValue),{fixForBody:!1});m=p.findOne("table");
if(e.getRanges().length&&(e.isInTable()||(q=b(e)))&&(g=t(e),g.length)){a.stop();a=g[0].getAscendant("table");g=t(e,a);h=g[0];l=h.getParent();u=g[g.length-1];w=u.getParent();if(!q)for(f=0;f<g.length;f++)g[f].setHtml("");if(1<p.getChildCount()||!m)g[0].setHtml(p.getHtml()),k.fire("saveSnapshot");else{if(q){g=l.getChildCount();l=w=new CKEDITOR.dom.element("tr");l["insert"+(1===q?"Before":"After")](h.getParent());for(f=0;f<g;f++)h=new CKEDITOR.dom.element("td"),h.appendTo(l);h=l.getFirst();u=l.getLast();
e.selectElement(l);g=t(e)}q=CKEDITOR.tools.buildTableMap(a,l.$.rowIndex,E(h,!0),w.$.rowIndex,d(u));e=CKEDITOR.tools.buildTableMap(m);l=c(e);m=c(q);if(e.length>q.length)for(r=e.length-q.length,f=0;f<r;f++)H(g);if(l>m)for(n=l-m,f=0;f<n;f++)I(g);h=g[0];l=h.getParent();u=g[g.length-1];w=new CKEDITOR.dom.element(a.$.rows[u.getParent().$.rowIndex+r]);u=w.getChild(u.$.cellIndex+n);r=E(g[0],!0);g=d(u);q=CKEDITOR.tools.buildTableMap(a,l.$.rowIndex,r,w.$.rowIndex,g);for(f=0;f<e.length;f++)for(n=new CKEDITOR.dom.element(a.$.rows[l.$.rowIndex+
f]),g=0;g<e[f].length;g++)if(v=new CKEDITOR.dom.element(e[f][g]),p=q[f]&&q[f][g]?new CKEDITOR.dom.element(q[f][g]):null,v&&!v.getCustomData("processed")){if(p&&p.getParent())v.replace(p);else if(0===g||e[f][g-1])(p=0!==g?new CKEDITOR.dom.element(e[f][g-1]):null)&&n.equals(p.getParent())?v.insertAfter(p):0<r?v.insertAfter(new CKEDITOR.dom.element(n.$.cells[r])):n.append(v,!0);CKEDITOR.dom.element.setMarker(z,v,"processed",!0)}else v.getCustomData("processed")&&p&&p.remove();CKEDITOR.dom.element.clearAllMarkers(z);
x(k,B(new CKEDITOR.dom.element(e[0][0]),v));k.fire("saveSnapshot");setTimeout(function(){k.fire("afterPaste")},0)}}}function F(a,b,c){a.on("beforeCommandExec",function(d){-1!==CKEDITOR.tools.array.indexOf(b,d.data.name)&&(d.data.selectedCells=t(a.getSelection()))});a.on("afterCommandExec",function(d){-1!==CKEDITOR.tools.array.indexOf(b,d.data.name)&&c(a,d.data)})}var h={active:!1},A,t,E,H,I;CKEDITOR.plugins.tableselection={getCellsBetween:B,keyboardIntegration:function(a){function b(a){a.getEnclosedNode()?
a.getEnclosedNode().setText(""):a.deleteContents();CKEDITOR.tools.array.forEach(a._find("td"),function(a){a.appendBogus()})}var c=a.editable();c.attachListener(c,"keydown",function(a){function c(b,f){if(!f.length)return null;var k=a.createRange(),l=CKEDITOR.dom.range.mergeRanges(f);CKEDITOR.tools.array.forEach(l,function(a){a.enlarge(CKEDITOR.ENLARGE_ELEMENT)});var m=l[0].getBoundaryNodes(),h=m.startNode,m=m.endNode;if(h&&h.is&&h.is(e)){for(var q=h.getAscendant("table",!0),g=h.getPreviousSourceNode(!1,
CKEDITOR.NODE_ELEMENT,q),t=!1,u=function(a){return!h.contains(a)&&a.is&&a.is("td","th")};g&&!u(g);)g=g.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,q);!g&&m&&m.is&&!m.is("table")&&m.getNext()&&(g=m.getNext().findOne("td, th"),t=!0);if(g)k["moveToElementEdit"+(t?"Start":"End")](g);else k.setStartBefore(h.getAscendant("table",!0)),k.collapse(!0);l[0].deleteContents();return[k]}if(h)return k.moveToElementEditablePosition(h),[k]}var f={37:1,38:1,39:1,40:1,8:1,46:1},e=CKEDITOR.tools.extend({table:1},
CKEDITOR.dtd.$tableContent);delete e.td;delete e.th;return function(e){var h=e.data.getKey(),n,l=37===h||38==h,m,t,q;if(f[h]&&(n=a.getSelection())&&n.isInTable()&&n.isFake)if(m=n.getRanges(),t=m[0]._getTableElement(),q=m[m.length-1]._getTableElement(),e.data.preventDefault(),e.cancel(),8<h&&46>h)m[0].moveToElementEditablePosition(l?t:q,!l),n.selectRanges([m[0]]);else{for(e=0;e<m.length;e++)b(m[e]);(e=c(t,m))?m=e:m[0].moveToElementEditablePosition(t);n.selectRanges(m);a.fire("saveSnapshot")}}}(a),
null,null,-1);c.attachListener(c,"keypress",function(d){var c=a.getSelection(),f,e;if(c&&c.isInTable()&&c.isFake&&d.data.$.charCode&&!(d.data.getKeystroke()&CKEDITOR.CTRL)){d=c.getRanges();f=d[0].getEnclosedNode().getAscendant({td:1,th:1},!0);for(e=0;e<d.length;e++)b(d[e]);d[0].moveToElementEditablePosition(f);c.selectRanges([d[0]])}},null,null,-1)},isSupportedEnvironment:!(CKEDITOR.env.ie&&11>CKEDITOR.env.version)};CKEDITOR.plugins.add("tableselection",{requires:"clipboard,tabletools",onLoad:function(){A=
CKEDITOR.plugins.tabletools;t=A.getSelectedCells;E=A.getCellColIndex;H=A.insertRow;I=A.insertColumn;CKEDITOR.document.appendStyleSheet(this.path+"/styles/tableselection.css")},init:function(a){CKEDITOR.plugins.tableselection.isSupportedEnvironment&&(a.addContentsCss&&a.addContentsCss(this.path+"/styles/tableselection.css"),a.on("contentDom",function(){var b=a.editable(),c=b.isInline()?b:a.document,d={editor:a};b.attachListener(c,"mousedown",y,null,d);b.attachListener(c,"mousemove",y,null,d);b.attachListener(c,
"mouseup",y,null,d);b.attachListener(b,"dragstart",N);b.attachListener(a,"selectionCheck",M);CKEDITOR.plugins.tableselection.keyboardIntegration(a);CKEDITOR.plugins.clipboard&&!CKEDITOR.plugins.clipboard.isCustomCopyCutSupported&&(b.attachListener(b,"cut",G),b.attachListener(b,"copy",G))}),a.on("paste",P),F(a,"rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "),function(a,c){x(a,c.selectedCells)}),F(a,["cellMerge","cellMergeRight","cellMergeDown"],
function(a,c){x(a,[c.commandData.cell])}),F(a,["cellDelete"],function(a){C(a,!0)}))}})})();
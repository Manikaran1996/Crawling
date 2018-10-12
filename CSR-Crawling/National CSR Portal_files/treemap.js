/*
 Highcharts JS v6.0.4 (2017-12-15)

 (c) 2014 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(u){"object"===typeof module&&module.exports?module.exports=u:u(Highcharts)})(function(u){var I=function(d){var u=d.each,x=d.extend,m=d.pick;return{getColor:function(r,p){var E=p.index,l=p.levelMap,g=p.parentColor,u=p.parentColorIndex,w=p.series,q=p.colors,x=p.siblings,f=w.points,t,B,y,C;if(r){f=f[r.i];r=l[r.levelDynamic]||{};if(t=f&&("boolean"===typeof r.colorByPoint?r.colorByPoint:!!w.options.colorByPoint))y=f.index%(q?q.length:w.chart.options.chart.colorCount),B=q&&q[y];q=f&&f.options.color;
    t=r&&r.color;if(l=g)l=(l=r&&r.colorVariation)&&"brightness"===l.key?d.color(g).brighten(E/x*l.to).get():g;t=m(q,t,B,l,w.color);C=m(f&&f.options.colorIndex,r&&r.colorIndex,y,u,p.colorIndex)}return{color:t,colorIndex:C}},setTreeValues:function p(d,l){var g=l.before,z=l.idRoot,w=l.mapIdToNode[z],q=l.points[d.i],A=q&&q.options||{},f=0,t=[];x(d,{levelDynamic:d.level-(("boolean"===typeof l.levelIsConstant?l.levelIsConstant:1)?0:w.level),name:m(q&&q.name,""),visible:z===d.id||("boolean"===typeof l.visible?
    l.visible:!1)});"function"===typeof g&&(d=g(d,l));u(d.children,function(g,m){var q=x({},l);x(q,{index:m,siblings:d.children.length,visible:d.visible});g=p(g,q);t.push(g);g.visible&&(f+=g.val)});d.visible=0<f||d.visible;g=m(A.value,f);x(d,{children:t,childrenTotal:f,isLeaf:d.visible&&!f,val:g});return d}}}(u);(function(d,u){var x=d.seriesType,m=d.seriesTypes,r=d.map,p=d.merge,E=d.extend,l=d.noop,g=d.each,z=u.getColor,w=d.grep,q=d.isNumber,A=d.isString,f=d.pick,t=d.Series,B=d.stableSort,y=d.Color,C=
    function(a,b,c){c=c||this;d.objectEach(a,function(k,e){b.call(c,k,e,a)})},F=d.reduce,D=function(a,b,c){c=c||this;a=b.call(c,a);!1!==a&&D(a,b,c)};x("treemap","scatter",{showInLegend:!1,marker:!1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",formatter:function(){return this.point.name||this.point.id},inside:!0},tooltip:{headerFormat:"",pointFormat:"\x3cb\x3e{point.name}\x3c/b\x3e: {point.value}\x3cbr/\x3e"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",
    alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,opacity:.15,states:{hover:{borderColor:"#999999",brightness:m.heatmap?0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],axisTypes:m.heatmap?["xAxis","yAxis","colorAxis"]:["xAxis","yAxis"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:l,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",translateColors:m.heatmap&&m.heatmap.prototype.translateColors,
    colorAttribs:m.heatmap&&m.heatmap.prototype.colorAttribs,trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,b){a=F(a||[],function(a,b,e){b=f(b.parent,"");void 0===a[b]&&(a[b]=[]);a[b].push(e);return a},{});C(a,function(a,k,e){""!==k&&-1===d.inArray(k,b)&&(g(a,function(a){e[""].push(a)}),delete e[k])});return a},getTree:function(){var a=r(this.data,function(a){return a.id}),a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},init:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         b){t.prototype.init.call(this,a,b);this.options.allowDrillToNode&&d.addEvent(this,"click",this.onClickDrillToNode)},buildNode:function(a,b,c,k,e){var n=this,d=[],h=n.points[b],G=0,H;g(k[a]||[],function(b){H=n.buildNode(n.points[b].id,b,c+1,k,a);G=Math.max(H.height+1,G);d.push(H)});b={id:a,i:b,children:d,height:G,level:c,parent:e,visible:!1};n.nodeMap[b.id]=b;h&&(h.node=b);return b},setTreeValues:function(a){var b=this,c=b.options,k=b.nodeMap[b.rootNode],c="boolean"===typeof c.levelIsConstant?c.levelIsConstant:
        !0,e=0,n=[],d,h=b.points[a.i];g(a.children,function(a){a=b.setTreeValues(a);n.push(a);a.ignore||(e+=a.val)});B(n,function(a,b){return a.sortIndex-b.sortIndex});d=f(h&&h.options.value,e);h&&(h.value=d);E(a,{children:n,childrenTotal:e,ignore:!(f(h&&h.visible,!0)&&0<d),isLeaf:a.visible&&!e,levelDynamic:a.level-(c?0:k.level),name:f(h&&h.name,""),sortIndex:f(h&&h.sortIndex,-d),val:d});return a},calculateChildrenAreas:function(a,b){var c=this,k=c.options,e=this.levelMap[a.levelDynamic+1],n=f(c[e&&e.layoutAlgorithm]&&
        e.layoutAlgorithm,k.layoutAlgorithm),d=k.alternateStartingDirection,h=[];a=w(a.children,function(a){return!a.ignore});e&&e.layoutStartingDirection&&(b.direction="vertical"===e.layoutStartingDirection?0:1);h=c[n](b,a);g(a,function(a,e){e=h[e];a.values=p(e,{val:a.childrenTotal,direction:d?1-b.direction:b.direction});a.pointValues=p(e,{x:e.x/c.axisRatio,width:e.width/c.axisRatio});a.children.length&&c.calculateChildrenAreas(a,a.values)})},setPointValues:function(){var a=this,b=a.xAxis,c=a.yAxis;g(a.points,
        function(k){var e=k.node,n=e.pointValues,d,h,g;g=(a.pointAttribs(k)["stroke-width"]||0)%2/2;n&&e.visible?(e=Math.round(b.translate(n.x,0,0,0,1))-g,d=Math.round(b.translate(n.x+n.width,0,0,0,1))-g,h=Math.round(c.translate(n.y,0,0,0,1))-g,n=Math.round(c.translate(n.y+n.height,0,0,0,1))-g,k.shapeType="rect",k.shapeArgs={x:Math.min(e,d),y:Math.min(h,n),width:Math.abs(d-e),height:Math.abs(n-h)},k.plotX=k.shapeArgs.x+k.shapeArgs.width/2,k.plotY=k.shapeArgs.y+k.shapeArgs.height/2):(delete k.plotX,delete k.plotY)})},
    setColorRecursive:function(a,b,c,k,e){var d=this,f=d&&d.chart,f=f&&f.options&&f.options.colors,h;if(a){h=z(a,{colors:f,index:k,levelMap:d.levelMap,parentColor:b,parentColorIndex:c,series:d,siblings:e});if(b=d.points[a.i])b.color=h.color,b.colorIndex=h.colorIndex;g(a.children||[],function(b,c){d.setColorRecursive(b,h.color,h.colorIndex,c,a.children.length)})}},algorithmGroup:function(a,b,c,d){this.height=a;this.width=b;this.plot=d;this.startDirection=this.direction=c;this.lH=this.nH=this.lW=this.nW=
        this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,b){return Math.max(a/b,b/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,
        this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,b,c,d){var e,k,f,h,l=c.lW,m=c.lH,v=c.plot,p,q=0,t=c.elArr.length-1;b?(l=c.nW,m=c.nH):p=c.elArr[c.elArr.length-1];g(c.elArr,function(a){if(b||q<t)0===c.direction?(e=v.x,k=v.y,f=l,h=a/f):(e=v.x,k=v.y,h=m,f=a/h),d.push({x:e,
        y:k,width:f,height:h}),0===c.direction?v.y+=h:v.x+=f;q+=1});c.reset();0===c.direction?c.width-=l:c.height-=m;v.y=v.parent.y+(v.parent.height-c.height);v.x=v.parent.x+(v.parent.width-c.width);a&&(c.direction=1-c.direction);b||c.addElement(p)},algorithmLowAspectRatio:function(a,b,c){var d=[],e=this,n,f={x:b.x,y:b.y,parent:b},h=0,l=c.length-1,m=new this.algorithmGroup(b.height,b.width,b.direction,f);g(c,function(c){n=c.val/b.val*b.height*b.width;m.addElement(n);m.lP.nR>m.lP.lR&&e.algorithmCalcPoints(a,
        !1,m,d,f);h===l&&e.algorithmCalcPoints(a,!0,m,d,f);h+=1});return d},algorithmFill:function(a,b,c){var d=[],e,f=b.direction,l=b.x,h=b.y,m=b.width,p=b.height,q,t,r,u;g(c,function(c){e=c.val/b.val*b.height*b.width;q=l;t=h;0===f?(u=p,r=e/u,m-=r,l+=r):(r=m,u=e/r,p-=u,h+=u);d.push({x:q,y:t,width:r,height:u});a&&(f=1-f)});return d},strip:function(a,b){return this.algorithmLowAspectRatio(!1,a,b)},squarified:function(a,b){return this.algorithmLowAspectRatio(!0,a,b)},sliceAndDice:function(a,b){return this.algorithmFill(!0,
        a,b)},stripes:function(a,b){return this.algorithmFill(!1,a,b)},translate:function(){var a=this,b=a.rootNode=f(a.rootNode,a.options.rootId,""),c,d;t.prototype.translate.call(a);a.levelMap=F(a.options.levels||[],function(a,b){a[b.level]=b;return a},{});d=a.tree=a.getTree();c=a.nodeMap[b];""===b||c&&c.children.length||(a.drillToNode("",!1),b=a.rootNode,c=a.nodeMap[b]);D(a.nodeMap[a.rootNode],function(b){var c=!1,d=b.parent;b.visible=!0;if(d||""===d)c=a.nodeMap[d];return c});D(a.nodeMap[a.rootNode].children,
        function(a){var b=!1;g(a,function(a){a.visible=!0;a.children.length&&(b=(b||[]).concat(a.children))});return b});a.setTreeValues(d);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=b={x:0,y:0,width:100,height:100};a.nodeMap[""].values=b=p(b,{width:b.width*a.axisRatio,direction:"vertical"===a.options.layoutStartingDirection?0:1,val:d.val});a.calculateChildrenAreas(d,b);a.colorAxis?a.translateColors():a.options.colorByPoint||a.setColorRecursive(a.tree);a.options.allowDrillToNode&&(c=c.pointValues,
        a.xAxis.setExtremes(c.x,c.x+c.width,!1),a.yAxis.setExtremes(c.y,c.y+c.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,b=w(a.points,function(a){return a.node.visible}),c,d;g(b,function(b){d=a.levelMap[b.node.levelDynamic];c={style:{}};b.node.isLeaf||(c.enabled=!1);d&&d.dataLabels&&(c=p(c,d.dataLabels),a._hasPointLabels=!0);b.shapeArgs&&(c.style.width=b.shapeArgs.width,b.dataLabel&&b.dataLabel.css({width:b.shapeArgs.width+"px"}));b.dlOptions=
        p(c,b.options.dataLabels)});t.prototype.drawDataLabels.call(this)},alignDataLabel:function(a){m.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1})},pointAttribs:function(a,b){var c=a&&this.levelMap[a.node.levelDynamic]||{},d=this.options,e=b&&d.states[b]||{},g=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||c.borderColor||e.borderColor||d.borderColor,"stroke-width":f(a&&a.borderWidth,c.borderWidth,e.borderWidth,d.borderWidth),dashstyle:a&&
    a.borderDashStyle||c.borderDashStyle||e.borderDashStyle||d.borderDashStyle,fill:a&&a.color||this.color};-1!==g.indexOf("highcharts-above-level")?(a.fill="none",a["stroke-width"]=0):-1!==g.indexOf("highcharts-internal-node-interactive")?(b=f(e.opacity,d.opacity),a.fill=y(a.fill).setOpacity(b).get(),a.cursor="pointer"):-1!==g.indexOf("highcharts-internal-node")?a.fill="none":b&&(a.fill=y(a.fill).brighten(e.brightness).get());return a},drawPoints:function(){var a=this,b=w(a.points,function(a){return a.node.visible});
        g(b,function(b){var c="level-group-"+b.node.levelDynamic;a[c]||(a[c]=a.chart.renderer.g(c).attr({zIndex:1E3-b.node.levelDynamic}).add(a.group));b.group=a[c]});m.column.prototype.drawPoints.call(this);a.options.allowDrillToNode&&g(b,function(b){b.graphic&&(b.drillId=a.options.interactByLeaf?a.drillToByLeaf(b):a.drillToByGroup(b))})},onClickDrillToNode:function(a){var b=(a=a.point)&&a.drillId;A(b)&&(a.setState(""),this.drillToNode(b))},drillToByGroup:function(a){var b=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||
    a.node.isLeaf||(b=a.id);return b},drillToByLeaf:function(a){var b=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!b;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(b=a.id);return b},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&A(a.parent)&&this.drillToNode(a.parent)},drillToNode:function(a,b){var c=this.nodeMap[a];this.idPreviousRoot=this.rootNode;this.rootNode=a;""===a?this.drillUpButton=this.drillUpButton.destroy():this.showDrillUpButton(c&&c.name||a);this.isDirty=
        !0;f(b,!0)&&this.chart.redraw()},showDrillUpButton:function(a){var b=this;a=a||"\x3c Back";var c=b.options.drillUpButton,d,e;c.text&&(a=c.text);this.drillUpButton?(this.drillUpButton.placed=!1,this.drillUpButton.attr({text:a}).align()):(e=(d=c.theme)&&d.states,this.drillUpButton=this.chart.renderer.button(a,null,null,function(){b.drillUp()},d,e&&e.hover,e&&e.select).addClass("highcharts-drillup-button").attr({align:c.position.align,zIndex:7}).add().align(c.position,!1,c.relativeTo||"plotBox"))},buildKDTree:l,
    drawLegendSymbol:d.LegendSymbolMixin.drawRectangle,getExtremes:function(){t.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;t.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};t.prototype.bindAxes.call(this);d.extend(this.yAxis.options,a);d.extend(this.xAxis.options,
        a)},utils:{recursive:D,reduce:F}},{getClassName:function(){var a=d.Point.prototype.getClassName.call(this),b=this.series,c=b.options;this.node.level<=b.nodeMap[b.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||f(c.interactByLeaf,!c.allowDrillToNode)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||q(this.value)},setState:function(a){d.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===
a?1:0})},setVisible:m.pie.prototype.pointClass.prototype.setVisible})})(u,I)});
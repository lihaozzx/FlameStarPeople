var __pageFrameStartTime__ = Date.now();
var __webviewId__;
var __wxAppCode__ = {};
var __WXML_GLOBAL__ = {
  entrys: {},
  defines: {},
  modules: {},
  ops: [],
  wxs_nf_init: undefined,
  total_ops: 0
};
var $gwx;

/*v0.5vv_20190312_syb_scopedata*/window.__wcc_version__='v0.5vv_20190312_syb_scopedata';window.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _gv( )
{if( typeof( window.__webview_engine_version__) == 'undefined' ) return 0.0;
return window.__webview_engine_version__;}
function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
var cs
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'root data-v-06ef4ac2'])
Z([3,'bg data-v-06ef4ac2'])
Z([3,'view_navigation data-v-06ef4ac2'])
Z([3,'logo data-v-06ef4ac2'])
Z([[2,'?:'],[[2,'=='],[[7],[3,'iszuhe']],[1,0]],[1,'/static/01fe5b5a6bd773a8012134663c2fee.png'],[[2,'?:'],[[2,'=='],[[7],[3,'iszuhe']],[1,1]],[1,'/static/018af65a6bd774a8012134669fe1c6.png'],[1,'/static/01b5ad5a6bd773a801213466708f77@2x.png']]])
Z([[2,'&&'],[[7],[3,'start']],[[2,'=='],[[7],[3,'iszuhe']],[1,0]]])
Z([3,'content data-v-06ef4ac2'])
Z([3,'fs28 c8c data-v-06ef4ac2'])
Z([3,'emsp'])
Z([a,[[2,'+'],[[2,'+'],[[7],[3,'nowTopicNumstr']],[1,' ']],[[7],[3,'topicType']]]])
Z([3,'ts36 c8c data-v-06ef4ac2'])
Z([a,[[7],[3,'topicName']]])
Z([3,'ans data-v-06ef4ac2'])
Z([3,'i'])
Z([3,'k'])
Z([[7],[3,'ans']])
Z(z[14])
Z([3,'__e'])
Z([[4],[[5],[[5],[1,'one data-v-06ef4ac2']],[[2,'?:'],[[2,'=='],[[7],[3,'nowCh']],[[7],[3,'i']]],[1,'ch'],[1,' no']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'chFont']],[[4],[[5],[[7],[3,'i']]]]]]]]]]]])
Z([a,[[6],[[7],[3,'k']],[3,'val']]])
Z(z[18])
Z([3,'del_img data-v-06ef4ac2'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[1,'delZuheans']]]]]]]]])
Z([3,'data-v-06ef4ac2'])
Z([3,'../../static/del.png'])
Z([[2,'!'],[[7],[3,'isqiyan']]])
Z([3,'daan data-v-06ef4ac2'])
Z(z[15])
Z([3,'v'])
Z([[7],[3,'daans']])
Z(z[15])
Z(z[18])
Z([[4],[[5],[[5],[1,'one data-v-06ef4ac2']],[[2,'?:'],[[6],[[7],[3,'v']],[3,'ed']],[1,'ched'],[1,'']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'chzuhe']],[[4],[[5],[[7],[3,'k']]]]]]]]]]]])
Z([a,[[6],[[7],[3,'v']],[3,'val']]])
Z([3,'b1 data-v-06ef4ac2'])
Z([3,'b2 data-v-06ef4ac2'])
Z([3,'b3 data-v-06ef4ac2'])
Z([3,'b4 data-v-06ef4ac2'])
Z([3,'daan2 data-v-06ef4ac2'])
Z(z[15])
Z(z[30])
Z(z[31])
Z(z[15])
Z(z[18])
Z(z[34])
Z(z[35])
Z([a,z[36][1]])
Z(z[37])
Z(z[38])
Z([3,'b5 data-v-06ef4ac2'])
Z(z[39])
Z(z[40])
Z(z[18])
Z([[4],[[5],[[5],[1,'data-v-06ef4ac2']],[[2,'?:'],[[7],[3,'sub']],[1,'subed_btn'],[1,'sure_btn']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'subZuhe']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z(z[25])
Z([3,'锁定答案'])
Z([3,'daojishi data-v-06ef4ac2'])
Z(z[25])
Z([a,[[2,'+'],[[2,'+'],[1,'倒计时：'],[[7],[3,'timeCost']]],[1,' 秒']]])
Z([[2,'&&'],[[7],[3,'start']],[[2,'=='],[[7],[3,'iszuhe']],[1,1]]])
Z(z[7])
Z(z[8])
Z(z[9])
Z([a,z[10][1]])
Z(z[11])
Z([a,z[12][1]])
Z([3,'xuanzedaan fs30 data-v-06ef4ac2'])
Z(z[14])
Z(z[15])
Z([[7],[3,'anss']])
Z(z[14])
Z(z[18])
Z([3,'one data-v-06ef4ac2'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'xuanze']],[[4],[[5],[[7],[3,'i']]]]]]]]]]]])
Z(z[25])
Z([a,[[2,'+'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'0']],[1,'A.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'1']],[1,'B.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'2']],[1,'C.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'3']],[1,'D.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'4']],[1,'E.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'5']],[1,'F.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'6']],[1,'G.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'7']],[1,'H.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'8']],[1,'I.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'9']],[1,'J.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'10']],[1,'K.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'11']],[1,'L.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'12']],[1,'M.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'12']],[1,'N.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'13']],[1,'O.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'14']],[1,'P.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'15']],[1,'Q.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'16']],[1,'R.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'17']],[1,'S.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'18']],[1,'T.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'19']],[1,'U.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'20']],[1,'V.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'21']],[1,'W.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'22']],[1,'X.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'23']],[1,'Y.'],[[2,'?:'],[[2,'=='],[[7],[3,'i']],[1,'24']],[1,'Z.'],[1,'']]]]]]]]]]]]]]]]]]]]]]]]]]],[[7],[3,'k']]]])
Z([[2,'&&'],[[2,'!'],[[7],[3,'isduoxuan']]],[[2,'=='],[[7],[3,'i']],[[7],[3,'ch']]]])
Z([3,'ch_img data-v-06ef4ac2'])
Z([3,'../../static/5c773b1038020.png'])
Z([3,'__i0__'])
Z([3,'c'])
Z([[7],[3,'chs']])
Z([3,'*this'])
Z([[2,'&&'],[[7],[3,'isduoxuan']],[[2,'=='],[[7],[3,'i']],[[7],[3,'c']]]])
Z(z[81])
Z(z[82])
Z(z[18])
Z(z[56])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'subQita']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z(z[25])
Z(z[59])
Z(z[60])
Z(z[25])
Z([a,z[62][1]])
Z([[2,'&&'],[[7],[3,'start']],[[2,'=='],[[7],[3,'iszuhe']],[1,2]]])
Z(z[7])
Z(z[8])
Z(z[9])
Z([a,z[10][1]])
Z(z[11])
Z([a,z[12][1]])
Z([[7],[3,'canQiang']])
Z(z[18])
Z([3,'qiangda data-v-06ef4ac2'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'qdfun']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'_span data-v-06ef4ac2'])
Z([3,'抢答'])
Z(z[15])
Z([3,'t'])
Z([[6],[[7],[3,'timuxinxi']],[3,'xuanx']])
Z(z[15])
Z(z[25])
Z([[2,'<'],[[7],[3,'k']],[[7],[3,'xiansuonum']]])
Z(z[109])
Z([3,'font-size:14px;'])
Z([a,[[7],[3,'t']]])
Z(z[7])
Z(z[25])
Z([3,'height:30%;'])
Z(z[25])
Z([3,'比赛即将开始，请注意屏幕信息'])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content data-v-274bc35a'])
Z([3,'bg data-v-274bc35a'])
Z([3,'view_navigation data-v-274bc35a'])
Z([3,'logo data-v-274bc35a'])
Z([3,'/static/login_bg.png'])
Z([[2,'=='],[[7],[3,'show']],[1,0]])
Z([3,'login data-v-274bc35a'])
Z([3,'title data-v-274bc35a'])
Z([3,'输入信息'])
Z([3,'info data-v-274bc35a'])
Z([3,'shuru data-v-274bc35a'])
Z([3,'__e'])
Z([3,'data-v-274bc35a'])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'$0']],[1,'num']],[1,'$event']],[[4],[[5]]]]]],[[4],[[5],[1,'']]]]]]]]]]])
Z([3,'座位号'])
Z([3,'text'])
Z([[7],[3,'num']])
Z(z[12])
Z([3,'sure data-v-274bc35a'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'login']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'确认'])
Z([[2,'=='],[[7],[3,'show']],[1,1]])
Z([3,'login wait data-v-274bc35a'])
Z(z[13])
Z([a,[[7],[3,'str']]])
Z([[2,'=='],[[7],[3,'show']],[1,2]])
Z(z[7])
Z(z[8])
Z([3,'核对信息'])
Z([3,'infos data-v-274bc35a'])
Z([3,'img _div data-v-274bc35a'])
Z([[2,'+'],[[2,'+'],[1,'background-image: url('],[[6],[[7],[3,'stuInfo']],[3,'img']]],[1,');']])
Z(z[13])
Z([a,[[2,'+'],[1,'座号:'],[[6],[[7],[3,'stuInfo']],[3,'number']]]])
Z(z[13])
Z([a,[[2,'+'],[1,'姓名:'],[[6],[[7],[3,'stuInfo']],[3,'name']]]])
Z(z[13])
Z([a,[[2,'+'],[1,'学校:'],[[6],[[7],[3,'stuInfo']],[3,'school']]]])
Z(z[13])
Z([a,[[2,'+'],[1,'班级:'],[[6],[[7],[3,'stuInfo']],[3,'class']]]])
Z([3,'tishi data-v-274bc35a'])
Z(z[13])
Z([3,'注意：如信息有误，请联系现场工作人员'])
Z(z[12])
Z(z[13])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'infoWrong']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'../../static/set.png'])
Z([[2,'!'],[[7],[3,'insure']]])
Z(z[12])
Z(z[19])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'sureInfo']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'确认信息'])
Z([3,'issure data-v-274bc35a'])
Z(z[13])
Z([3,'请等待比赛开始'])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'root data-v-58e919b4'])
Z([3,'bg data-v-58e919b4'])
Z([3,'view_navigation data-v-58e919b4'])
Z([3,'logo data-v-58e919b4'])
Z([3,'../../static/login_bg.png'])
Z([3,'content data-v-58e919b4'])
Z([3,'title data-v-58e919b4'])
Z([3,'答题结束'])
Z([3,'data-v-58e919b4'])
Z([3,'emsp'])
Z([3,'position:absolute;font-size:20rpx;font-weight:900;top:50rpx;'])
Z([a,[[2,'+'],[[2,'+'],[1,'总分：'],[[7],[3,'allnum']]],[1,' 分']]])
Z(z[9])
Z([3,'position:absolute;font-size:30rpx;font-weight:900;top:0rpx;left:700rpx;'])
Z([a,[[7],[3,'name']]])
Z(z[9])
Z([3,'position:absolute;font-size:30rpx;font-weight:900;top:0rpx;left:900rpx;'])
Z([a,[[7],[3,'school']]])
Z([3,'info data-v-58e919b4'])
Z([3,'__i0__'])
Z([3,'t'])
Z([[7],[3,'topicInfo']])
Z([3,'id'])
Z([[4],[[5],[[5],[1,'topicInfo data-v-58e919b4']],[[2,'?:'],[[2,'!='],[[6],[[7],[3,'t']],[3,'score']],[1,'0.0']],[1,'right'],[1,'wrong']]]])
Z(z[9])
Z([3,'font-size:12rpx;'])
Z([a,[[6],[[7],[3,'t']],[3,'sort']]])
Z(z[9])
Z([a,[[2,'?:'],[[2,'!='],[[6],[[7],[3,'t']],[3,'score']],[[2,'>'],[1,'0.0'],[1,0]]],[1,'正确'],[1,'错误']]])
Z([3,'nowr data-v-58e919b4'])
Z([a,[[2,'+'],[[6],[[7],[3,'t']],[3,'score']],[1,' 分']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./pages/ans/ans.wxml','./pages/index/index.wxml','./pages/info/info.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
cs.push("./pages/ans/ans.wxml:view:1:1")
var oB=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./pages/ans/ans.wxml:view:1:51")
var oD=_n('view')
_rz(z,oD,'class',2,e,s,gg)
cs.push("./pages/ans/ans.wxml:view:1:84")
var fE=_n('view')
_rz(z,fE,'class',3,e,s,gg)
cs.pop()
_(oD,fE)
cs.push("./pages/ans/ans.wxml:image:1:137")
var cF=_mz(z,'image',['class',4,'src',1],[],e,s,gg)
cs.pop()
_(oD,cF)
cs.pop()
_(oB,oD)
var xC=_v()
_(oB,xC)
if(_oz(z,6,e,s,gg)){xC.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:356")
cs.push("./pages/ans/ans.wxml:view:1:392")
var hG=_n('view')
_rz(z,hG,'class',7,e,s,gg)
cs.push("./pages/ans/ans.wxml:text:1:430")
var cI=_mz(z,'text',['class',8,'space',1],[],e,s,gg)
var oJ=_oz(z,10,e,s,gg)
_(cI,oJ)
cs.pop()
_(hG,cI)
cs.push("./pages/ans/ans.wxml:text:1:521")
var lK=_n('text')
_rz(z,lK,'class',11,e,s,gg)
var aL=_oz(z,12,e,s,gg)
_(lK,aL)
cs.pop()
_(hG,lK)
cs.push("./pages/ans/ans.wxml:view:1:580")
var tM=_n('view')
_rz(z,tM,'class',13,e,s,gg)
var eN=_v()
_(tM,eN)
cs.push("./pages/ans/ans.wxml:block:1:614")
var bO=function(xQ,oP,oR,gg){
cs.push("./pages/ans/ans.wxml:block:1:614")
cs.push("./pages/ans/ans.wxml:view:1:682")
var cT=_mz(z,'view',['bindtap',18,'class',1,'data-event-opts',2],[],xQ,oP,gg)
var hU=_oz(z,21,xQ,oP,gg)
_(cT,hU)
cs.pop()
_(oR,cT)
cs.pop()
return oR
}
eN.wxXCkey=2
_2z(z,16,bO,e,s,gg,eN,'k','i','i')
cs.pop()
cs.push("./pages/ans/ans.wxml:view:1:831")
var oV=_mz(z,'view',['bindtap',22,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/ans/ans.wxml:image:1:932")
var cW=_mz(z,'image',['class',25,'src',1],[],e,s,gg)
cs.pop()
_(oV,cW)
cs.pop()
_(tM,oV)
cs.pop()
_(hG,tM)
var oH=_v()
_(hG,oH)
if(_oz(z,27,e,s,gg)){oH.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:1012")
cs.push("./pages/ans/ans.wxml:view:1:1040")
var oX=_n('view')
_rz(z,oX,'class',28,e,s,gg)
var lY=_v()
_(oX,lY)
cs.push("./pages/ans/ans.wxml:block:1:1075")
var aZ=function(e2,t1,b3,gg){
cs.push("./pages/ans/ans.wxml:block:1:1075")
cs.push("./pages/ans/ans.wxml:view:1:1145")
var x5=_mz(z,'view',['bindtap',33,'class',1,'data-event-opts',2],[],e2,t1,gg)
var o6=_oz(z,36,e2,t1,gg)
_(x5,o6)
cs.pop()
_(b3,x5)
cs.pop()
return b3
}
lY.wxXCkey=2
_2z(z,31,aZ,e,s,gg,lY,'v','k','k')
cs.pop()
cs.push("./pages/ans/ans.wxml:view:1:1289")
var f7=_n('view')
_rz(z,f7,'class',37,e,s,gg)
cs.pop()
_(oX,f7)
cs.push("./pages/ans/ans.wxml:view:1:1329")
var c8=_n('view')
_rz(z,c8,'class',38,e,s,gg)
cs.pop()
_(oX,c8)
cs.push("./pages/ans/ans.wxml:view:1:1369")
var h9=_n('view')
_rz(z,h9,'class',39,e,s,gg)
cs.pop()
_(oX,h9)
cs.push("./pages/ans/ans.wxml:view:1:1409")
var o0=_n('view')
_rz(z,o0,'class',40,e,s,gg)
cs.pop()
_(oX,o0)
cs.pop()
_(oH,oX)
cs.pop()
}
else{oH.wxVkey=2
cs.push("./pages/ans/ans.wxml:block:1:1464")
cs.push("./pages/ans/ans.wxml:view:1:1479")
var cAB=_n('view')
_rz(z,cAB,'class',41,e,s,gg)
var oBB=_v()
_(cAB,oBB)
cs.push("./pages/ans/ans.wxml:block:1:1515")
var lCB=function(tEB,aDB,eFB,gg){
cs.push("./pages/ans/ans.wxml:block:1:1515")
cs.push("./pages/ans/ans.wxml:view:1:1585")
var oHB=_mz(z,'view',['bindtap',46,'class',1,'data-event-opts',2],[],tEB,aDB,gg)
var xIB=_oz(z,49,tEB,aDB,gg)
_(oHB,xIB)
cs.pop()
_(eFB,oHB)
cs.pop()
return eFB
}
oBB.wxXCkey=2
_2z(z,44,lCB,e,s,gg,oBB,'v','k','k')
cs.pop()
cs.push("./pages/ans/ans.wxml:view:1:1729")
var oJB=_n('view')
_rz(z,oJB,'class',50,e,s,gg)
cs.pop()
_(cAB,oJB)
cs.push("./pages/ans/ans.wxml:view:1:1769")
var fKB=_n('view')
_rz(z,fKB,'class',51,e,s,gg)
cs.pop()
_(cAB,fKB)
cs.push("./pages/ans/ans.wxml:view:1:1809")
var cLB=_n('view')
_rz(z,cLB,'class',52,e,s,gg)
cs.pop()
_(cAB,cLB)
cs.push("./pages/ans/ans.wxml:view:1:1849")
var hMB=_n('view')
_rz(z,hMB,'class',53,e,s,gg)
cs.pop()
_(cAB,hMB)
cs.push("./pages/ans/ans.wxml:view:1:1889")
var oNB=_n('view')
_rz(z,oNB,'class',54,e,s,gg)
cs.pop()
_(cAB,oNB)
cs.pop()
_(oH,cAB)
cs.pop()
}
cs.push("./pages/ans/ans.wxml:view:1:1944")
var cOB=_mz(z,'view',['bindtap',55,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/ans/ans.wxml:text:1:2080")
var oPB=_n('text')
_rz(z,oPB,'class',58,e,s,gg)
var lQB=_oz(z,59,e,s,gg)
_(oPB,lQB)
cs.pop()
_(cOB,oPB)
cs.pop()
_(hG,cOB)
cs.push("./pages/ans/ans.wxml:view:1:2136")
var aRB=_n('view')
_rz(z,aRB,'class',60,e,s,gg)
cs.push("./pages/ans/ans.wxml:text:1:2175")
var tSB=_n('text')
_rz(z,tSB,'class',61,e,s,gg)
var eTB=_oz(z,62,e,s,gg)
_(tSB,eTB)
cs.pop()
_(aRB,tSB)
cs.pop()
_(hG,aRB)
oH.wxXCkey=1
cs.pop()
_(xC,hG)
cs.pop()
}
else{xC.wxVkey=2
cs.push("./pages/ans/ans.wxml:block:1:2268")
var bUB=_v()
_(xC,bUB)
if(_oz(z,63,e,s,gg)){bUB.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:2283")
cs.push("./pages/ans/ans.wxml:view:1:2319")
var oVB=_n('view')
_rz(z,oVB,'class',64,e,s,gg)
cs.push("./pages/ans/ans.wxml:text:1:2357")
var xWB=_mz(z,'text',['class',65,'space',1],[],e,s,gg)
var oXB=_oz(z,67,e,s,gg)
_(xWB,oXB)
cs.pop()
_(oVB,xWB)
cs.push("./pages/ans/ans.wxml:text:1:2448")
var fYB=_n('text')
_rz(z,fYB,'class',68,e,s,gg)
var cZB=_oz(z,69,e,s,gg)
_(fYB,cZB)
cs.pop()
_(oVB,fYB)
cs.push("./pages/ans/ans.wxml:view:1:2507")
var h1B=_n('view')
_rz(z,h1B,'class',70,e,s,gg)
var o2B=_v()
_(h1B,o2B)
cs.push("./pages/ans/ans.wxml:block:1:2553")
var c3B=function(l5B,o4B,a6B,gg){
cs.push("./pages/ans/ans.wxml:block:1:2553")
cs.push("./pages/ans/ans.wxml:view:1:2622")
var e8B=_mz(z,'view',['bindtap',75,'class',1,'data-event-opts',2],[],l5B,o4B,gg)
cs.push("./pages/ans/ans.wxml:text:1:2719")
var o0B=_n('text')
_rz(z,o0B,'class',78,l5B,o4B,gg)
var xAC=_oz(z,79,l5B,o4B,gg)
_(o0B,xAC)
cs.pop()
_(e8B,o0B)
var b9B=_v()
_(e8B,b9B)
if(_oz(z,80,l5B,o4B,gg)){b9B.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:3094")
cs.push("./pages/ans/ans.wxml:image:1:3131")
var oBC=_mz(z,'image',['class',81,'src',1],[],l5B,o4B,gg)
cs.pop()
_(b9B,oBC)
cs.pop()
}
var fCC=_v()
_(e8B,fCC)
cs.push("./pages/ans/ans.wxml:block:1:3222")
var cDC=function(oFC,hEC,cGC,gg){
cs.push("./pages/ans/ans.wxml:block:1:3222")
var lIC=_v()
_(cGC,lIC)
if(_oz(z,87,oFC,hEC,gg)){lIC.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:3299")
cs.push("./pages/ans/ans.wxml:image:1:3334")
var aJC=_mz(z,'image',['class',88,'src',1],[],oFC,hEC,gg)
cs.pop()
_(lIC,aJC)
cs.pop()
}
lIC.wxXCkey=1
cs.pop()
return cGC
}
fCC.wxXCkey=2
_2z(z,85,cDC,l5B,o4B,gg,fCC,'c','__i0__','*this')
cs.pop()
b9B.wxXCkey=1
cs.pop()
_(a6B,e8B)
cs.pop()
return a6B
}
o2B.wxXCkey=2
_2z(z,73,c3B,e,s,gg,o2B,'k','i','i')
cs.pop()
cs.pop()
_(oVB,h1B)
cs.push("./pages/ans/ans.wxml:view:1:3455")
var tKC=_mz(z,'view',['bindtap',90,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/ans/ans.wxml:text:1:3591")
var eLC=_n('text')
_rz(z,eLC,'class',93,e,s,gg)
var bMC=_oz(z,94,e,s,gg)
_(eLC,bMC)
cs.pop()
_(tKC,eLC)
cs.pop()
_(oVB,tKC)
cs.push("./pages/ans/ans.wxml:view:1:3647")
var oNC=_n('view')
_rz(z,oNC,'class',95,e,s,gg)
cs.push("./pages/ans/ans.wxml:text:1:3686")
var xOC=_n('text')
_rz(z,xOC,'class',96,e,s,gg)
var oPC=_oz(z,97,e,s,gg)
_(xOC,oPC)
cs.pop()
_(oNC,xOC)
cs.pop()
_(oVB,oNC)
cs.pop()
_(bUB,oVB)
cs.pop()
}
else{bUB.wxVkey=2
cs.push("./pages/ans/ans.wxml:block:1:3779")
var fQC=_v()
_(bUB,fQC)
if(_oz(z,98,e,s,gg)){fQC.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:3794")
cs.push("./pages/ans/ans.wxml:view:1:3830")
var cRC=_n('view')
_rz(z,cRC,'class',99,e,s,gg)
cs.push("./pages/ans/ans.wxml:text:1:3868")
var oTC=_mz(z,'text',['class',100,'space',1],[],e,s,gg)
var cUC=_oz(z,102,e,s,gg)
_(oTC,cUC)
cs.pop()
_(cRC,oTC)
cs.push("./pages/ans/ans.wxml:text:1:3959")
var oVC=_n('text')
_rz(z,oVC,'class',103,e,s,gg)
var lWC=_oz(z,104,e,s,gg)
_(oVC,lWC)
cs.pop()
_(cRC,oVC)
var hSC=_v()
_(cRC,hSC)
if(_oz(z,105,e,s,gg)){hSC.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:4018")
cs.push("./pages/ans/ans.wxml:view:1:4046")
var aXC=_mz(z,'view',['bindtap',106,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/ans/ans.wxml:label:1:4153")
var tYC=_n('label')
_rz(z,tYC,'class',109,e,s,gg)
var eZC=_oz(z,110,e,s,gg)
_(tYC,eZC)
cs.pop()
_(aXC,tYC)
cs.pop()
_(hSC,aXC)
cs.pop()
}
else{hSC.wxVkey=2
cs.push("./pages/ans/ans.wxml:block:1:4219")
var b1C=_v()
_(hSC,b1C)
cs.push("./pages/ans/ans.wxml:block:1:4234")
var o2C=function(o4C,x3C,f5C,gg){
cs.push("./pages/ans/ans.wxml:block:1:4234")
cs.push("./pages/ans/ans.wxml:view:1:4314")
var h7C=_n('view')
_rz(z,h7C,'class',115,o4C,x3C,gg)
var o8C=_v()
_(h7C,o8C)
if(_oz(z,116,o4C,x3C,gg)){o8C.wxVkey=1
cs.push("./pages/ans/ans.wxml:block:1:4344")
cs.push("./pages/ans/ans.wxml:label:1:4376")
var c9C=_mz(z,'label',['class',117,'style',1],[],o4C,x3C,gg)
var o0C=_oz(z,119,o4C,x3C,gg)
_(c9C,o0C)
cs.pop()
_(o8C,c9C)
cs.pop()
}
o8C.wxXCkey=1
cs.pop()
_(f5C,h7C)
cs.pop()
return f5C
}
b1C.wxXCkey=2
_2z(z,113,o2C,e,s,gg,b1C,'t','k','k')
cs.pop()
cs.pop()
}
hSC.wxXCkey=1
cs.pop()
_(fQC,cRC)
cs.pop()
}
else{fQC.wxVkey=2
cs.push("./pages/ans/ans.wxml:block:1:4496")
cs.push("./pages/ans/ans.wxml:view:1:4511")
var lAD=_n('view')
_rz(z,lAD,'class',120,e,s,gg)
cs.push("./pages/ans/ans.wxml:view:1:4549")
var aBD=_mz(z,'view',['class',121,'style',1],[],e,s,gg)
cs.pop()
_(lAD,aBD)
cs.push("./pages/ans/ans.wxml:text:1:4606")
var tCD=_n('text')
_rz(z,tCD,'class',123,e,s,gg)
var eDD=_oz(z,124,e,s,gg)
_(tCD,eDD)
cs.pop()
_(lAD,tCD)
cs.pop()
_(fQC,lAD)
cs.pop()
}
fQC.wxXCkey=1
cs.pop()
}
bUB.wxXCkey=1
cs.pop()
}
xC.wxXCkey=1
cs.pop()
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
cs.push("./pages/index/index.wxml:view:1:1")
var oFD=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./pages/index/index.wxml:view:1:54")
var fID=_n('view')
_rz(z,fID,'class',2,e,s,gg)
cs.push("./pages/index/index.wxml:view:1:87")
var cJD=_n('view')
_rz(z,cJD,'class',3,e,s,gg)
cs.pop()
_(fID,cJD)
cs.push("./pages/index/index.wxml:image:1:140")
var hKD=_mz(z,'image',['class',4,'src',1],[],e,s,gg)
cs.pop()
_(fID,hKD)
cs.pop()
_(oFD,fID)
var xGD=_v()
_(oFD,xGD)
if(_oz(z,6,e,s,gg)){xGD.wxVkey=1
cs.push("./pages/index/index.wxml:block:1:218")
cs.push("./pages/index/index.wxml:view:1:245")
var oLD=_n('view')
_rz(z,oLD,'class',7,e,s,gg)
cs.push("./pages/index/index.wxml:view:1:281")
var cMD=_n('view')
_rz(z,cMD,'class',8,e,s,gg)
var oND=_oz(z,9,e,s,gg)
_(cMD,oND)
cs.pop()
_(oLD,cMD)
cs.push("./pages/index/index.wxml:view:1:336")
var lOD=_n('view')
_rz(z,lOD,'class',10,e,s,gg)
cs.push("./pages/index/index.wxml:view:1:371")
var aPD=_n('view')
_rz(z,aPD,'class',11,e,s,gg)
cs.push("./pages/index/index.wxml:input:1:407")
var tQD=_mz(z,'input',['bindinput',12,'class',1,'data-event-opts',2,'placeholder',3,'type',4,'value',5],[],e,s,gg)
cs.pop()
_(aPD,tQD)
cs.pop()
_(lOD,aPD)
cs.pop()
_(oLD,lOD)
cs.push("./pages/index/index.wxml:view:1:603")
var eRD=_mz(z,'view',['bindtap',18,'class',1,'data-event-opts',2],[],e,s,gg)
var bSD=_oz(z,21,e,s,gg)
_(eRD,bSD)
cs.pop()
_(oLD,eRD)
cs.pop()
_(xGD,oLD)
cs.pop()
}
else{xGD.wxVkey=2
cs.push("./pages/index/index.wxml:block:1:735")
var oTD=_v()
_(xGD,oTD)
if(_oz(z,22,e,s,gg)){oTD.wxVkey=1
cs.push("./pages/index/index.wxml:block:1:750")
cs.push("./pages/index/index.wxml:view:1:777")
var xUD=_n('view')
_rz(z,xUD,'class',23,e,s,gg)
cs.push("./pages/index/index.wxml:text:1:818")
var oVD=_n('text')
_rz(z,oVD,'class',24,e,s,gg)
var fWD=_oz(z,25,e,s,gg)
_(oVD,fWD)
cs.pop()
_(xUD,oVD)
cs.pop()
_(oTD,xUD)
cs.pop()
}
oTD.wxXCkey=1
cs.pop()
}
var oHD=_v()
_(oFD,oHD)
if(_oz(z,26,e,s,gg)){oHD.wxVkey=1
cs.push("./pages/index/index.wxml:block:1:885")
cs.push("./pages/index/index.wxml:view:1:912")
var cXD=_n('view')
_rz(z,cXD,'class',27,e,s,gg)
cs.push("./pages/index/index.wxml:view:1:948")
var oZD=_n('view')
_rz(z,oZD,'class',28,e,s,gg)
var c1D=_oz(z,29,e,s,gg)
_(oZD,c1D)
cs.pop()
_(cXD,oZD)
cs.push("./pages/index/index.wxml:view:1:1003")
var o2D=_n('view')
_rz(z,o2D,'class',30,e,s,gg)
cs.push("./pages/index/index.wxml:view:1:1039")
var l3D=_mz(z,'view',['class',31,'style',1],[],e,s,gg)
cs.pop()
_(o2D,l3D)
cs.push("./pages/index/index.wxml:text:1:1141")
var a4D=_n('text')
_rz(z,a4D,'class',33,e,s,gg)
var t5D=_oz(z,34,e,s,gg)
_(a4D,t5D)
cs.pop()
_(o2D,a4D)
cs.push("./pages/index/index.wxml:text:1:1206")
var e6D=_n('text')
_rz(z,e6D,'class',35,e,s,gg)
var b7D=_oz(z,36,e,s,gg)
_(e6D,b7D)
cs.pop()
_(o2D,e6D)
cs.push("./pages/index/index.wxml:text:1:1269")
var o8D=_n('text')
_rz(z,o8D,'class',37,e,s,gg)
var x9D=_oz(z,38,e,s,gg)
_(o8D,x9D)
cs.pop()
_(o2D,o8D)
cs.push("./pages/index/index.wxml:text:1:1334")
var o0D=_n('text')
_rz(z,o0D,'class',39,e,s,gg)
var fAE=_oz(z,40,e,s,gg)
_(o0D,fAE)
cs.pop()
_(o2D,o0D)
cs.pop()
_(cXD,o2D)
cs.push("./pages/index/index.wxml:view:1:1405")
var cBE=_n('view')
_rz(z,cBE,'class',41,e,s,gg)
cs.push("./pages/index/index.wxml:text:1:1441")
var hCE=_n('text')
_rz(z,hCE,'class',42,e,s,gg)
var oDE=_oz(z,43,e,s,gg)
_(hCE,oDE)
cs.pop()
_(cBE,hCE)
cs.push("./pages/index/index.wxml:image:1:1532")
var cEE=_mz(z,'image',['mode',-1,'bindtap',44,'class',1,'data-event-opts',2,'src',3],[],e,s,gg)
cs.pop()
_(cBE,cEE)
cs.pop()
_(cXD,cBE)
var hYD=_v()
_(cXD,hYD)
if(_oz(z,48,e,s,gg)){hYD.wxVkey=1
cs.push("./pages/index/index.wxml:block:1:1683")
cs.push("./pages/index/index.wxml:view:1:1710")
var oFE=_mz(z,'view',['bindtap',49,'class',1,'data-event-opts',2],[],e,s,gg)
var lGE=_oz(z,52,e,s,gg)
_(oFE,lGE)
cs.pop()
_(hYD,oFE)
cs.pop()
}
else{hYD.wxVkey=2
cs.push("./pages/index/index.wxml:block:1:1844")
cs.push("./pages/index/index.wxml:view:1:1859")
var aHE=_n('view')
_rz(z,aHE,'class',53,e,s,gg)
cs.push("./pages/index/index.wxml:text:1:1896")
var tIE=_n('text')
_rz(z,tIE,'class',54,e,s,gg)
var eJE=_oz(z,55,e,s,gg)
_(tIE,eJE)
cs.pop()
_(aHE,tIE)
cs.pop()
_(hYD,aHE)
cs.pop()
}
hYD.wxXCkey=1
cs.pop()
_(oHD,cXD)
cs.pop()
}
xGD.wxXCkey=1
oHD.wxXCkey=1
cs.pop()
_(r,oFD)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
cs.push("./pages/info/info.wxml:view:1:1")
var oLE=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./pages/info/info.wxml:view:1:51")
var xME=_n('view')
_rz(z,xME,'class',2,e,s,gg)
cs.push("./pages/info/info.wxml:view:1:84")
var oNE=_n('view')
_rz(z,oNE,'class',3,e,s,gg)
cs.pop()
_(xME,oNE)
cs.push("./pages/info/info.wxml:image:1:137")
var fOE=_mz(z,'image',['class',4,'src',1],[],e,s,gg)
cs.pop()
_(xME,fOE)
cs.pop()
_(oLE,xME)
cs.push("./pages/info/info.wxml:view:1:220")
var cPE=_n('view')
_rz(z,cPE,'class',6,e,s,gg)
cs.push("./pages/info/info.wxml:view:1:258")
var hQE=_n('view')
_rz(z,hQE,'class',7,e,s,gg)
var oRE=_oz(z,8,e,s,gg)
_(hQE,oRE)
cs.pop()
_(cPE,hQE)
cs.push("./pages/info/info.wxml:text:1:313")
var cSE=_mz(z,'text',['class',9,'space',1,'style',2],[],e,s,gg)
var oTE=_oz(z,12,e,s,gg)
_(cSE,oTE)
cs.pop()
_(cPE,cSE)
cs.push("./pages/info/info.wxml:text:1:461")
var lUE=_mz(z,'text',['class',13,'style',1],[],e,s,gg)
var aVE=_oz(z,15,e,s,gg)
_(lUE,aVE)
cs.pop()
_(cPE,lUE)
cs.push("./pages/info/info.wxml:text:1:586")
var tWE=_mz(z,'text',['class',16,'style',1],[],e,s,gg)
var eXE=_oz(z,18,e,s,gg)
_(tWE,eXE)
cs.pop()
_(cPE,tWE)
cs.push("./pages/info/info.wxml:view:1:713")
var bYE=_n('view')
_rz(z,bYE,'class',19,e,s,gg)
var oZE=_v()
_(bYE,oZE)
cs.push("./pages/info/info.wxml:block:1:748")
var x1E=function(f3E,o2E,c4E,gg){
cs.push("./pages/info/info.wxml:block:1:748")
cs.push("./pages/info/info.wxml:view:1:828")
var o6E=_n('view')
_rz(z,o6E,'class',24,f3E,o2E,gg)
cs.push("./pages/info/info.wxml:text:1:907")
var c7E=_mz(z,'text',['class',25,'style',1],[],f3E,o2E,gg)
var o8E=_oz(z,27,f3E,o2E,gg)
_(c7E,o8E)
cs.pop()
_(o6E,c7E)
cs.push("./pages/info/info.wxml:text:1:979")
var l9E=_n('text')
_rz(z,l9E,'class',28,f3E,o2E,gg)
var a0E=_oz(z,29,f3E,o2E,gg)
_(l9E,a0E)
cs.pop()
_(o6E,l9E)
cs.push("./pages/info/info.wxml:text:1:1054")
var tAF=_n('text')
_rz(z,tAF,'class',30,f3E,o2E,gg)
var eBF=_oz(z,31,f3E,o2E,gg)
_(tAF,eBF)
cs.pop()
_(o6E,tAF)
cs.pop()
_(c4E,o6E)
cs.pop()
return c4E
}
oZE.wxXCkey=2
_2z(z,22,x1E,e,s,gg,oZE,'t','__i0__','id')
cs.pop()
cs.pop()
_(cPE,bYE)
cs.pop()
_(oLE,cPE)
cs.pop()
_(r,oLE)
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
cs=[]
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{
env=window.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(window.__webview_engine_version__)=='undefined'|| window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(cs, env);
console.log(err)
throw err
}
return root;
}
}
}


var BASE_DEVICE_WIDTH = 750;
var isIOS=navigator.userAgent.match("iPhone");
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth = window.__checkDeviceWidth__ || function() {
var newDeviceWidth = window.screen.width || 375
var newDeviceDPR = window.devicePixelRatio || 2
var newDeviceHeight = window.screen.height || 375
if (window.screen.orientation && /^landscape/.test(window.screen.orientation.type || '')) newDeviceWidth = newDeviceHeight
if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
deviceWidth = newDeviceWidth
deviceDPR = newDeviceDPR
}
}
checkDeviceWidth()
var eps = 1e-4;
var transformRPX = window.__transformRpx__ || function(number, newDeviceWidth) {
if ( number === 0 ) return 0;
number = number / BASE_DEVICE_WIDTH * ( newDeviceWidth || deviceWidth );
number = Math.floor(number + eps);
if (number === 0) {
if (deviceDPR === 1 || !isIOS) {
return 1;
} else {
return 0.5;
}
}
return number;
}
var setCssToHead = function(file, _xcInvalid, info) {
var Ca = {};
var css_id;
var info = info || {};
var _C= [[[2,1],],[".",[1],"fs26 { font-size: ",[0,26],"; }\n.",[1],"fs28 { font-size: ",[0,28],"; }\n.",[1],"fs30 { font-size: ",[0,30],"; }\n.",[1],"ts36 { font-size: ",[0,36],"; }\n.",[1],"c8c { color: #8C8C8C; }\n",],];
function makeup(file, opt) {
var _n = typeof(file) === "number";
if ( _n && Ca.hasOwnProperty(file)) return "";
if ( _n ) Ca[file] = 1;
var ex = _n ? _C[file] : file;
var res="";
for (var i = ex.length - 1; i >= 0; i--) {
var content = ex[i];
if (typeof(content) === "object")
{
var op = content[0];
if ( op == 0 )
res = transformRPX(content[1], opt.deviceWidth) + "px" + res;
else if ( op == 1)
res = opt.suffix + res;
else if ( op == 2 ) 
res = makeup(content[1], opt) + res;
}
else
res = content + res
}
return res;
}
var rewritor = function(suffix, opt, style){
opt = opt || {};
suffix = suffix || "";
opt.suffix = suffix;
if ( opt.allowIllegalSelector != undefined && _xcInvalid != undefined )
{
if ( opt.allowIllegalSelector )
console.warn( "For developer:" + _xcInvalid );
else
{
console.error( _xcInvalid + "This wxss file is ignored." );
return;
}
}
Ca={};
css = makeup(file, opt);
if ( !style ) 
{
var head = document.head || document.getElementsByTagName('head')[0];
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
style = document.createElement('style');
style.type = 'text/css';
style.setAttribute( "wxss:path", info.path );
head.appendChild(style);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, style);
});
}
if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
if ( style.childNodes.length == 0 )
style.appendChild(document.createTextNode(css));
else 
style.childNodes[0].nodeValue = css;
}
}
return rewritor;
}
setCssToHead([])();setCssToHead([[2,0]],undefined,{path:"./app.wxss"})();

__wxAppCode__['app.wxss']=setCssToHead([[2,0]],undefined,{path:"./app.wxss"});    
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['pages/ans/ans.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"root.",[1],"data-v-06ef4ac2 { position: relative; width: ",[0,1202],"; height: ",[0,706],"; overflow: hidden; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n.",[1],"root .",[1],"bg.",[1],"data-v-06ef4ac2 { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }\n.",[1],"root .",[1],"bg .",[1],"view_navigation.",[1],"data-v-06ef4ac2 { height: ",[0,25],"; }\n.",[1],"root .",[1],"bg .",[1],"logo.",[1],"data-v-06ef4ac2 { height: calc(100% - ",[0,25],"); width: 100%; }\n.",[1],"root .",[1],"content.",[1],"data-v-06ef4ac2 { width: ",[0,850],"; height: 100%; z-index: 2; position: relative; top: ",[0,25],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"root .",[1],"content .",[1],"ched.",[1],"data-v-06ef4ac2 { opacity: 0.3; }\n.",[1],"root .",[1],"content .",[1],"qiangda.",[1],"data-v-06ef4ac2 { margin-top: ",[0,30],"; width: ",[0,300],"; height: ",[0,300],"; border-radius: ",[0,150],"; background-color: #FAAD14; color: white; border: solid ",[0,10]," #FFDD8A; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-sizing: border-box; box-sizing: border-box; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"root .",[1],"content .",[1],"ans.",[1],"data-v-06ef4ac2 { margin-top: ",[0,14],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; position: relative; left: ",[0,80],"; }\n.",[1],"root .",[1],"content .",[1],"ans .",[1],"one.",[1],"data-v-06ef4ac2 { width: ",[0,60],"; height: ",[0,60],"; border-radius: ",[0,5],"; margin-right: ",[0,30],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; color: #FBAF18; font-size: 36px; }\n.",[1],"root .",[1],"content .",[1],"ans .",[1],"no.",[1],"data-v-06ef4ac2 { border: ",[0,2]," solid rgba(0, 0, 0, 0.4); }\n.",[1],"root .",[1],"content .",[1],"ans .",[1],"ch.",[1],"data-v-06ef4ac2 { border: ",[0,2]," solid rgba(251, 175, 24, 0.7); -webkit-box-shadow: 0 0 ",[0,30]," ",[0,2]," #FBAF18; box-shadow: 0 0 ",[0,30]," ",[0,2]," #FBAF18; }\n.",[1],"root .",[1],"content .",[1],"ans .",[1],"del_img.",[1],"data-v-06ef4ac2 { width: ",[0,150],"; height: ",[0,75],"; }\n.",[1],"root .",[1],"content .",[1],"ans .",[1],"del_img wx-image.",[1],"data-v-06ef4ac2 { width: 100%; height: 100%; }\n.",[1],"root .",[1],"content .",[1],"daan.",[1],"data-v-06ef4ac2 { width: ",[0,360],"; height: ",[0,360],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; position: relative; }\n.",[1],"root .",[1],"content .",[1],"daan .",[1],"one.",[1],"data-v-06ef4ac2 { width: calc(100% / 3); height: calc(100% / 3); font-size: ",[0,36],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"root .",[1],"content .",[1],"daan .",[1],"b1.",[1],"data-v-06ef4ac2 { width: ",[0,3],"; height: 100%; background-color: #707070; opacity: 0.3; position: absolute; left: calc(100% / 3); }\n.",[1],"root .",[1],"content .",[1],"daan .",[1],"b2.",[1],"data-v-06ef4ac2 { width: ",[0,3],"; height: 100%; background-color: #707070; opacity: 0.3; position: absolute; left: calc(100% / 3 * 2); }\n.",[1],"root .",[1],"content .",[1],"daan .",[1],"b3.",[1],"data-v-06ef4ac2 { width: 100%; height: ",[0,1],"; background-color: #707070; opacity: 0.3; position: absolute; top: calc(100% / 3); }\n.",[1],"root .",[1],"content .",[1],"daan .",[1],"b4.",[1],"data-v-06ef4ac2 { width: 100%; height: ",[0,1],"; background-color: #707070; opacity: 0.3; position: absolute; top: calc(100% / 3 * 2); }\n.",[1],"root .",[1],"content .",[1],"daan2.",[1],"data-v-06ef4ac2 { width: ",[0,480],"; height: ",[0,360],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; position: relative; }\n.",[1],"root .",[1],"content .",[1],"daan2 .",[1],"one.",[1],"data-v-06ef4ac2 { width: ",[0,120],"; height: ",[0,120],"; font-size: ",[0,36],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"root .",[1],"content .",[1],"daan2 .",[1],"b1.",[1],"data-v-06ef4ac2 { width: ",[0,3],"; height: 100%; background-color: #707070; opacity: 0.3; position: absolute; left: ",[0,120],"; }\n.",[1],"root .",[1],"content .",[1],"daan2 .",[1],"b2.",[1],"data-v-06ef4ac2 { width: ",[0,3],"; height: 100%; background-color: #707070; opacity: 0.3; position: absolute; left: ",[0,240],"; }\n.",[1],"root .",[1],"content .",[1],"daan2 .",[1],"b5.",[1],"data-v-06ef4ac2 { width: ",[0,3],"; height: 100%; background-color: #707070; opacity: 0.3; position: absolute; left: ",[0,360],"; }\n.",[1],"root .",[1],"content .",[1],"daan2 .",[1],"b3.",[1],"data-v-06ef4ac2 { width: 100%; height: ",[0,1],"; background-color: #707070; opacity: 0.3; position: absolute; top: calc(100% / 3); }\n.",[1],"root .",[1],"content .",[1],"daan2 .",[1],"b4.",[1],"data-v-06ef4ac2 { width: 100%; height: ",[0,1],"; background-color: #707070; opacity: 0.3; position: absolute; top: calc(100% / 3 * 2); }\n.",[1],"root .",[1],"content .",[1],"xuanzedaan.",[1],"data-v-06ef4ac2 { width: 80%; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; height: ",[0,400],"; }\n.",[1],"root .",[1],"content .",[1],"xuanzedaan .",[1],"one.",[1],"data-v-06ef4ac2 { position: relative; width: 40%; margin-top: ",[0,10],"; margin-left: ",[0,50],"; }\n.",[1],"root .",[1],"content .",[1],"xuanzedaan .",[1],"one .",[1],"ch_img.",[1],"data-v-06ef4ac2 { position: absolute; width: ",[0,62],"; height: ",[0,62],"; left: ",[0,-20],"; top: ",[0,-6],"; }\n.",[1],"root .",[1],"content .",[1],"sure_btn.",[1],"data-v-06ef4ac2 { position: absolute; bottom: ",[0,60],"; width: ",[0,300],"; height: ",[0,80],"; background: -webkit-gradient(linear, right top, left top, from(#faad14), to(#ffc144)); background: -o-linear-gradient(right, #faad14 0%, #ffc144 100%); background: linear-gradient(270deg, #faad14 0%, #ffc144 100%); color: #FFFFFF; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #faae16; box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #faae16; border-radius: ",[0,50],"; font-size: ",[0,30],"; }\n.",[1],"root .",[1],"content .",[1],"subed_btn.",[1],"data-v-06ef4ac2 { position: absolute; bottom: ",[0,60],"; width: ",[0,300],"; height: ",[0,80],"; background: -webkit-gradient(linear, right top, left top, from(#8c8c8c), to(#919191)); background: -o-linear-gradient(right, #8c8c8c 0%, #919191 100%); background: linear-gradient(270deg, #8c8c8c 0%, #919191 100%); color: #FFFFFF; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #8c8c8c; box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #8c8c8c; border-radius: ",[0,50],"; font-size: ",[0,30],"; color: #ffffff; }\n.",[1],"root .",[1],"content .",[1],"daojishi.",[1],"data-v-06ef4ac2 { position: absolute; bottom: ",[0,20],"; font-size: ",[0,22],"; z-index: 3; }\n",],undefined,{path:"./pages/ans/ans.wxss"});    
__wxAppCode__['pages/ans/ans.wxml']=$gwx('./pages/ans/ans.wxml');

__wxAppCode__['pages/index/index.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"content.",[1],"data-v-274bc35a { position: relative; width: ",[0,1202],"; height: ",[0,706],"; overflow: hidden; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"content .",[1],"bg.",[1],"data-v-274bc35a { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }\n.",[1],"content .",[1],"bg .",[1],"view_navigation.",[1],"data-v-274bc35a { height: ",[0,25],"; }\n.",[1],"content .",[1],"bg .",[1],"logo.",[1],"data-v-274bc35a { height: calc(100% - ",[0,25],"); width: 100%; }\n.",[1],"content .",[1],"login.",[1],"data-v-274bc35a { width: ",[0,400],"; height: ",[0,600],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; background-color: #ffffff; border-radius: ",[0,20],"; border: ",[0,2]," solid rgba(191, 191, 191, 0.4); -webkit-box-shadow: ",[0,0]," ",[0,10]," ",[0,99]," rgba(0, 0, 0, 0.1); box-shadow: ",[0,0]," ",[0,10]," ",[0,99]," rgba(0, 0, 0, 0.1); z-index: 222; position: relative; }\n.",[1],"content .",[1],"login .",[1],"title.",[1],"data-v-274bc35a { width: ",[0,200],"; background-color: #BFBFBF; color: #ffffff; font-size: ",[0,30],"; text-align: center; }\n.",[1],"content .",[1],"login .",[1],"info.",[1],"data-v-274bc35a { width: 70%; margin-top: ",[0,60],"; }\n.",[1],"content .",[1],"login .",[1],"info .",[1],"shuru.",[1],"data-v-274bc35a { border: 2px solid #bfbfbf; width: 100%; border-radius: ",[0,50],"; font-size: ",[0,30],"; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 0 ",[0,20],"; margin-bottom: ",[0,70],"; }\n.",[1],"content .",[1],"login .",[1],"infos.",[1],"data-v-274bc35a { width: 70%; font-size: ",[0,30],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; margin-top: ",[0,80],"; line-height: ",[0,60],"; }\n.",[1],"content .",[1],"login .",[1],"infos .",[1],"img.",[1],"data-v-274bc35a { width: 40%; padding-top: 40%; background-size: cover; border-radius: ",[0,100],"; }\n.",[1],"content .",[1],"login .",[1],"tishi.",[1],"data-v-274bc35a { font-size: ",[0,18],"; color: #FF0000; position: absolute; bottom: ",[0,5],"; }\n.",[1],"content .",[1],"login .",[1],"tishi wx-image.",[1],"data-v-274bc35a { width: ",[0,24],"; height: ",[0,24],"; position: relative; top: ",[0,6],"; left: ",[0,6],"; }\n.",[1],"content .",[1],"login .",[1],"sure.",[1],"data-v-274bc35a { width: 70%; height: ",[0,80],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; font-size: ",[0,30],"; color: #ffffff; border: ",[0,2]," solid #ffc53d; background: -webkit-gradient(linear, right top, left top, from(#faad14), to(#ffc144)); background: -o-linear-gradient(right, #faad14 0%, #ffc144 100%); background: linear-gradient(270deg, #faad14 0%, #ffc144 100%); -webkit-box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #faae16; box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #faae16; border-radius: ",[0,50],"; position: absolute; bottom: ",[0,40],"; }\n.",[1],"content .",[1],"login .",[1],"issure.",[1],"data-v-274bc35a { color: #FAAD14; font-size: ",[0,36],"; font-weight: 900; }\n.",[1],"content .",[1],"wait.",[1],"data-v-274bc35a { font-size: ",[0,30],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n",],undefined,{path:"./pages/index/index.wxss"});    
__wxAppCode__['pages/index/index.wxml']=$gwx('./pages/index/index.wxml');

__wxAppCode__['pages/info/info.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"root.",[1],"data-v-58e919b4 { position: relative; width: ",[0,1202],"; height: ",[0,706],"; overflow: hidden; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n.",[1],"root .",[1],"bg.",[1],"data-v-58e919b4 { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }\n.",[1],"root .",[1],"bg .",[1],"view_navigation.",[1],"data-v-58e919b4 { height: ",[0,25],"; }\n.",[1],"root .",[1],"bg .",[1],"logo.",[1],"data-v-58e919b4 { height: calc(100% - ",[0,25],"); width: 100%; }\n.",[1],"root .",[1],"content.",[1],"data-v-58e919b4 { width: ",[0,1050],"; height: ",[0,600],"; background-color: #FFFFFF; border-radius: ",[0,20],"; -webkit-box-shadow: ",[0,0]," ",[0,10]," ",[0,99]," rgba(0, 0, 0, 0.16); box-shadow: ",[0,0]," ",[0,10]," ",[0,99]," rgba(0, 0, 0, 0.16); z-index: 2; position: relative; top: ",[0,25],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n.",[1],"root .",[1],"content .",[1],"title.",[1],"data-v-58e919b4 { width: ",[0,200],"; background: -webkit-gradient(linear, right top, left top, from(#faad14), to(#ffc144)); background: -o-linear-gradient(right, #faad14 0%, #ffc144 100%); background: linear-gradient(270deg, #faad14 0%, #ffc144 100%); -webkit-box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #faae16; box-shadow: ",[0,0]," ",[0,3]," ",[0,6]," #faae16; color: #ffffff; font-size: ",[0,30],"; text-align: center; position: absolute; top: 0; }\n.",[1],"root .",[1],"content .",[1],"head_img.",[1],"data-v-58e919b4 { width: ",[0,100],"; height: ",[0,100],"; border-radius: ",[0,50],"; background: #8C8C8C; }\n.",[1],"root .",[1],"content .",[1],"info.",[1],"data-v-58e919b4 { margin-top: ",[0,100],"; width: 100%; height: ",[0,500],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n.",[1],"root .",[1],"content .",[1],"info .",[1],"topicInfo.",[1],"data-v-58e919b4 { width: 9%; height: 25%; margin: ",[0,10]," 0.5%; color: #FFFFFF; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-sizing: border-box; box-sizing: border-box; padding: ",[0,10]," 0; font-size: ",[0,30],"; }\n.",[1],"root .",[1],"content .",[1],"info .",[1],"topicInfo .",[1],"nowr.",[1],"data-v-58e919b4 { white-space: nowrap; }\n.",[1],"root .",[1],"content .",[1],"info .",[1],"right.",[1],"data-v-58e919b4 { background: #52c41a; }\n.",[1],"root .",[1],"content .",[1],"info .",[1],"wrong.",[1],"data-v-58e919b4 { background: #f5222d; }\n",],undefined,{path:"./pages/info/info.wxss"});    
__wxAppCode__['pages/info/info.wxml']=$gwx('./pages/info/info.wxml');

;var __pageFrameEndTime__ = Date.now();
(function() {
        window.UniLaunchWebviewReady = function(isWebviewReady){
          // !isWebviewReady && console.log('launchWebview fallback ready')
          plus.webview.postMessageToUniNView({type: 'UniWebviewReady-' + plus.webview.currentWebview().id}, '__uniapp__service');
        }
        UniLaunchWebviewReady(true);
})();

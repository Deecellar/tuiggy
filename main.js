"use strict";var zigAnalysis;!function(){const e=document.getElementById("status"),t=document.getElementById("sectNav"),n=document.getElementById("listNav"),s=document.getElementById("sectMainPkg"),l=document.getElementById("sectPkgs"),a=document.getElementById("listPkgs"),r=document.getElementById("sectTypes"),i=document.getElementById("listTypes"),c=document.getElementById("sectTests"),o=document.getElementById("listTests"),d=document.getElementById("sectDocTests"),p=document.getElementById("docTestsCode"),u=document.getElementById("sectNamespaces"),h=document.getElementById("listNamespaces"),m=document.getElementById("sectErrSets"),f=document.getElementById("listErrSets"),g=document.getElementById("sectFns"),y=document.getElementById("listFns"),k=document.getElementById("sectFields"),b=document.getElementById("listFields"),x=document.getElementById("sectGlobalVars"),v=document.getElementById("listGlobalVars"),w=document.getElementById("sectValues"),L=document.getElementById("listValues"),_=document.getElementById("fnProto"),E=document.getElementById("fnProtoCode"),A=document.getElementById("sectParams"),z=document.getElementById("listParams"),I=document.getElementById("tldDocs"),H=document.getElementById("sectFnErrors"),N=document.getElementById("listFnErrors"),O=document.getElementById("tableFnErrors"),T=document.getElementById("fnErrorsAnyError"),B=document.getElementById("fnExamples"),D=document.getElementById("fnNoExamples"),C=document.getElementById("declNoRef"),P=document.getElementById("search"),F=document.getElementById("sectSearchResults"),R=document.getElementById("sectSearchAllResultsLink"),S=document.getElementById("docs"),M=document.getElementById("listSearchResults"),j=document.getElementById("sectSearchNoResults"),U=document.getElementById("sectInfo"),V=document.getElementById("privDeclsBox"),q=document.getElementById("tdZigVer"),W=document.getElementById("hdrName"),K=document.getElementById("helpModal"),Z=document.getElementById("searchPlaceholder"),$=document.getElementById("langRefLink");let G=null,J=!0,Q={"&":"&amp;",'"':"&quot;","<":"&lt;",">":"&gt;"},X=function(){let e={};for(let t=0;t<zigAnalysis.typeKinds.length;t+=1)e[zigAnalysis.typeKinds[t]]=t;let t=["Type","Void","Bool","NoReturn","Int","Float","Pointer","Array","Struct","ComptimeFloat","ComptimeInt","Undefined","Null","Optional","ErrorUnion","ErrorSet","Enum","Union","Fn","BoundFn","Opaque","Frame","AnyFrame","Vector","EnumLiteral"];for(let n=0;n<t.length;n+=1)if(null==e[t[n]])throw new Error("No type kind '"+t[n]+"' found");return e}(),Y=function(){for(let e=0;e<zigAnalysis.types.length;e+=1)if(Ye(e).kind==X.Type)return e;throw new Error("No type 'type' found")}(),ee=0,te=1,ne=2,se=3,le=function(){let e=new Array(zigAnalysis.packages.length),t=[{path:[],pkg:zigAnalysis.packages[zigAnalysis.rootPkg]}];for(;0!==t.length;){let n=t.shift();for(let s in n.pkg.table){let l=n.pkg.table[s];if(null!=e[l])continue;let a=zigAnalysis.packages[l];if(null==a)continue;let r=n.path.concat([s]);e[l]=r,t.push({path:r,pkg:a})}}return e}(),ae=null,re=null,ie={showPrivDecls:!1,pkgNames:[],pkgObjs:[],declNames:[],declObjs:[],callName:null},ce="",oe=-1,de=!1,pe=function(){let e=zigAnalysis.packages[zigAnalysis.rootPkg];if(null==e.table.std)return!1;let t=zigAnalysis.packages[e.table.std];return null!=t&&e.file===t.file}();P.disabled=!1,P.addEventListener("keydown",(function(e){switch(qe(e)){case"Enter":let t=$e();Ze(),De();let n=$e();return de=t.join(" ")!==n.join(" "),de||je(),e.preventDefault(),void e.stopPropagation();case"Esc":return void Ue(e);case"Up":return Ve(-1),e.preventDefault(),void e.stopPropagation();case"Down":return Ve(1),e.preventDefault(),void e.stopPropagation();default:if(e.shiftKey||e.ctrlKey||e.altKey)return;return oe=-1,e.stopPropagation(),void Ke()}}),!1),P.addEventListener("focus",(e=>{Z.classList.add("hidden")})),P.addEventListener("blur",(e=>{0==P.value.length&&Z.classList.remove("hidden")})),R.addEventListener("click",(function(e){e.preventDefault(),e.stopPropagation(),J=!1,Ce()}),!1),V.addEventListener("change",(function(){if(this.checked!=ie.showPrivDecls){if(this.checked&&location.hash.length>1&&"*"!=location.hash[1])return void(location.hash="#*"+location.hash.substring(1));if(!this.checked&&location.hash.length>1&&"*"==location.hash[1])return void(location.hash="#"+location.hash.substring(2))}}),!1),""==location.hash&&(location.hash="#root"),K.addEventListener("click",(e=>{"help-modal"==e.target.className&&K.classList.add("hidden")})),window.addEventListener("hashchange",Ce,!1),window.addEventListener("keydown",(function(e){switch(qe(e)){case"Esc":Ue(e);break;case"s":if(K.classList.contains("hidden")){if(e.target==P)break;P.focus(),P.select(),S.scrollTo(0,0),e.preventDefault(),e.stopPropagation(),Ke()}break;case"?":e.preventDefault(),e.stopPropagation(),K.classList.remove("hidden"),K.style.left=window.innerWidth/2-K.clientWidth/2+"px",K.style.top=window.innerHeight/2-K.clientHeight/2+"px",K.focus(),P.blur()}}),!1),Ce();let ue=zigAnalysis.params.zigVersion;function he(e){return"kind"in e&&!("value"in e)}function me(e){return he(e)&&ge(e.kind)}function fe(e){let t=ye({expr:e});if(!("type"in t))return null;let n,s=Ye(t.type);e:for(let e=0;e<1e4;e+=1){switch(s.kind){case X.Optional:case X.Pointer:let e=ye(s.child);if("type"in e){s=Ye(e.type);continue}return null;default:break e}if(9999==e)throw"Exhausted typeShorthandName quota"}if(s.kind===X.Struct)n="struct";else if(s.kind===X.Enum)n="enum";else{if(s.kind!==X.Union)return console.log("TODO: unhalndled case in typeShortName"),null;n="union"}return Re(n)}function ge(e){return e===X.Struct||e===X.Union||e===X.Enum||e===X.Opaque}function ye(e){let t=0;for(;t<1e3;)if(t+=1,"refPath"in e.expr)e={expr:e.expr.refPath[e.expr.refPath.length-1]};else if("declRef"in e.expr)e=Qe(e.expr.declRef).value;else{if(!("as"in e.expr))return e;e={typeRef:zigAnalysis.exprs[e.expr.as.typeRefArg],expr:zigAnalysis.exprs[e.expr.as.exprArg]}}return console.assert(!1),{}}function ke(){if(e.classList.add("hidden"),_.classList.add("hidden"),A.classList.add("hidden"),I.classList.add("hidden"),s.classList.add("hidden"),l.classList.add("hidden"),r.classList.add("hidden"),c.classList.add("hidden"),d.classList.add("hidden"),u.classList.add("hidden"),m.classList.add("hidden"),g.classList.add("hidden"),k.classList.add("hidden"),F.classList.add("hidden"),R.classList.add("hidden"),j.classList.add("hidden"),U.classList.add("hidden"),W.classList.add("hidden"),t.classList.add("hidden"),H.classList.add("hidden"),B.classList.add("hidden"),D.classList.add("hidden"),C.classList.add("hidden"),T.classList.add("hidden"),O.classList.add("hidden"),x.classList.add("hidden"),w.classList.add("hidden"),function(){let e=ie.pkgNames.concat(ie.declNames),t=" - Zig";0===e.length?document.title=pe?"std - Zig":zigAnalysis.params.rootName+t:document.title=e.join(".")+t}(),q.textContent=zigAnalysis.params.zigVersion,U.classList.remove("hidden"),function(){let e=zigAnalysis.packages[zigAnalysis.rootPkg],t=[];for(let n in e.table){let s=e.table[n];null!=zigAnalysis.packages[s]&&(n!=zigAnalysis.params.rootName&&t.push({name:n,pkg:s}))}{let e=s.children[1].children[0].children[0];e.textContent=zigAnalysis.rootPkgName,e.setAttribute("href",Le(zigAnalysis.rootPkg)),zigAnalysis.params.rootName===ie.pkgNames[0]?e.classList.add("active"):e.classList.remove("active"),s.classList.remove("hidden")}if(t.sort((function(e,t){return Be(e.name.toLowerCase(),t.name.toLowerCase())})),0!==t.length){Ee(a,t.length,'<li><a href="#"></a></li>');for(let e=0;e<t.length;e+=1){let n=a.children[e].children[0];n.textContent=t[e].name,n.setAttribute("href",Le(t[e].pkg)),t[e].name===ie.pkgNames[0]?n.classList.add("active"):n.classList.remove("active")}l.classList.remove("hidden")}}(),V.checked=ie.showPrivDecls,""!==ce)return function(){let e=[],t=ce.toLowerCase()===ce,n=$e();e:for(let s=0;s<zigAnalysis.decls.length;s+=1){let l=Fe(s);if(null==l)continue;let a=Qe(s),r=l.pkgNames[l.pkgNames.length-1]+"."+l.declNames.join("."),i=Xe(a.src),c="";null!=i.docs&&(c+="\n"+i.docs);let o=r;t&&(o=o.toLowerCase(),c=c.toLowerCase());let d=0;for(let e=0;e<n.length;e+=1){let t=n[e];if(r!==t)if(a.name!=t)if(o.indexOf(t)>=0)d+=2;else{if(!(c.indexOf(t)>=0))continue e;d+=1}else d+=3;else d+=4}e.push({decl:a,path:l,points:d})}if(0!==e.length){e.sort((function(e,t){let n=Be(t.points,e.points);return 0!=n?n:Be(e.decl.name,t.decl.name)}));let t=!1;const n=200;J&&e.length>n&&(e=e.slice(0,n),t=!0);let s="";for(let t=0;t<e.length;t+=1){const n=e[t],l=n.path.pkgNames[n.path.pkgNames.length-1]+"."+n.path.declNames.join(".");s+='<li><a href="'+we(n.path.pkgNames,n.path.declNames)+'">'+l+"</a></li>"}M.innerHTML=s,t&&R.classList.remove("hidden"),Ge(),F.classList.remove("hidden")}else j.classList.remove("hidden")}();let i=zigAnalysis.packages[zigAnalysis.rootPkg];ie.pkgObjs=[i];for(let e=0;e<ie.pkgNames.length;e+=1){let t=zigAnalysis.packages[i.table[ie.pkgNames[e]]];if(null==t)return ve();i=t,ie.pkgObjs.push(i)}let o=Ye(i.main);ie.declObjs=[o];for(let e=0;e<ie.declNames.length;e+=1){let t=Pe(o,ie.declNames[e]);if(null==t)return ve();let n=ye(t.value).expr;if("type"in n){const e=Ye(n.type);e.kind!=X.Fn&&(t=e)}o=t,ie.declObjs.push(o)}!function(){let e=ie.pkgNames.length+ie.declNames.length;Ee(n,e,'<li><a href="#"></a></li>');let s=[],l=[],a=[];for(let e=0;e<ie.pkgNames.length;e+=1){l.push(ie.pkgNames[e]);let t=ie.pkgNames[e];"root"==t&&(t=zigAnalysis.rootPkgName),s.push({name:t,link:we(l,a)})}for(let e=0;e<ie.declNames.length;e+=1)a.push(ie.declNames[e]),s.push({name:ie.declNames[e],link:we(l,a)});for(let e=0;e<s.length;e+=1){let t=n.children[e].children[0];t.textContent=s[e].name,t.setAttribute("href",s[e].link),e+1==s.length?t.classList.add("active"):t.classList.remove("active")}t.classList.remove("hidden")}();let h=ie.declObjs[ie.declObjs.length-1],f="value"in h;let y=he(h),b=me(h);if(f&&function(e){if(!e.decltest)return;const t=Xe(e.decltest);d.classList.remove("hidden"),p.innerHTML=t.code}(h),b)return Te(h);if(!f&&!y)return function(e){C.classList.remove("hidden");let t=Xe(e.src).docs;I.innerHTML=null!=t?Me(t):"<p>There are no doc comments for this declaration.</p>";I.classList.remove("hidden")}(h);if(y)return function(e){let t;t=pe&&e===Ye(zigAnalysis.packages[zigAnalysis.rootPkg].main)?"std":ze({type:e},!1);null!=t&&""!=t&&(W.innerText=t+" ("+zigAnalysis.typeKinds[e.kind]+")",W.classList.remove("hidden"));e.kind==X.ErrorSet&&He(e)}(h);if(f&&"var"===h.kind)return function(e){let t=typeOfDecl(e);E.innerHTML='<span class="tok-kw">var</span> '+Re(e.name)+": "+typeValueName(t,!0,!0);let n=Xe(e.src).docs;null!=n&&(I.innerHTML=Me(n),I.classList.remove("hidden"));_.classList.remove("hidden")}(h);if(f&&"const"===h.kind){const e=ye(h.value);if("type"in e.expr){if(Ye(e.expr.type).kind===X.Fn)return function(e){if("refPath"in e.value.expr){let t=e.value.expr.refPath.length-1,n=e.value.expr.refPath[t];console.assert("declRef"in n),e=Qe(n.declRef)}let t=ye(e.value);console.assert("type"in t.expr);let n=Ye(t.expr.type);E.innerHTML=ze(t.expr,{wantHtml:!0,wantLink:!0,fnDecl:e});let s=null,l=Xe(e.src);null!=l.docs&&(s=l.docs);!function(e,t){let n=0,s=Xe(e.src),l=s.fields,a=s.varArgs;for(let e=0;e<l.length;e+=1){null!=Xe(l[e]).docs&&(n+=1)}if(0==n)return;Ee(z,n,"<div></div>");let r=0;for(let e=0;e<l.length;e+=1){let n=Xe(l[e]),s=n.docs;if(null==n.docs)continue;let i=""!==s,c=z.children[r];r+=1;let o=t.params[e],d="<pre"+(i?' class="fieldHasDocs"':"")+">"+Re(n.name)+": ";if(a&&e===t.params.length-1)d+="...";else{d+='<span class="tok-kw">'+ze(o,{wantHtml:!1,wantLink:!1})+"</span>"}d+=",</pre>",i&&(d+='<div class="fieldDocs">'+Me(s)+"</div>"),c.innerHTML=d}A.classList.remove("hidden")}(e,n);let a=ye({expr:n.ret}).expr;if("type"in a){let e=a.type,t=null,n=Ye(e);if(n.kind===X.ErrorSet?t=e:n.kind===X.ErrorUnion&&(t=n.err.type),null!=t){He(Ye(t))}}let r=e.src;if(function(e){let t=Ye(e);if(t.kind!==X.Fn)return!1;return null!=t.generic_ret}(t.expr.type)){var i=ye({expr:n.generic_ret});if("call"in i.expr){let e=ye({expr:zigAnalysis.calls[i.expr.call].func});if(!("type"in e.expr))return;let t=Ye(e.expr.type);if(!t.generic_ret)return;i=ye({expr:t.generic_ret})}if("as"in i.expr&&(i={expr:zigAnalysis.exprs[i.expr.as.exprArg]}),!("type"in i.expr))return;const e=Ye(i.expr.type);me(e)&&Te(e)}else B.classList.add("hidden"),D.classList.add("hidden");let c=Xe(r);null==s&&null!=c&&null!=c.docs&&(s=c.docs);null!=s&&(I.innerHTML=Me(s),I.classList.remove("hidden"));_.classList.remove("hidden")}(h)}return function(e){let t=ye(e.value);if(t.expr.fieldRef){const t=Qe(e.value.expr.refPath[0].declRef);E.innerHTML='<span class="tok-kw">const</span> '+Re(e.name)+": "+t.name+" = "+ze(e.value.expr,{wantHtml:!0,wantLink:!0})+";"}else void 0!==t.expr.string||void 0!==t.expr.call||t.expr.comptimeExpr?E.innerHTML='<span class="tok-kw">const</span> '+Re(e.name)+": "+ze(t.expr,{wantHtml:!0,wantLink:!0})+" = "+ze(e.value.expr,{wantHtml:!0,wantLink:!0})+";":t.expr.compileError?E.innerHTML='<span class="tok-kw">const</span> '+Re(e.name)+" = "+ze(e.value.expr,{wantHtml:!0,wantLink:!0})+";":E.innerHTML='<span class="tok-kw">const</span> '+Re(e.name)+": "+ze(t.typeRef,{wantHtml:!0,wantLink:!0})+" = "+ze(e.value.expr,{wantHtml:!0,wantLink:!0})+";";let n=Xe(e.src).docs;null!=n&&(I.innerHTML=Me(n),I.classList.remove("hidden"));_.classList.remove("hidden")}(h)}}function be(e){return Ye(e).kind===X.ErrorSet}function xe(e){let t=Ye(e);return t.kind===X.Struct&&0==t.fields.length}function ve(){e.textContent="404 Not Found",e.classList.remove("hidden")}function we(e,t,n){let s="#";return ie.showPrivDecls&&(s+="*"),0===e.length&&0===t.length?s:0===t.length&&null==n?s+e.join("."):null==n?s+e.join(".")+";"+t.join("."):s+e.join(".")+";"+t.join(".")+";"+n}function Le(e){return we(le[e],[])}function _e(e){return we(ie.pkgNames,ie.declNames.concat([e]))}function Ee(e,t,n){for(let s=e.childElementCount;s<t;s+=1)e.insertAdjacentHTML("beforeend",n);for(;t<e.childElementCount;)e.removeChild(e.lastChild)}function Ae(e){if(e.typeRef)return e.typeRef;let t=ye(e);return e===t?{type:0}:Ae(t)}function ze(e,t){switch(Object.keys(e)[0]){default:throw"this expression is not implemented yet";case"bool":return e.bool?"true":"false";case"&":return"&"+ze(zigAnalysis.exprs[e["&"]]);case"compileError":{let n=e.compileError;return"@compileError("+ze(zigAnalysis.exprs[n],t)+")"}case"enumLiteral":return"."+e.enumLiteral;case"void":return"void";case"slice":{let t="";const n=zigAnalysis.exprs[e.slice.lhs],s=zigAnalysis.exprs[e.slice.start];let l=ze(n),a=ze(s),r="",i="";if(e.slice.end){r+=ze(zigAnalysis.exprs[e.slice.end])}if(e.slice.sentinel){i+=" :"+ze(zigAnalysis.exprs[e.slice.sentinel])}return t+=l+"["+a+".."+r+i+"]",t}case"sliceIndex":return ze(zigAnalysis.exprs[e.sliceIndex],t);case"cmpxchg":{const n=zigAnalysis.exprs[e.cmpxchg.type],s=zigAnalysis.exprs[e.cmpxchg.ptr],l=zigAnalysis.exprs[e.cmpxchg.expected_value],a=zigAnalysis.exprs[e.cmpxchg.new_value],r=zigAnalysis.exprs[e.cmpxchg.success_order],i=zigAnalysis.exprs[e.cmpxchg.failure_order],c=ze(n,t),o=ze(s,t),d=ze(l,t),p=ze(a,t),u=ze(r,t),h=ze(i,t);let m="@";switch(e.cmpxchg.name){case"cmpxchg_strong":m+="cmpxchgStrong";break;case"cmpxchg_weak":m+="cmpxchgWeak";break;default:console.log("There's only cmpxchg_strong and cmpxchg_weak")}return m+"("+c+", "+o+", "+d+", "+p+", ."+u+", ."+h+")"}case"cmpxchgIndex":return ze(zigAnalysis.exprs[e.cmpxchgIndex],t);case"switchOp":{let n=zigAnalysis.exprs[e.switchOp.cond_index],s=Xe(e.switchOp.src),l=e.switchOp.file_name,a=e.switchOp.outer_decl,r=Ye(a),i=0;for(;0!==a&&r.line_number>0;)i+=r.line_number,a=r.outer_decl,r=Ye(a);i+=s.line+1;let c="",o=ze(n,t);return c+="</br>node_name: "+s.name+"</br>file: "+l+"</br>line: "+i+"</br>",c+="switch("+o+') {<a href="/src/'+l+"#L"+i+'">...</a>}',c}case"switchIndex":return ze(zigAnalysis.exprs[e.switchIndex],t);case"refPath":{let t=ze(e.refPath[0]);for(let n=1;n<e.refPath.length;n++){let s;s="string"in e.refPath[n]?e.refPath[n].string:ze(e.refPath[n]),t+="."+s}return t}case"fieldRef":{const n=Xe(ze({type:e.fieldRef.type},t).src).fields[e.fieldRef.index];return Xe(n).name}case"enumToInt":return"@enumToInt("+ze(zigAnalysis.exprs[e.enumToInt],t)+")";case"bitSizeOf":return"@bitSizeOf("+ze(zigAnalysis.exprs[e.bitSizeOf],t)+")";case"sizeOf":return"@sizeOf("+ze(zigAnalysis.exprs[e.sizeOf],t)+")";case"builtinIndex":return ze(zigAnalysis.exprs[e.builtinIndex],t);case"builtin":{let n=ze(zigAnalysis.exprs[e.builtin.param],t),s="@";switch(e.builtin.name){case"align_of":s+="alignOf";break;case"bool_to_int":s+="boolToInt";break;case"embed_file":s+="embedFile";break;case"error_name":s+="errorName";break;case"panic":s+="panic";break;case"set_cold":s+="setCold";break;case"set_runtime_safety":s+="setRuntimeSafety";break;case"sqrt":s+="sqrt";break;case"sin":s+="sin";break;case"cos":s+="cos";break;case"tan":s+="tan";break;case"exp":s+="exp";break;case"exp2":s+="exp2";break;case"log":s+="log";break;case"log2":s+="log2";break;case"log10":s+="log10";break;case"fabs":s+="fabs";break;case"floor":s+="floor";break;case"ceil":s+="ceil";break;case"trunc":s+="trunc";break;case"round":s+="round";break;case"tag_name":s+="tagName";break;case"reify":s+="Type";break;case"type_name":s+="typeName";break;case"frame_type":s+="Frame";break;case"frame_size":s+="frameSize";break;case"ptr_to_int":s+="ptrToInt";break;case"error_to_int":s+="errorToInt";break;case"int_to_error":s+="intToError";break;case"maximum":s+="maximum";break;case"minimum":s+="minimum";break;case"bit_not":return"~"+n;case"clz":return"@clz(T, "+n+")";case"ctz":return"@ctz(T, "+n+")";case"pop_count":return"@popCount(T, "+n+")";case"byte_swap":return"@byteSwap(T, "+n+")";case"bit_reverse":return"@bitReverse(T, "+n+")";default:console.log("builtin function not handled yet or doesn't exist!")}return s+"("+n+")"}case"builtinBinIndex":return ze(zigAnalysis.exprs[e.builtinBinIndex],t);case"builtinBin":{const n=zigAnalysis.exprs[e.builtinBin.lhs],s=zigAnalysis.exprs[e.builtinBin.rhs];let l=ze(n,t),a=ze(s,t),r="@";switch(e.builtinBin.name){case"float_to_int":r+="floatToInt";break;case"int_to_float":r+="intToFloat";break;case"int_to_ptr":r+="intToPtr";break;case"int_to_enum":r+="intToEnum";break;case"float_cast":r+="floatCast";break;case"int_cast":r+="intCast";break;case"ptr_cast":r+="ptrCast";break;case"truncate":r+="truncate";break;case"align_cast":case"align_cast":r+="alignCast";break;case"has_decl":r+="hasDecl";break;case"has_field":r+="hasField";break;case"bit_reverse":r+="bitReverse";break;case"div_exact":r+="divExact";break;case"div_floor":r+="divFloor";break;case"div_trunc":r+="divTrunc";break;case"mod":r+="mod";break;case"rem":case"mod_rem":r+="rem";break;case"shl_exact":r+="shlExact";break;case"shr_exact":r+="shrExact";break;case"bitcast":r+="bitCast";break;case"vector_type":r+="Vector";break;case"reduce":r+="reduce";break;case"splat":r+="splat";break;case"offset_of":r+="offsetOf";break;case"bit_offset_of":r+="bitOffsetOf";break;default:console.log("builtin function not handled yet or doesn't exist!")}return r+"("+l+", "+a+")"}case"binOpIndex":return ze(zigAnalysis.exprs[e.binOpIndex],t);case"binOp":{const n=zigAnalysis.exprs[e.binOp.lhs],s=zigAnalysis.exprs[e.binOp.rhs];let l=ze(n,t),a=ze(s,t),r="",i="";r=n.binOpIndex?"("+l+")":l,i=s.binOpIndex?"("+a+")":a;let c="";switch(e.binOp.name){case"add":c+="+";break;case"addwrap":c+="+%";break;case"add_sat":c+="+|";break;case"sub":c+="-";break;case"subwrap":c+="-%";break;case"sub_sat":c+="-|";break;case"mul":c+="*";break;case"mulwrap":c+="*%";break;case"mul_sat":c+="*|";break;case"div":c+="/";break;case"shl":c+="<<";break;case"shl_sat":c+="<<|";break;case"shr":c+=">>";break;case"bit_or":c+="|";break;case"bit_and":c+="&";break;case"array_cat":c+="++";break;case"array_mul":c+="**";break;case"cmp_eq":c+="==";break;case"cmp_neq":c+="!=";break;case"cmp_gt":c+=">";break;case"cmp_gte":c+=">=";break;case"cmp_lt":c+="<";break;case"cmp_lte":c+="<=";break;default:console.log("operator not handled yet or doesn't exist!")}return r+" "+c+" "+i}case"errorSets":{const n=Ye(e.errorSets);return ze(n.lhs,t)+" || "+ze(n.rhs,t)}case"errorUnion":{const n=Ye(e.errorUnion);return ze(n.lhs,t)+"!"+ze(n.rhs,t)}case"struct":{let n="";n+="."+"{ ";for(let s=0;s<e.struct.length;s++){const l=e.struct[s];n+="."+l.name+" = "+ze(l.val.expr,t),s!==e.struct.length-1?n+=", ":n+=" "}return n+="}",n}case"typeOf_peer":{let t="@TypeOf(";for(let n=0;n<e.typeOf_peer.length;n++){t+=ze(zigAnalysis.exprs[e.typeOf_peer[n]],{wantHtml:!0,wantLink:!0}),n!==e.typeOf_peer.length-1&&(t+=", ")}return t+=")",t}case"alignOf":return"@alignOf("+ze(zigAnalysis.exprs[e.alignOf],{wantHtml:!0,wantLink:!0})+")";case"typeOf":return"@TypeOf("+ze(zigAnalysis.exprs[e.typeOf],{wantHtml:!0,wantLink:!0})+")";case"typeInfo":return"@typeInfo("+ze(zigAnalysis.exprs[e.typeInfo],{wantHtml:!0,wantLink:!0})+")";case"null":return"null";case"array":{let n=".{";for(let s=0;s<e.array.length;s++){0!=s&&(n+=", "),n+=ze(zigAnalysis.exprs[e.array[s]],t)}return n+"}"}case"comptimeExpr":return zigAnalysis.comptimeExprs[e.comptimeExpr].code;case"call":{let n=zigAnalysis.calls[e.call],s="";switch(Object.keys(n.func)[0]){default:throw"TODO";case"declRef":case"refPath":s+=ze(n.func,t)}s+="(";for(let e=0;e<n.args.length;e++)0!=e&&(s+=", "),s+=ze(n.args[e],t);return s+=")",s}case"as":return ze(zigAnalysis.exprs[e.as.exprArg],t);case"declRef":return Qe(e.declRef).name;case"refPath":return e.refPath.map((e=>ze(e,t))).join(".");case"int":return""+e.int;case"float":return""+e.float.toFixed(2);case"float128":return""+e.float128.toFixed(2);case"undefined":return"undefined";case"string":return'"'+Re(e.string)+'"';case"int_big":return(e.int_big.negated?"-":"")+e.int_big.value;case"anytype":return"anytype";case"this":return"@This()";case"type":{let n=e.type;switch("number"==typeof n&&(n=Ye(n)),n.kind){default:throw"TODO";case X.Struct:return n;case X.Enum:return n;case X.Opaque:return n;case X.ComptimeExpr:return"anyopaque";case X.Array:{let e=n,s="[",l=ze(e.len,t),a=e.sentinel?":"+ze(e.sentinel,t):"";return t.wantHtml?s+='<span class="tok-number">'+l+a+"</span>":s+=l+a,s+="]",s+=ze(e.child,t),s}case X.Optional:return"?"+ze(n.child,t);case X.Pointer:{let e=n,s=e.sentinel?":"+ze(e.sentinel,t):"",l=e.is_mutable?"":"const ",a="";switch(e.size){default:console.log("TODO: implement unhandled pointer size case");case ee:a+="*",a+=l;break;case te:a+="[*",a+=s,a+="]",a+=l;break;case ne:e.is_ref&&(a+="*"),a+="[",a+=s,a+="]",a+=l;break;case se:a+="[*c",a+=s,a+="]",a+=l}if(e.is_allowzero&&(a+="allowzero "),e.is_volatile&&(a+="volatile "),e.has_addrspace&&(a+="addrspace(",a+=".",a+=") "),e.has_align){let n=ze(e.align,t);t.wantHtml?a+='<span class="tok-kw">align</span>(':a+="align(",t.wantHtml?a+='<span class="tok-number">'+n+"</span>":a+=n,null!=e.hostIntBytes&&(a+=":",t.wantHtml?a+='<span class="tok-number">'+e.bitOffsetInHost+"</span>":a+=e.bitOffsetInHost,a+=":",t.wantHtml?a+='<span class="tok-number">'+e.hostIntBytes+"</span>":a+=e.hostIntBytes),a+=") "}return a+=ze(e.child,t),a}case X.Float:{let e=n;return t.wantHtml?'<span class="tok-type">'+e.name+"</span>":e.name}case X.Int:{let e=n.name;return t.wantHtml?'<span class="tok-type">'+e+"</span>":e}case X.ComptimeInt:return t.wantHtml?'<span class="tok-type">comptime_int</span>':"comptime_int";case X.ComptimeFloat:return t.wantHtml?'<span class="tok-type">comptime_float</span>':"comptime_float";case X.Type:return t.wantHtml?'<span class="tok-type">type</span>':"type";case X.Bool:return t.wantHtml?'<span class="tok-type">bool</span>':"bool";case X.Void:return t.wantHtml?'<span class="tok-type">void</span>':"void";case X.EnumLiteral:return t.wantHtml?'<span class="tok-type">(enum literal)</span>':"(enum literal)";case X.NoReturn:return t.wantHtml?'<span class="tok-type">noreturn</span>':"noreturn";case X.ErrorSet:{let e=n;if(null==e.fields)return'<span class="tok-type">anyerror</span>';if(0==e.fields.length)return"error{}";if(1==e.fields.length)return"error{"+e.fields[0].name+"}";{let t="error{ "+e.fields[0].name;for(let n=1;n<e.fields.length;n++)t+=", "+e.fields[n].name;return t+=" }",t}}case X.ErrorUnion:{let e=n;return ze(e.lhs,t)+"!"+ze(e.rhs,t)}case X.InferredErrorUnion:return"!"+ze(n.payload,t);case X.Fn:{let e=n,s="";if(t.wantHtml?(e.is_extern&&(s+="pub extern "),e.has_lib_name&&(s+='"'+e.lib_name+'" '),s+='<span class="tok-kw">fn</span>',t.fnDecl&&(s+=' <span class="tok-fn">',t.linkFnNameDecl?s+='<a href="'+t.linkFnNameDecl+'">'+Re(t.fnDecl.name)+"</a>":s+=Re(t.fnDecl.name),s+="</span>")):s+="fn ",s+="(",e.params){let n=null,l=!1,a=Xe(e.src);n=a.fields,l=a.varArgs;for(let a=0;a<e.params.length;a+=1){0!=a&&(s+=", "),s+="<span class='argBreaker'><br>&nbsp;&nbsp;&nbsp;&nbsp;</span>";let r=e.params[a],i=ye({expr:r});if(null!=n){let e=Xe(n[a]);if(e.varArgs){s+="...";continue}e.noalias&&(t.wantHtml?s+='<span class="tok-kw">noalias</span> ':s+="noalias "),e.comptime&&(t.wantHtml?s+='<span class="tok-kw">comptime</span> ':s+="comptime ");let l=e.name;null!=l&&(Ie(i,l)||(s+=l+": "))}if(l&&a===e.params.length-1)s+="...";else if("alignOf"in r)t.wantHtml?(s+='<a href="">',s+='<span class="tok-kw" style="color:lightblue;">'+ze(r,t)+"</span>",s+="</a>"):s+=ze(r,t);else if("typeOf"in r)t.wantHtml?(s+='<a href="">',s+='<span class="tok-kw" style="color:lightblue;">'+ze(r,t)+"</span>",s+="</a>"):s+=ze(r,t);else if("typeOf_peer"in r)t.wantHtml?(s+='<a href="">',s+='<span class="tok-kw" style="color:lightblue;">'+ze(r,t)+"</span>",s+="</a>"):s+=ze(r,t);else if("declRef"in r)t.wantHtml?(s+='<a href="">',s+='<span class="tok-kw" style="color:lightblue;">'+ze(r,t)+"</span>",s+="</a>"):s+=ze(r,t);else if("call"in r)t.wantHtml?(s+='<a href="">',s+='<span class="tok-kw" style="color:lightblue;">'+ze(r,t)+"</span>",s+="</a>"):s+=ze(r,t);else if("refPath"in r)t.wantHtml?(s+='<a href="">',s+='<span class="tok-kw" style="color:lightblue;">'+ze(r,t)+"</span>",s+="</a>"):s+=ze(r,t);else if("type"in r){s+='<span class="tok-kw">'+ze(r,{wantHtml:!1,wantLink:!1,fnDecl:t.fnDecl,linkFnNameDecl:t.linkFnNameDecl})+"</span>"}else if("binOpIndex"in r)s+=ze(r,t);else if("comptimeExpr"in r){let e=zigAnalysis.comptimeExprs[r.comptimeExpr].code;t.wantHtml?s+='<span class="tok-kw">'+e+"</span>":s+=e}else t.wantHtml?s+='<span class="tok-kw">anytype</span>':s+="anytype"}}if(s+="<span class='argBreaker'>,<br></span>",s+=") ",e.has_align){s+="align("+ze(zigAnalysis.exprs[e.align],t)+") "}if(e.has_cc){let t=zigAnalysis.exprs[e.cc];t&&(s+="callconv(."+t.enumLiteral+") ")}return e.is_inferred_error&&(s+="!"),null!=e.ret?s+=ze(e.ret,t):t.wantHtml?s+='<span class="tok-kw">anytype</span>':s+="anytype",s}}}}}function Ie(e,t){let n=ye({expr:e});if("type"in n){let e=Ye(n.type);if(e.kind===X.Pointer){let n=e;if(function(e){return null==e.size?ee:e.size}(n)===ee){const e=ye(n.child);return typeValueName(e,!1,!0).toLowerCase()===t}}}return!1}function He(e){if(null==e.fields)T.classList.remove("hidden");else{let t=[];for(let n=0;n<e.fields.length;n+=1){let s=e.fields[n];t.push(s)}t.sort((function(e,t){return Be(e.name.toLowerCase(),t.name.toLowerCase())})),function(e,t){for(let n=e.childElementCount/2;n<t;n+=1)e.insertAdjacentHTML("beforeend","<dt></dt><dd></dd>");for(;t<e.childElementCount/2;)e.removeChild(e.lastChild),e.removeChild(e.lastChild)}(N,t.length);for(let e=0;e<t.length;e+=1){let n=N.children[2*e+0],s=N.children[2*e+1];n.textContent=t[e].name;let l=t[e].docs;null!=l?s.innerHTML=Me(l):s.textContent=""}O.classList.remove("hidden")}H.classList.remove("hidden")}function Ne(e,t,n,s,l,a,r,i){for(let i=0;i<e.length;i+=1){let c=Qe(e[i]),o=ye(c.value);if("var"!==c.kind){if("const"===c.kind)if("type"in o.expr){const e=Ye(o.expr.type);if(e.kind==X.Fn){const a=ye({expr:e.ret});"type"in a.expr&&a.expr.type==Y?be(o.expr.type)?s.push(c):xe(o.expr.type)?n.push(c):t.push(c):l.push(c)}else be(o.expr.type)?s.push(c):xe(o.expr.type)?n.push(c):t.push(c)}else o.typeRef&&"type"in o.typeRef&&o.typeRef==Y?t.push(c):r.push(c)}else a.push(c)}}function Oe(e){let t=Xe(e.src);return'<a style="float: right;" href="'+"src/{{file}}.html#L{{line}}".replace("{{file}}",zigAnalysis.files[t.file]).replace("{{line}}",t.line+1)+'">[src]</a>'}function Te(e){let t=[],n=[],s=[],l=[],a=[],d=[],p=[];if(Ne(e.pubDecls,t,n,s,l,a,d),ie.showPrivDecls&&Ne(e.privDecls,t,n,s,l,a,d),t.sort(Je),n.sort(Je),s.sort(Je),l.sort(Je),a.sort(Je),d.sort(Je),p.sort(Je),null!=e.src){let t=Xe(e.src).docs;null!=t&&(I.innerHTML=Me(t),I.classList.remove("hidden"))}if(0!==t.length){window.x=t,Ee(i,t.length,'<li><a href="#"></a></li>');for(let e=0;e<t.length;e+=1){let n=i.children[e].children[0],s=t[e];n.textContent=s.name,n.setAttribute("href",_e(s.name))}r.classList.remove("hidden")}if(0!==n.length){Ee(h,n.length,'<li><a href="#"></a></li>');for(let e=0;e<n.length;e+=1){let t=h.children[e].children[0],s=n[e];t.textContent=s.name,t.setAttribute("href",_e(s.name))}u.classList.remove("hidden")}if(0!==s.length){Ee(f,s.length,'<li><a href="#"></a></li>');for(let e=0;e<s.length;e+=1){let t=f.children[e].children[0],n=s[e];t.textContent=n.name,t.setAttribute("href",_e(n.name))}m.classList.remove("hidden")}if(0!==l.length){Ee(y,l.length,'<div><dt><div class="fnSignature"></div><div></div></dt><dd></dd></div>');for(let e=0;e<l.length;e+=1){let t=l[e],n=y.children[e],s=n.children[0].children[0],a=n.children[0].children[1],r=n.children[1],i=ye(t.value);console.assert("type"in i.expr),s.innerHTML=ze(i.expr,{wantHtml:!0,wantLink:!0,fnDecl:t,linkFnNameDecl:_e(t.name)}),a.innerHTML=Oe(t);let c=Xe(t.src).docs;null!=c?r.innerHTML=Se(c):r.textContent=""}g.classList.remove("hidden")}let _=Xe(e.src);if(_.fields&&_.fields.length>0){Ee(b,_.fields.length,"<div></div>");for(let t=0;t<_.fields.length;t+=1){let n=Xe(_.fields[t]),s=b.children[t],l=n.name,a=n.docs,r=null!=a&&""!==a,i='<div class="mobile-scroll-container"><pre class="scroll-item'+(r?" fieldHasDocs":"")+'">'+Re(l);if(e.kind===X.Enum)i+=' = <span class="tok-number">'+l+"</span>";else{let n=e.fields[t];i+=": ",i+='<span class="tok-kw">'+ze(n,!1)+"</span>";let s=fe(n);s&&(i+="<span> ("+s+")</span>")}i+=",</pre></div>",r&&(i+='<div class="fieldDocs">'+Me(a)+"</div>"),s.innerHTML=i}k.classList.remove("hidden")}if(0!==a.length){Ee(v,a.length,'<tr><td><a href="#"></a></td><td></td><td></td></tr>');for(let e=0;e<a.length;e+=1){let t=a[e],n=v.children[e],s=n.children[0].children[0],l=n.children[1],r=n.children[2];s.setAttribute("href",_e(t.name)),s.textContent=t.name,l.innerHTML=typeValueName(typeOfDecl(t),!0,!0);let i=Xe(t.src).docs;null!=i?r.innerHTML=Se(i):r.textContent=""}x.classList.remove("hidden")}if(0!==d.length){Ee(L,d.length,'<tr><td><a href="#"></a></td><td></td><td></td></tr>');for(let e=0;e<d.length;e+=1){let t=d[e],n=L.children[e],s=n.children[0].children[0],l=n.children[1],a=n.children[2];s.setAttribute("href",_e(t.name)),s.textContent=t.name,l.innerHTML=ze(Ae(t.value),{wantHtml:!0,wantLink:!0});let r=Xe(t.src).docs;null!=r?a.innerHTML=Se(r):a.textContent=""}w.classList.remove("hidden")}if(0!==p.length){Ee(o,p.length,'<tr><td><a href="#"></a></td><td></td><td></td></tr>');for(let e=0;e<p.length;e+=1){let t=p[e],n=o.children[e],s=n.children[0].children[0],l=n.children[1],a=n.children[2];s.setAttribute("href",_e(t.name)),s.textContent=t.name,l.innerHTML=ze(Ae(t.value),{wantHtml:!0,wantLink:!0});let r=Xe(t.src).docs;null!=r?a.innerHTML=Se(r):a.textContent=""}c.classList.remove("hidden")}}function Be(e,t){return e===t?0:e<t?-1:1}function De(){if(ie={showPrivDecls:!1,pkgNames:[],pkgObjs:[],declNames:[],declObjs:[],callName:null},ce="","#"===location.hash[0]&&location.hash.length>1){let e=location.hash.substring(1);"*"===e[0]&&(ie.showPrivDecls=!0,e=e.substring(1));let t,n=e.indexOf("?");-1===n?t=e:(t=e.substring(0,n),ce=decodeURIComponent(e.substring(n+1)));let s=t.split(";");ie.pkgNames=decodeURIComponent(s[0]).split("."),null!=s[1]&&(ie.declNames=decodeURIComponent(s[1]).split("."))}}function Ce(){De(),P.value!==ce&&(P.value=ce,0==P.value.length?Z.classList.remove("hidden"):Z.classList.add("hidden")),ke(),de&&(de=!1,je())}function Pe(e,t){if("value"in e){const t=ye(e.value);if("type"in t.expr){const n=Ye(t.expr.type);if(n.kind==X.Fn&&null!=n.generic_ret){const t=ye({expr:n.generic_ret});"type"in t.expr&&(e=Ye(t.expr.type))}}}if(!e.pubDecls)return null;for(let n=0;n<e.pubDecls.length;n+=1){let s=Qe(e.pubDecls[n]);if(s.name===t)return s}if(!e.privDecls)return null;for(let n=0;n<e.privDecls.length;n+=1){let s=Qe(e.privDecls[n]);if(s.name===t)return s}return null}function Fe(e){return null==ae&&(ae=function(){let e=new Array(zigAnalysis.decls.length);re=new Array(zigAnalysis.types.length);for(let n=0;n<zigAnalysis.packages.length;n+=1){if(n===zigAnalysis.rootPkg&&pe)continue;let s=zigAnalysis.packages[n],l=le[n];if(void 0===l)continue;let a=[{declNames:[],type:Ye(s.main)}];for(;0!==a.length;){let n=a.shift();if(me(n.type)){let s=n.type,r=s.pubDecls?s.pubDecls.length:0;for(let i=0;i<r;i+=1){let r=s.pubDecls[i];if(null!=e[r])continue;let c=Qe(r),o=ye(c.value),d=n.declNames.concat([c.name]);if(e[r]={pkgNames:l,declNames:d},"type"in o.expr){let e=Ye(o.expr.type);if(((t=e.kind)===X.ErrorSet||ge(t))&&(re[o.type]=r),me(e)&&a.push({declNames:d,type:e}),e.kind==X.Fn&&null!=e.generic_ret){let t=ye({expr:e.generic_ret});if("type"in t.expr){let e=Ye(t.expr.type);me(e)&&a.push({declNames:d,type:e})}}}}}}}var t;return e}()),ae[e]}function Re(e){return e.replace(/[&"<>]/g,(function(e){return Q[e]}))}function Se(e){const t=e.trim();let n=t.indexOf("\n\n"),s=!1;(n<0||n>80)&&(t.length>80?(n=80,s=!0):n=t.length);let l=t.slice(0,n);return s&&(l+="..."),Me(l)}function Me(e){const t=e.split("\n"),n=[];let s=!1,l=0;for(let e=0;e<t.length;e++){const a=t[e],r={indent:0,raw_text:a,text:a.trim(),type:"p",ordered_number:-1};if(s)"```"==r.text?(s=!1,r.type="skip"):(r.type="code",r.text=r.raw_text.substr(l));else{for(;r.indent<r.raw_text.length&&" "==r.raw_text[r.indent];)r.indent+=1;if(r.text.startsWith("######"))r.type="h6",r.text=r.text.substr(6);else if(r.text.startsWith("#####"))r.type="h5",r.text=r.text.substr(5);else if(r.text.startsWith("####"))r.type="h4",r.text=r.text.substr(4);else if(r.text.startsWith("###"))r.type="h3",r.text=r.text.substr(3);else if(r.text.startsWith("##"))r.type="h2",r.text=r.text.substr(2);else if(r.text.startsWith("#"))r.type="h1",r.text=r.text.substr(1);else if(r.text.startsWith("-"))r.type="ul",r.text=r.text.substr(1);else if(r.text.match(/^\d+\..*$/)){const e=r.text.match(/(\d+)\./);r.type="ul",r.text=r.text.substr(e[0].length),r.ordered_number=Number(e[1].length)}else"```"==r.text?(r.type="skip",s=!0,l=r.indent):""==r.text&&(r.type="empty")}"skip"!=r.type&&n.push(r)}function a(e){const t=[{marker:"**",tag:"strong"},{marker:"~~",tag:"s"},{marker:"__",tag:"u"},{marker:"*",tag:"em"}],n=[];let s="",l="";function a(){""!=l&&(s+=Re(l)),l=""}let r=!1,i="",c=!1;for(let o=0;o<e.length;o++)if(r&&c)e.substr(o,i.length)==i?(" "==l[0]&&" "==l[l.length-1]&&(l=l.substr(1,l.length-2)),a(),o+=i.length-1,c=!1,r=!1,s+="</code>",i=""):l+=e[o];else if("`"!=e[o])if(r)l+=e[o],c=!0;else{let r=!1;for(let l=n.length>0?-1:0;l<t.length;l++){const i=l>=0?t[l]:n[n.length-1];if(e.substr(o,i.marker.length)==i.marker){a(),n[n.length-1]==i?(n.pop(),s+="</"+i.tag+">"):(n.push(i),s+="<"+i.tag+">"),o+=i.marker.length-1,r=!0;break}}r||(l+=e[o])}else a(),r||(s+="<code>"),r=!0,i+="`";for(a();n.length>0;){const e=n.pop();s+="</"+e.tag+">"}return s}function r(e,t){return t>0&&n[t-1].type==e}function i(e,t){return t<n.length-1&&n[t+1].type==e}function c(e){return e>0?n[e-1].indent:0}function o(e){return e<n.length-1?n[e+1].indent:0}let d="";for(let e=0;e<n.length;e++){const t=n[e];switch(t.type){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":d+="<"+t.type+">"+a(t.text)+"</"+t.type+">\n";break;case"ul":case"ol":(!r("ul",e)||c(e)<t.indent)&&(d+="<"+t.type+">\n"),d+="<li>"+a(t.text)+"</li>\n",(!i("ul",e)||o(e)<t.indent)&&(d+="</"+t.type+">\n");break;case"p":r("p",e)||(d+="<p>\n"),d+=a(t.text)+"\n",i("p",e)||(d+="</p>\n");break;case"code":r("code",e)||(d+="<pre><code>"),d+=Re(t.text)+"\n",i("code",e)||(d+="</code></pre>\n")}}return d}function je(){if(F.classList.contains("hidden"))return;let e=M.children[oe];if(null==e&&0!==M.children.length&&(e=M.children[0]),null!=e){let t=e.children[0];location.href=t.getAttribute("href"),oe=-1}P.blur()}function Ue(e){K.classList.contains("hidden")?(P.value="",P.blur(),Z.classList.remove("hidden"),oe=-1,e.preventDefault(),e.stopPropagation(),Ze()):(K.classList.add("hidden"),e.preventDefault(),e.stopPropagation())}function Ve(e){oe<0||oe>=M.children.length?e>0?oe=-1+e:e<0&&(oe=M.children.length+e):oe+=e,oe<0&&(oe=0),oe>=M.children.length&&(oe=M.children.length-1),Ge()}function qe(e){let t,n=!1;switch(e.which){case 13:t="Enter";break;case 27:t="Esc";break;case 38:t="Up";break;case 40:t="Down";break;default:n=!0,t=null!=e.key?e.key:String.fromCharCode(e.charCode||e.keyCode)}return!n&&e.shiftKey&&(t="Shift+"+t),e.altKey&&(t="Alt+"+t),e.ctrlKey&&(t="Ctrl+"+t),t}function We(){null!=G&&(clearTimeout(G),G=null)}function Ke(){We(),G=setTimeout(Ze,100)}function Ze(){We();let e=location.hash,t=e.split("?"),n=""===P.value?"":"?"+P.value;location.replace(1===t.length?e+n:t[0]+n)}function $e(){let e=ce.trim().split(/[ \r\n\t]+/);return e.sort(),e}function Ge(){for(let e=0;e<M.children.length;e+=1){let t=M.children[e];oe===e?t.classList.add("selected"):t.classList.remove("selected")}}function Je(e,t){return Be(e.name,t.name)}function Qe(e){const t=zigAnalysis.decls[e];return{name:t[0],kind:t[1],src:t[2],value:t[3],decltest:t[4]}}function Xe(e){const t=zigAnalysis.astNodes[e];return{file:t[0],line:t[1],col:t[2],name:t[3],code:t[4],docs:t[5],fields:t[6],comptime:t[7]}}function Ye(e){const t=zigAnalysis.types[e];switch(t[0]){default:throw"unhandled type kind!";case 0:throw"unanalyzed type!";case 1:case 2:case 3:case 4:case 5:case 6:case 10:case 11:case 12:case 13:case 14:case 22:case 24:case 25:case 26:case 27:return{kind:t[0],name:t[1]};case 7:return{kind:t[0],size:t[1],child:t[2],sentinel:t[3],align:t[4],address_space:t[5],bit_start:t[6],host_size:t[7],is_ref:t[8],is_allowzero:t[9],is_mutable:t[10],is_volatile:t[11],has_sentinel:t[12],has_align:t[13],has_addrspace:t[14],has_bit_range:t[15]};case 8:return{kind:t[0],len:t[1],child:t[2],sentinel:t[3]};case 9:return{kind:t[0],name:t[1],src:t[2],privDecls:t[3],pubDecls:t[4],fields:t[5],line_number:t[6],outer_decl:t[7]};case 15:return{kind:t[0],name:t[1],child:t[2]};case 16:return{kind:t[0],lhs:t[1],rhs:t[2]};case 17:return{kind:t[0],payload:t[1]};case 18:return{kind:t[0],name:t[1],fields:t[2]};case 19:case 23:return{kind:t[0],name:t[1],src:t[2],privDecls:t[3],pubDecls:t[4]};case 20:return{kind:t[0],name:t[1],src:t[2],privDecls:t[3],pubDecls:t[4],fields:t[5]};case 21:return{kind:t[0],name:t[1],src:t[2],ret:t[3],generic_ret:t[4],params:t[5],lib_name:t[6],is_var_args:t[7],is_inferred_error:t[8],has_lib_name:t[9],has_cc:t[10],cc:t[11],align:t[12],has_align:t[13],is_test:t[14],is_extern:t[15]}}}/^\d+\.\d+\.\d+$/.test(ue)||(ue="master"),$.href=`https://ziglang.org/documentation/${ue}/`}();

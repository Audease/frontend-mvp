/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[12],{582:function(xa,ta,h){h.r(ta);var qa=h(0),oa=h(1);h.n(oa);xa=h(121);h=h(493);xa=function(na){function ja(ka,fa,x){fa=na.call(this,ka,fa,x)||this;fa.db=ka;return fa}Object(qa.c)(ja,na);ja.prototype.request=function(ka){var fa=this;Object(oa.each)(ka,function(x){fa.db.get(x,function(z,r,n){return z?fa.trigger("partReady.partRetriever",{Kb:x,error:z}):fa.trigger("partReady.partRetriever",{Kb:x,data:r,sl:!1,ni:!1,error:null,ue:n})})})};
ja.prototype.Vy=function(ka){ka()};return ja}(xa.a);Object(h.a)(xa);Object(h.b)(xa);ta["default"]=xa}}]);}).call(this || window)
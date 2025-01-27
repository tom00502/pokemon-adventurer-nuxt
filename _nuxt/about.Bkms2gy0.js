import{_ as m,s as v,f,x,c as s,i as l,d as u,a as t,F as b,m as k,l as h,q as S,o as e,t as _,p as D,e as w}from"./entry.e8zbJibC.js";import{u as I}from"./vue.f36acd1f.UWUaUeEC.js";import{h as z}from"./moment.gy9AvL1k.js";const o=n=>(D("data-v-848fe6f4"),n=n(),w(),n),M={class:"about"},V={key:0,class:"card"},Y=o(()=>t("div",null," Adventure Assistant compiles a wealth of game data, all generously contributed by players like you. Please note that this is not official information, so some inaccuracies may exist. If you spot any errors, please don't hesitate to get in touch. ",-1)),A=o(()=>t("div",null," Share your suggestions, strategies, and bug reports in the discord or by emailing the webmaster. ",-1)),B=[Y,A],N={key:1,class:"card"},F=o(()=>t("div",null," 冒險助手匯集了大量的遊戲數據，這些數據均由像您一樣的玩家慷慨貢獻。請注意，這些資訊並非官方資料，因此可能存在一些不準確之處。如果您發現任何錯誤，請隨時與我們聯繫。 ",-1)),L=o(()=>t("div",null,"歡迎在 Discord 群組或透過電子郵件向站長分享您的建議、策略和錯誤報告。",-1)),T=[F,L],j={key:2,class:"card"},q=o(()=>t("h3",null,[t("a",{href:"mailto:gongyingparsons@gmail.com"},"Mail to admin")],-1)),C={key:3,class:"card"},E=o(()=>t("h3",null,[t("a",{href:"mailto:gongyingparsons@gmail.com"},"寄信給站長")],-1)),H={key:4,class:"card"},O=o(()=>t("div",null,"Website creator: S8_Tuxx",-1)),P=o(()=>t("div",null,"Special thanks: Lolzz, Ojatz",-1)),W=[O,P],G={key:5,class:"card"},J=o(()=>t("div",null,"製作: S67_Sanna",-1)),K=o(()=>t("div",null,"特別感謝: S109_夏天",-1)),Q=[J,K],R={key:6,class:"card relative overflow-x-auto"},U={key:0,class:"w-full text-left text-sm text-gray-500"},X=o(()=>t("thead",{class:"ext-xs bg-gray-50 uppercase text-gray-700"},[t("tr",null,[t("th",{class:"px-6 py-3"},"日期"),t("th",{class:"px-6 py-3"},"版本"),t("th",{class:"px-6 py-3"},"內容")])],-1)),Z={class:"px-6 py-3"},$={class:"px-6 py-3"},tt={class:"px-6 py-3"},st={__name:"about",setup(n){const{locale:i,t:c}=v();I({title:c("about.title"),meta:[{name:"description",content:c("about.ogDescription")},{property:"og:title",content:c("about.title")},{property:"og:description",content:c("about.ogDescription")}]});const{getVersions:p}=S(),d=f({details:[]});x(async()=>{const{data:a}=await p();d.details=a});const g=a=>a?z(a).format("YYYY-MM-DD"):"";return(a,et)=>(e(),s("div",M,[l(i)==="en"?(e(),s("div",V,B)):(e(),s("div",N,T)),l(i)==="en"?(e(),s("div",j,[q,u(" gongyingparsons@gmail.com ")])):(e(),s("div",C,[E,u(" gongyingparsons@gmail.com ")])),l(i)==="en"?(e(),s("div",H,W)):(e(),s("div",G,Q)),l(i)==="zh"?(e(),s("div",R,[d.details.length?(e(),s("table",U,[X,t("tbody",null,[(e(!0),s(b,null,k(d.details,(r,y)=>(e(),s("tr",{key:y},[t("td",Z,[t("div",null,_(g(r.date)),1)]),t("td",$,[t("div",null,_(r.version),1)]),t("td",tt,[t("div",null,_(r.detail),1)])]))),128))])])):h("",!0)])):h("",!0)]))}},it=m(st,[["__scopeId","data-v-848fe6f4"]]);export{it as default};

(self.webpackChunkdoocoins=self.webpackChunkdoocoins||[]).push([[673],{2524:function(e,t,l){"use strict";l.r(t);var n=l(7294);t.default=function(){var e=n.useState(""),t=e[0],a=e[1],r=n.useState(null),i=r[0],u=r[1];return n.useEffect((function(){l.e(701).then(l.bind(l,8701)).then((function(e){u(e.default)}))}),[]),n.createElement(n.Fragment,null,n.createElement("title",null,"DooCoins - Add a Child"),n.createElement("h1",null,"Add a Child"),n.createElement("form",{onSubmit:function(e){e.preventDefault();var t=e.target.querySelectorAll("input"),l=e.target.querySelector('input[name="child_id"]').value,n=e.target.querySelector('input[name="child_name"]').value;return e.target.querySelector('input[name="child_photo"]').value,null==i||i.set(l,n).then((function(){alert("Child Added!"),t.forEach((function(e){e.value=""})),a("")})),!1}},n.createElement("label",{htmlFor:"child_name"},"Name",n.createElement("input",{type:"text",name:"child_name",autoComplete:"name"})),n.createElement("br",null),n.createElement("label",{htmlFor:"child_id"},"Child ID",n.createElement("input",{type:"text",name:"child_id",autoComplete:"child id"})),n.createElement("br",null),n.createElement("label",{htmlFor:"child_photo"},"Profile picture",n.createElement("input",{type:"file",id:"img",name:"child_photo",accept:"image/*",onChange:function(e){var t=e.target.files[0],l=new FileReader;l.addEventListener("load",(function(){a(l.result)}),!1),t&&l.readAsDataURL(t)}})),t?n.createElement("img",{src:t,alt:"profile pic"}):null,n.createElement("br",null),n.createElement("input",{type:"hidden",name:"wallet_balance",value:"0"}),n.createElement("button",{type:"submit"},"Add Child")))}}}]);
//# sourceMappingURL=component---src-pages-add-child-js-319311d30fb6ba4bc566.js.map
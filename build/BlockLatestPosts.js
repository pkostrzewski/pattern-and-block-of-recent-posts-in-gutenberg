(()=>{"use strict";var e={n:t=>{var a=t&&t.__esModule?()=>t.default:()=>t;return e.d(a,{a}),a},d:(t,a)=>{for(var r in a)e.o(a,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:a[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};(()=>{const t=window.wp.blocks,a=window.wp.element,r=window.wp.blockEditor,n=window.wp.components,l=window.wp.apiFetch;var c=e.n(l);function s(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var a={}.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?i(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}var o=function(e){return e.replace(/<\/?[^>]+(>|$)/g,"").replace(/\s+/g," ").trim()},m=function(e,t){var a=o(e),r=a.split(" ");return r.length>t?r.slice(0,t).join(" ")+"...":a};(0,t.registerBlockType)("recruitment-task/latest-posts",{title:"Latest Posts",category:"widgets",attributes:{superscription:{type:"string",default:"latest posts"},title:{type:"string",default:"Lorem ipsum dolor sit amit..."},text:{type:"string",default:"View all posts"},link:{type:"string",default:"/url-view-all-posts"},order:{type:"string",default:"DESC"},posts:{type:"array",default:[]}},edit:function(e){var t=e.attributes,l=e.setAttributes,i=t.title,d=t.superscription,p=t.text,u=t.link,h=t.order;return(0,a.useEffect)((function(){c()({path:"/wp/v2/posts?_embed&per_page=4&_orderby=date&_order=".concat(h)}).then((function(e){console.log("Fetched Posts:",e);var t=e.filter((function(e){return e.sticky})),a=e.filter((function(e){return!e.sticky})),r=[].concat(s(t),s(a)).slice(0,4);l({posts:r})})).catch((function(e){console.error("Error fetching posts:",e)}))}),[h]),React.createElement("section",{className:"wp-block-reqruitment-task-latest-posts"},React.createElement("div",{className:"wrapper"},React.createElement(r.InspectorControls,null,React.createElement(n.PanelBody,{title:"Settings"},React.createElement(n.SelectControl,{label:"Order",value:h,options:[{label:"Ascending (ASC)",value:"ASC"},{label:"Descending (DESC)",value:"DESC"}],onChange:function(e){return l({order:e})}}))),React.createElement("div",{className:"section-header"},React.createElement("div",{className:"heading"},React.createElement(r.RichText,{tagName:"span",value:d,onChange:function(e){return l({superscription:e})},placeholder:"Superscription"}),React.createElement(r.RichText,{tagName:"h2",value:i,onChange:function(e){return l({title:e})},placeholder:"Title"})),React.createElement("div",{className:"view-all-posts"},React.createElement("div",{className:"view-all-posts-label"},React.createElement(r.RichText,{tagName:"p",value:p,onChange:function(e){return l({text:e})},placeholder:"Text for 'View all posts'"}),React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"6",height:"12",viewBox:"0 0 6 12",fill:"none"},React.createElement("path",{d:"M5.64645 5.64645C5.84171 5.84171 5.84171 6.15829 5.64645 6.35355L0.853552 11.1464C0.53857 11.4614 -1.44492e-06 11.2383 -1.42545e-06 10.7929L-1.00644e-06 1.20711C-9.86967e-07 0.761654 0.53857 0.538571 0.853552 0.853553L5.64645 5.64645Z",fill:"#22B4AB"}))),React.createElement(r.RichText,{tagName:"a",value:u,onChange:function(e){return l({link:e})},placeholder:"Link for 'View all posts'"}))),React.createElement("div",{className:"latest-posts"},t.posts&&t.posts.length>0?t.posts.map((function(e){return React.createElement("div",{className:"post",key:e.id},React.createElement("div",{className:"thumbnail"},e._embedded&&e._embedded["wp:featuredmedia"]&&React.createElement(React.Fragment,null,React.createElement("img",{src:e._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url,alt:e.title.rendered,className:"post-thumbnail"}),React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"175",height:"178",viewBox:"0 0 175 178",fill:"none"},React.createElement("path",{d:"M0 1.5299e-05L3.02464e-07 178L175 178L0 1.5299e-05Z"})))),React.createElement("div",{className:"details"},React.createElement("div",{className:"details-contents"},e.sticky&&React.createElement("div",{className:"featured-post"},React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"12",viewBox:"0 0 13 12",fill:"none"},React.createElement("path",{d:"M6.5 1.61803L7.48381 4.6459L7.59607 4.99139H7.95934H11.143L8.56737 6.86271L8.27348 7.07624L8.38573 7.42173L9.36955 10.4496L6.79389 8.57827L6.5 8.36475L6.20611 8.57827L3.63045 10.4496L4.61426 7.42173L4.72652 7.07624L4.43263 6.86271L1.85697 4.99139H5.04066H5.40393L5.51619 4.6459L6.5 1.61803Z",stroke:"#FF4043"})),React.createElement("span",null,"Featured post")),React.createElement("a",{href:e.link},React.createElement("h3",null,e.title.rendered)),React.createElement("p",null,m(o(e.excerpt.rendered),15))),React.createElement("a",{href:e.link,className:"read-more"},"Read more")))})):React.createElement("p",null,"No posts found."))))},save:function(e){var t=e.attributes,a=t.title,n=t.superscription,l=t.text,c=t.link,s=t.posts;return React.createElement("section",{className:"wp-block-reqruitment-task-latest-posts"},React.createElement("div",{className:"wrapper"},React.createElement("div",{className:"section-header"},React.createElement("div",{className:"heading"},React.createElement(r.RichText.Content,{tagName:"span",value:n}),React.createElement(r.RichText.Content,{tagName:"h2",value:a})),React.createElement("div",{className:"view-all-posts"},React.createElement("div",{className:"view-all-posts-label"},React.createElement("a",{href:c},React.createElement(r.RichText.Content,{tagName:"p",value:l}),React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"6",height:"12",viewBox:"0 0 6 12",fill:"none"},React.createElement("path",{d:"M5.64645 5.64645C5.84171 5.84171 5.84171 6.15829 5.64645 6.35355L0.853552 11.1464C0.53857 11.4614 -1.44492e-06 11.2383 -1.42545e-06 10.7929L-1.00644e-06 1.20711C-9.86967e-07 0.761654 0.53857 0.538571 0.853552 0.853553L5.64645 5.64645Z",fill:"#22B4AB"})))))),React.createElement("div",{className:"latest-posts"},s.length>0?s.map((function(e){return React.createElement("div",{className:"post",key:e.id},React.createElement("div",{className:"thumbnail"},e._embedded&&e._embedded["wp:featuredmedia"]&&React.createElement(React.Fragment,null,React.createElement("img",{src:e._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url,alt:e.title.rendered,className:"post-thumbnail"}),React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"175",height:"178",viewBox:"0 0 175 178",fill:"none"},React.createElement("path",{d:"M0 1.5299e-05L3.02464e-07 178L175 178L0 1.5299e-05Z"})))),React.createElement("div",{className:"details"},React.createElement("div",{className:"details-contents"},e.sticky&&React.createElement("div",{className:"featured-post"},React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"12",viewBox:"0 0 13 12",fill:"none"},React.createElement("path",{d:"M6.5 1.61803L7.48381 4.6459L7.59607 4.99139H7.95934H11.143L8.56737 6.86271L8.27348 7.07624L8.38573 7.42173L9.36955 10.4496L6.79389 8.57827L6.5 8.36475L6.20611 8.57827L3.63045 10.4496L4.61426 7.42173L4.72652 7.07624L4.43263 6.86271L1.85697 4.99139H5.04066H5.40393L5.51619 4.6459L6.5 1.61803Z",stroke:"#FF4043"})),React.createElement("span",null,"Featured post")),React.createElement("a",{href:e.link},React.createElement("h3",null,e.title.rendered)),React.createElement("p",null,m(o(e.excerpt.rendered),15))),React.createElement("a",{href:e.link,className:"read-more"},"Read more")))})):React.createElement("p",null,"No posts found."))))}})})()})();
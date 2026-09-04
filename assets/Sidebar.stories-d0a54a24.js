import{j as e,a as t,F as Ke}from"./jsx-runtime-5e7b5774.js";import{P as _}from"./index-5a7afc56.js";import{r as h}from"./index-e6e5af86.js";import{y as n,c as P,E as Ve}from"./PieOptions-89d97896.js";import{S as D,a as We,P as Ee,H as Ue,L as ze}from"./StarIcon-afa07a08.js";import{A as m,a as je}from"./lodash-ab783b60.js";import{U as F}from"./UserIcon-60ec8c67.js";import"./clsx-0839fdbe.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const ln={title:"Navigation/Sidebar",component:n,parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2725%3A91116&viewport=2302%2C256%2C0.11"}}},r=()=>t(Ke,{children:[e(n.Button,{appearance:"solid",icon:We,label:"Scan QR"}),e(n.Footer,{children:e(n.Menu,{content:t("div",{className:"space-y-3",children:[t("div",{className:"space-y-2",children:[e(n.Account,{name:"Twitter",description:"San Francisco, CA",icon:e(je,{className:"text-green"})}),e(n.Account,{name:"Slack",description:"San Francisco, CA"})]}),t("div",{className:"space-y-2",children:[e(n.Separator,{className:"mx-0 my-0 mt-4"}),e(n.Button,{icon:Ee,label:"Privacy Policy"}),e(n.Button,{icon:Ue,label:"Help Center"}),e(n.Separator,{className:"mx-0"}),e(n.Button,{icon:ze,label:"Logout"})]})]}),children:e(n.Account,{name:"Xola Custom Seller"})})})]}),s=()=>{window.location.reload()},g=()=>e("div",{className:"h-screen",children:t(n,{footer:e(r,{}),onLogoClick:s,children:[e(n.Link,{isActive:!0,icon:F,children:"Sellers"}),e(n.Link,{icon:D,children:"Favorites"}),e(n.Menu,{content:t("div",{className:"space-y-5 py-6",children:[e(n.Heading,{icon:m,label:"Marketing"}),t("div",{children:[e(n.Link,{isActive:!0,isSubMenuItem:!0,children:"Abandoned Booking Recovery"}),e(n.Link,{isSubMenuItem:!0,children:"Conversion Tracking"}),e(n.Link,{isSubMenuItem:!0,children:"Coupons"}),e(n.Link,{isSubMenuItem:!0,children:"Partners"}),e(n.Link,{isSubMenuItem:!0,children:"XolaBot"}),e(n.Separator,{}),e(n.Link,{isSubMenuItem:!0,children:"Global Settings"})]})]}),children:e(n.Link,{icon:m,children:"Marketing"})})]})}),b=()=>t("div",{className:"h-screen",children:['Pass in any component for the "logo" property',t(n,{logo:e(()=>e("img",{src:"https://c02.xola.com/images/xola-logo-header.png",className:"bg-green"}),{}),footer:e(r,{}),onLogoClick:s,children:[e(n.Link,{isActive:!0,icon:F,children:"Sellers"}),e(n.Link,{icon:D,children:"Favorites"}),e(n.Link,{icon:m,children:"Marketing"})]})]}),S=()=>{const[i,o]=h.useState(!1),[d,l]=h.useState(!1),u={announcements:{count:1,content:e("div",{children:"Some content"}),title:"Announcements",onClose:()=>console.log("Announcements closed")},notices:{count:32,content:e("div",{children:"Some content"}),title:"Notifications & Pending items",onClose:()=>console.log("Notifications closed")}};return e("div",{className:"h-screen",children:t(n,{footer:e(r,{}),notifications:u,isLeftDrawerOpen:i,isRightDrawerOpen:d,handleDrawerStateChange:O=>{O==="left"?(d?(l(!1),u.notices.onClose()):i&&u.announcements.onClose(),o(!i)):O==="right"&&(i?(o(!1),u.announcements.onClose()):d&&u.notices.onClose(),l(!d))},onLogoClick:s,children:[e(n.Link,{isActive:!0,icon:F,children:"Sellers"}),e(n.Link,{icon:D,children:"Favorites"}),e(n.Menu,{content:t("div",{className:"space-y-5 py-6",children:[e(n.Heading,{icon:m,label:"Marketing"}),t("div",{children:[e(n.Link,{isActive:!0,isSubMenuItem:!0,children:"Abandoned Booking Recovery"}),e(n.Link,{isSubMenuItem:!0,children:"Conversion Tracking"}),e(n.Link,{isSubMenuItem:!0,children:"Coupons"}),e(n.Link,{isSubMenuItem:!0,children:"Partners"}),e(n.Link,{isSubMenuItem:!0,children:"XolaBot"})]})]}),children:e(n.Link,{icon:m,children:"Marketing"})})]})})},a=({title:i,children:o})=>t("div",{className:"mb-4 max-w-3xl rounded border border-gray-light bg-white p-3",children:[e("p",{className:"mb-1 text-sm font-bold text-gray-darker",children:i}),e("p",{className:"text-sm text-gray-dark",children:o})]});a.propTypes={title:_.string.isRequired,children:_.node.isRequired};const p=()=>t(Ke,{children:[e(n.Link,{isActive:!0,icon:F,children:"Sellers"}),e(n.Link,{icon:D,children:"Favorites"}),e(n.Link,{icon:m,info:e("span",{className:"ml-auto text-xs text-gray",children:"12"}),children:"Marketing"})]}),c=({width:i,...o})=>e("div",{className:"h-screen",children:e(n,{isFixed:!1,storageKey:null,minWidth:i,maxWidth:i,footer:e(r,{}),onLogoClick:s,...o,children:e(p,{})})});c.propTypes={width:_.number.isRequired};const v=()=>t("div",{children:[e(a,{title:"Baseline: icons variant at 64px",children:"Below 140px every item shows its icon only. The `12` badge on Marketing is consumer-supplied `info` content and stays visible here, unlike the default chevron it replaces."}),e(c,{width:64})]}),y=()=>t("div",{children:[e(a,{title:"Baseline: text variant at 150px",children:"Between 140px and 173px every item shows its label only, no icons. The `12` badge stays visible."}),e(c,{width:150})]}),f=()=>t("div",{children:[e(a,{title:"Baseline: icons and text variant at 200px",children:"At 174px and above every item shows icon, label and trailing node together. The `12` badge stays visible."}),e(c,{width:200})]}),k=()=>t("div",{children:[e(a,{title:"Comparison: two sidebars, one pixel apart",children:"139px on the left, 140px on the right, straddling the icons/text boundary. Each sidebar must be internally consistent: icons only on the left, labels only on the right. One sidebar showing a mix of both is the bug this change fixes."}),t("div",{className:"flex",children:[e(c,{width:139}),e(c,{width:140})]})]}),w=()=>t("div",{children:[e(a,{title:"Comparison: two sidebars, one pixel apart",children:"173px on the left, 174px on the right, straddling the text/iconsAndText boundary. The left shows labels only, the right shows icons and labels. Neither may show a mix."}),t("div",{className:"flex",children:[e(c,{width:173}),e(c,{width:174})]})]}),C=()=>t("div",{className:"h-screen",children:[e(a,{title:"Interactive: drag the sidebar's right edge outward",children:'`variant="text"` lowers the ceiling to 173px even though maxWidth allows 200. Dragging right must move the sidebar but stop at 173, never reaching 200. Dragging left still narrows it to 64.'}),e(n,{isFixed:!1,storageKey:null,variant:"text",footer:e(r,{}),onLogoClick:s,children:e(p,{})})]}),x=()=>t("div",{className:"h-screen",children:[e(a,{title:"Check: no drag range in the icons variant",children:'`variant="icons"` pins the ceiling to 64, which is also the minimum, so the sidebar is a fixed rail. Dragging the right edge does nothing in either direction, deliberately.'}),e(n,{isFixed:!1,storageKey:null,variant:"icons",footer:e(r,{}),onLogoClick:s,children:e(p,{})})]}),L=()=>{const[i,o]=h.useState(!1),[d,l]=h.useState("");return t("div",{className:"h-screen",children:[e(a,{title:"Interactive: click the button below",children:"The sidebar has no collapse button of its own, so the `isCollapsed` prop is the only way to collapse it programmatically. Expect a reported width of 64 collapsed and 200 expanded."}),t("div",{className:"mb-4 flex items-center gap-3",children:[t(P,{onClick:()=>o(!i),children:[i?"Expand":"Collapse"," sidebar"]}),t("span",{className:"text-sm text-gray-dark",children:["Reported width: ",d||"none yet"]})]}),e(n,{storageKey:null,isCollapsed:i,footer:e(r,{}),onLogoClick:s,onSidebarResize:l,children:e(p,{})})]})},N=()=>{const[i,o]=h.useState(!0),[d,l]=h.useState("");return t("div",{className:"h-screen",children:[e(a,{title:"Interactive: click the button below the sidebar",children:"Mounts already collapsed. Expanding must reach 200 and never stick at 64."}),e(n,{storageKey:null,isCollapsed:i,footer:e(r,{}),onLogoClick:s,onSidebarResize:l,children:e(p,{})}),t("div",{className:"mt-4 flex items-center gap-3",children:[t(P,{onClick:()=>o(!i),children:[i?"Expand":"Collapse"," sidebar"]}),t("span",{className:"text-sm text-gray-dark",children:["Reported width: ",d||"none yet"]})]})]})},I=()=>{const[i,o]=h.useState(!1),[d,l]=h.useState("");return t("div",{className:"h-screen",children:[e(a,{title:"Interactive: drag first, then use the button",children:"Drag the sidebar's right edge to about 150px, then collapse and expand with the button. The width must come back to 150, not jump to 200."}),t("div",{className:"mb-4 flex items-center gap-3",children:[t(P,{onClick:()=>o(!i),children:[i?"Expand":"Collapse"," sidebar"]}),t("span",{className:"text-sm text-gray-dark",children:["Reported width: ",d||"none yet"]})]}),e(n,{storageKey:null,isCollapsed:i,footer:e(r,{}),onLogoClick:s,onSidebarResize:l,children:e(p,{})})]})},A=()=>t("div",{className:"h-screen",children:[e(a,{title:"Interactive: resize the Storybook canvas",children:"Drag the preview pane across 1024px wide. Going narrower collapses the sidebar, going wider restores the width it had before."}),e(n,{storageKey:null,autoCollapseBelow:1024,footer:e(r,{}),onLogoClick:s,children:e(p,{})})]}),He=()=>{const[i]=h.useState(()=>window.localStorage.getItem("x2-14336-demo"));return t("p",{children:["Read during first render: ",String(i)]})},R=()=>t("div",{className:"h-screen",children:[e(a,{title:"Setup required, then reload",children:'Set localStorage["x2-14336-demo"] to "200", remove "x2-14336-demo:intent", shrink the canvas below 1024px, then reload. The line below reads the key during its own first render, the way a consumer app does, and must print 64 rather than 200.'}),e(n,{storageKey:"x2-14336-demo",autoCollapseBelow:1024,footer:e(r,{}),onLogoClick:s,children:e(p,{})}),e(He,{})]}),Ge=()=>{const{showText:i}=Ve();return e("div",{className:"p-4 text-white",children:i?"Third-party label":"3P"})},M=()=>t("div",{className:"h-screen",children:[e(a,{title:"Interactive: drag the sidebar's right edge",children:"The third-party node below the kitchen sink reads `useSidebar()` and must switch between its long and short label in step with ui-kit's own children."}),t(n,{storageKey:null,footer:e(r,{}),onLogoClick:s,children:[e(p,{}),e(Ge,{})]})]}),T=()=>t("div",{children:[e(a,{title:"Comparison: two sidebars sharing one CSS variable target",children:"Both write `--ui-sidebar-width` to the same element, so each overwrites the other. Open the console: the collision warning must appear exactly once, from the second mount."}),t("div",{className:"flex",children:[e(c,{width:64,cssVariableTarget:document.body}),e(c,{width:200,cssVariableTarget:document.body})]})]}),Xe=[{icon:D,label:"Products",items:["Experiences","Add-ons","Gift Cards"]},{icon:m,label:"Reports",items:["Analytics","Earnings Report","Payouts","Disputes"]},{icon:m,label:"Marketing",items:["Abandoned Reservation Recovery","Conversion Tracking","Coupons","XolaBot"]},{icon:Ee,label:"Settings",items:["Account","Users","Integrations"]}],B=()=>t("div",{className:"h-screen",children:[e(a,{title:"Interactive: sweep the pointer down Products, Reports, Marketing, Settings",children:"Exactly one submenu may be on screen at any moment. Two or three stacked menus, each offset from the last, is the bug. The iframe stands in for the seller app's legacy page host, which an open menu overlays: a pointer crossing iframe pixels is one way the parent document stops seeing the move, and nothing then tells the menu to close."}),t("div",{className:"flex h-full",children:[t(n,{isFixed:!1,storageKey:null,footer:e(r,{}),onLogoClick:s,children:[e(n.Link,{isActive:!0,icon:F,children:"Dashboard"}),Xe.map(({icon:i,label:o,items:d})=>e(n.Menu,{content:t("div",{className:"space-y-5 py-6",children:[e(n.Heading,{icon:i,label:o}),e("div",{children:d.map(l=>e(n.Link,{isSubMenuItem:!0,children:l},l))})]}),children:e(n.Link,{icon:i,children:o})},o))]}),e("iframe",{title:"Legacy page host",className:"h-full flex-1 border-0",srcDoc:"<body style='margin:0;background:#f6f7f9;font:14px system-ui;padding:24px'>Legacy page content</body>"})]})]});g.__docgenInfo={description:"",methods:[],displayName:"Default"};b.__docgenInfo={description:"",methods:[],displayName:"CustomLogo"};S.__docgenInfo={description:"",methods:[],displayName:"SidebarWithNotifications"};v.__docgenInfo={description:"",methods:[],displayName:"VariantIcons"};y.__docgenInfo={description:"",methods:[],displayName:"VariantText"};f.__docgenInfo={description:"",methods:[],displayName:"VariantIconsAndText"};k.__docgenInfo={description:"",methods:[],displayName:"BandBoundaryIcons"};w.__docgenInfo={description:"",methods:[],displayName:"BandBoundaryText"};C.__docgenInfo={description:"",methods:[],displayName:"VariantPropAsCeiling"};x.__docgenInfo={description:"",methods:[],displayName:"VariantIconsIsFixedWidth"};L.__docgenInfo={description:"",methods:[],displayName:"ControlledCollapse"};N.__docgenInfo={description:"",methods:[],displayName:"ControlledCollapseStartsCollapsed"};I.__docgenInfo={description:"",methods:[],displayName:"CollapseRoundTrip"};A.__docgenInfo={description:"",methods:[],displayName:"AutoCollapseOnResize"};R.__docgenInfo={description:"",methods:[],displayName:"FirstPaintPersistence"};M.__docgenInfo={description:"",methods:[],displayName:"ThirdPartyChild"};T.__docgenInfo={description:"",methods:[],displayName:"TwoSidebars"};B.__docgenInfo={description:"",methods:[],displayName:"AdjacentSubMenus"};var K,E,V;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  return <div className="h-screen">
            <Sidebar footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <Sidebar.Link isActive icon={UserIcon}>
                    Sellers
                </Sidebar.Link>

                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>

                <Sidebar.Menu content={<div className="space-y-5 py-6">
                            <Sidebar.Heading icon={AnnounceIcon} label="Marketing" />
                            <div>
                                <Sidebar.Link isActive isSubMenuItem>
                                    Abandoned Booking Recovery
                                </Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Conversion Tracking</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Coupons</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Partners</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>XolaBot</Sidebar.Link>
                                <Sidebar.Separator />
                                <Sidebar.Link isSubMenuItem>Global Settings</Sidebar.Link>
                            </div>
                        </div>}>
                    <Sidebar.Link icon={AnnounceIcon}>Marketing</Sidebar.Link>
                </Sidebar.Menu>
            </Sidebar>
        </div>;
}`,...(V=(E=g.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var W,U,z;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`() => {
  const Logo = () => <img src="https://c02.xola.com/images/xola-logo-header.png" className="bg-green" />;
  return <div className="h-screen">
            Pass in any component for the "logo" property
            <Sidebar logo={<Logo />} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <Sidebar.Link isActive icon={UserIcon}>
                    Sellers
                </Sidebar.Link>
                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>
                <Sidebar.Link icon={AnnounceIcon}>Marketing</Sidebar.Link>
            </Sidebar>
        </div>;
}`,...(z=(U=b.parameters)==null?void 0:U.docs)==null?void 0:z.source}}};var j,H,G;S.parameters={...S.parameters,docs:{...(j=S.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const notifications = {
    announcements: {
      count: 1,
      content: <div>Some content</div>,
      title: "Announcements",
      onClose: () => console.log("Announcements closed")
    },
    notices: {
      count: 32,
      content: <div>Some content</div>,
      title: "Notifications & Pending items",
      onClose: () => console.log("Notifications closed")
    }
  };
  const handleDrawerStateChange = drawer => {
    if (drawer === "left") {
      if (isRightDrawerOpen) {
        setIsRightDrawerOpen(false);
        notifications.notices.onClose();
      } else if (isLeftDrawerOpen) {
        notifications.announcements.onClose();
      }
      setIsLeftDrawerOpen(!isLeftDrawerOpen);
    } else if (drawer === "right") {
      if (isLeftDrawerOpen) {
        setIsLeftDrawerOpen(false);
        notifications.announcements.onClose();
      } else if (isRightDrawerOpen) {
        notifications.notices.onClose();
      }
      setIsRightDrawerOpen(!isRightDrawerOpen);
    }
  };
  return <div className="h-screen">
            <Sidebar footer={<SidebarFooter />} notifications={notifications} isLeftDrawerOpen={isLeftDrawerOpen} isRightDrawerOpen={isRightDrawerOpen} handleDrawerStateChange={handleDrawerStateChange} onLogoClick={handleLogoClick}>
                <Sidebar.Link isActive icon={UserIcon}>
                    Sellers
                </Sidebar.Link>

                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>

                <Sidebar.Menu content={<div className="space-y-5 py-6">
                            <Sidebar.Heading icon={AnnounceIcon} label="Marketing" />
                            <div>
                                <Sidebar.Link isActive isSubMenuItem>
                                    Abandoned Booking Recovery
                                </Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Conversion Tracking</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Coupons</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Partners</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>XolaBot</Sidebar.Link>
                            </div>
                        </div>}>
                    <Sidebar.Link icon={AnnounceIcon}>Marketing</Sidebar.Link>
                </Sidebar.Menu>
            </Sidebar>
        </div>;
}`,...(G=(H=S.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var X,q,Q;v.parameters={...v.parameters,docs:{...(X=v.parameters)==null?void 0:X.docs,source:{originalSource:`() => <div>
        <StoryNote title="Baseline: icons variant at 64px">
            Below 140px every item shows its icon only. The \`12\` badge on Marketing is consumer-supplied \`info\` content
            and stays visible here, unlike the default chevron it replaces.
        </StoryNote>
        <AtWidth width={64} />
    </div>`,...(Q=(q=v.parameters)==null?void 0:q.docs)==null?void 0:Q.source}}};var Y,J,Z;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:`() => <div>
        <StoryNote title="Baseline: text variant at 150px">
            Between 140px and 173px every item shows its label only, no icons. The \`12\` badge stays visible.
        </StoryNote>
        <AtWidth width={150} />
    </div>`,...(Z=(J=y.parameters)==null?void 0:J.docs)==null?void 0:Z.source}}};var $,ee,ne;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`() => <div>
        <StoryNote title="Baseline: icons and text variant at 200px">
            At 174px and above every item shows icon, label and trailing node together. The \`12\` badge stays visible.
        </StoryNote>
        <AtWidth width={200} />
    </div>`,...(ne=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,ie,oe;k.parameters={...k.parameters,docs:{...(te=k.parameters)==null?void 0:te.docs,source:{originalSource:`() => <div>
        <StoryNote title="Comparison: two sidebars, one pixel apart">
            139px on the left, 140px on the right, straddling the icons/text boundary. Each sidebar must be internally
            consistent: icons only on the left, labels only on the right. One sidebar showing a mix of both is the bug
            this change fixes.
        </StoryNote>
        <div className="flex">
            <AtWidth width={139} />
            <AtWidth width={140} />
        </div>
    </div>`,...(oe=(ie=k.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var ae,re,se;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`() => <div>
        <StoryNote title="Comparison: two sidebars, one pixel apart">
            173px on the left, 174px on the right, straddling the text/iconsAndText boundary. The left shows labels
            only, the right shows icons and labels. Neither may show a mix.
        </StoryNote>
        <div className="flex">
            <AtWidth width={173} />
            <AtWidth width={174} />
        </div>
    </div>`,...(se=(re=w.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var de,le,ce;C.parameters={...C.parameters,docs:{...(de=C.parameters)==null?void 0:de.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Interactive: drag the sidebar's right edge outward">
            \`variant="text"\` lowers the ceiling to 173px even though maxWidth allows 200. Dragging right must move the
            sidebar but stop at 173, never reaching 200. Dragging left still narrows it to 64.
        </StoryNote>
        <Sidebar isFixed={false} storageKey={null} variant="text" footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>`,...(ce=(le=C.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var he,pe,me;x.parameters={...x.parameters,docs:{...(he=x.parameters)==null?void 0:he.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Check: no drag range in the icons variant">
            \`variant="icons"\` pins the ceiling to 64, which is also the minimum, so the sidebar is a fixed rail.
            Dragging the right edge does nothing in either direction, deliberately.
        </StoryNote>
        <Sidebar isFixed={false} storageKey={null} variant="icons" footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>`,...(me=(pe=x.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ue,ge,be;L.parameters={...L.parameters,docs:{...(ue=L.parameters)==null?void 0:ue.docs,source:{originalSource:`() => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [reported, setReported] = useState("");
  return <div className="h-screen">
            <StoryNote title="Interactive: click the button below">
                The sidebar has no collapse button of its own, so the \`isCollapsed\` prop is the only way to collapse it
                programmatically. Expect a reported width of 64 collapsed and 200 expanded.
            </StoryNote>

            <div className="mb-4 flex items-center gap-3">
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? "Expand" : "Collapse"} sidebar
                </Button>
                <span className="text-sm text-gray-dark">Reported width: {reported || "none yet"}</span>
            </div>
            <Sidebar storageKey={null} isCollapsed={isCollapsed} footer={<SidebarFooter />} onLogoClick={handleLogoClick} onSidebarResize={setReported}>
                <KitchenSink />
            </Sidebar>
        </div>;
}`,...(be=(ge=L.parameters)==null?void 0:ge.docs)==null?void 0:be.source}}};var Se,ve,ye;N.parameters={...N.parameters,docs:{...(Se=N.parameters)==null?void 0:Se.docs,source:{originalSource:`() => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [reported, setReported] = useState("");
  return <div className="h-screen">
            <StoryNote title="Interactive: click the button below the sidebar">
                Mounts already collapsed. Expanding must reach 200 and never stick at 64.
            </StoryNote>
            <Sidebar storageKey={null} isCollapsed={isCollapsed} footer={<SidebarFooter />} onLogoClick={handleLogoClick} onSidebarResize={setReported}>
                <KitchenSink />
            </Sidebar>
            <div className="mt-4 flex items-center gap-3">
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? "Expand" : "Collapse"} sidebar
                </Button>
                <span className="text-sm text-gray-dark">Reported width: {reported || "none yet"}</span>
            </div>
        </div>;
}`,...(ye=(ve=N.parameters)==null?void 0:ve.docs)==null?void 0:ye.source}}};var fe,ke,we;I.parameters={...I.parameters,docs:{...(fe=I.parameters)==null?void 0:fe.docs,source:{originalSource:`() => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [reported, setReported] = useState("");
  return <div className="h-screen">
            <StoryNote title="Interactive: drag first, then use the button">
                Drag the sidebar's right edge to about 150px, then collapse and expand with the button. The width must
                come back to 150, not jump to 200.
            </StoryNote>

            <div className="mb-4 flex items-center gap-3">
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? "Expand" : "Collapse"} sidebar
                </Button>
                <span className="text-sm text-gray-dark">Reported width: {reported || "none yet"}</span>
            </div>
            <Sidebar storageKey={null} isCollapsed={isCollapsed} footer={<SidebarFooter />} onLogoClick={handleLogoClick} onSidebarResize={setReported}>
                <KitchenSink />
            </Sidebar>
        </div>;
}`,...(we=(ke=I.parameters)==null?void 0:ke.docs)==null?void 0:we.source}}};var Ce,xe,Le;A.parameters={...A.parameters,docs:{...(Ce=A.parameters)==null?void 0:Ce.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Interactive: resize the Storybook canvas">
            Drag the preview pane across 1024px wide. Going narrower collapses the sidebar, going wider restores the
            width it had before.
        </StoryNote>
        <Sidebar storageKey={null} autoCollapseBelow={1024} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>`,...(Le=(xe=A.parameters)==null?void 0:xe.docs)==null?void 0:Le.source}}};var Ne,Ie,Ae;R.parameters={...R.parameters,docs:{...(Ne=R.parameters)==null?void 0:Ne.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Setup required, then reload">
            Set localStorage["x2-14336-demo"] to "200", remove "x2-14336-demo:intent", shrink the canvas below 1024px,
            then reload. The line below reads the key during its own first render, the way a consumer app does, and must
            print 64 rather than 200.
        </StoryNote>
        <Sidebar storageKey="x2-14336-demo" autoCollapseBelow={1024} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
        <FirstPaintReader />
    </div>`,...(Ae=(Ie=R.parameters)==null?void 0:Ie.docs)==null?void 0:Ae.source}}};var Re,Me,Te;M.parameters={...M.parameters,docs:{...(Re=M.parameters)==null?void 0:Re.docs,source:{originalSource:`() => {
  return <div className="h-screen">
            <StoryNote title="Interactive: drag the sidebar's right edge">
                The third-party node below the kitchen sink reads \`useSidebar()\` and must switch between its long and
                short label in step with ui-kit's own children.
            </StoryNote>
            <Sidebar storageKey={null} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <KitchenSink />
                <ConsumerNode />
            </Sidebar>
        </div>;
}`,...(Te=(Me=M.parameters)==null?void 0:Me.docs)==null?void 0:Te.source}}};var Be,De,Fe;T.parameters={...T.parameters,docs:{...(Be=T.parameters)==null?void 0:Be.docs,source:{originalSource:`() => <div>
        <StoryNote title="Comparison: two sidebars sharing one CSS variable target">
            Both write \`--ui-sidebar-width\` to the same element, so each overwrites the other. Open the console: the
            collision warning must appear exactly once, from the second mount.
        </StoryNote>
        <div className="flex">
            <AtWidth width={64} cssVariableTarget={document.body} />
            <AtWidth width={200} cssVariableTarget={document.body} />
        </div>
    </div>`,...(Fe=(De=T.parameters)==null?void 0:De.docs)==null?void 0:Fe.source}}};var _e,Pe,Oe;B.parameters={...B.parameters,docs:{...(_e=B.parameters)==null?void 0:_e.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Interactive: sweep the pointer down Products, Reports, Marketing, Settings">
            Exactly one submenu may be on screen at any moment. Two or three stacked menus, each offset from the last,
            is the bug. The iframe stands in for the seller app&apos;s legacy page host, which an open menu overlays: a
            pointer crossing iframe pixels is one way the parent document stops seeing the move, and nothing then tells
            the menu to close.
        </StoryNote>
        <div className="flex h-full">
            <Sidebar isFixed={false} storageKey={null} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <Sidebar.Link isActive icon={UserIcon}>
                    Dashboard
                </Sidebar.Link>

                {SUBMENU_GROUPS.map(({
        icon,
        label,
        items
      }) => <Sidebar.Menu key={label} content={<div className="space-y-5 py-6">
                                <Sidebar.Heading icon={icon} label={label} />
                                <div>
                                    {items.map(item => <Sidebar.Link key={item} isSubMenuItem>
                                            {item}
                                        </Sidebar.Link>)}
                                </div>
                            </div>}>
                        <Sidebar.Link icon={icon}>{label}</Sidebar.Link>
                    </Sidebar.Menu>)}
            </Sidebar>

            <iframe title="Legacy page host" className="h-full flex-1 border-0" srcDoc="<body style='margin:0;background:#f6f7f9;font:14px system-ui;padding:24px'>Legacy page content</body>" />
        </div>
    </div>`,...(Oe=(Pe=B.parameters)==null?void 0:Pe.docs)==null?void 0:Oe.source}}};const cn=["Default","CustomLogo","SidebarWithNotifications","VariantIcons","VariantText","VariantIconsAndText","BandBoundaryIcons","BandBoundaryText","VariantPropAsCeiling","VariantIconsIsFixedWidth","ControlledCollapse","ControlledCollapseStartsCollapsed","CollapseRoundTrip","AutoCollapseOnResize","FirstPaintPersistence","ThirdPartyChild","TwoSidebars","AdjacentSubMenus"];export{B as AdjacentSubMenus,A as AutoCollapseOnResize,k as BandBoundaryIcons,w as BandBoundaryText,I as CollapseRoundTrip,L as ControlledCollapse,N as ControlledCollapseStartsCollapsed,b as CustomLogo,g as Default,R as FirstPaintPersistence,S as SidebarWithNotifications,M as ThirdPartyChild,T as TwoSidebars,v as VariantIcons,f as VariantIconsAndText,x as VariantIconsIsFixedWidth,C as VariantPropAsCeiling,y as VariantText,cn as __namedExportsOrder,ln as default};

import{j as e,a as t,F as Fe}from"./jsx-runtime-5e7b5774.js";import{P as F}from"./index-5a7afc56.js";import{r as c}from"./index-e6e5af86.js";import{y as n,c as _,E as _e}from"./PieOptions-aea04668.js";import{S as M,a as Oe,P as Pe,H as Ke,L as Ve}from"./StarIcon-afa07a08.js";import{A as m,a as We}from"./lodash-ab783b60.js";import{U as D}from"./UserIcon-60ec8c67.js";import"./clsx-0839fdbe.js";import"./index-1ae9f0af.js";import"./throttle-c7b7d107.js";import"./isSymbol-939a2475.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./theme-869fe131.js";const on={title:"Navigation/Sidebar",component:n,parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2725%3A91116&viewport=2302%2C256%2C0.11"}}},a=()=>t(Fe,{children:[e(n.Button,{appearance:"solid",icon:Oe,label:"Scan QR"}),e(n.Footer,{children:e(n.Menu,{content:t("div",{className:"space-y-3",children:[t("div",{className:"space-y-2",children:[e(n.Account,{name:"Twitter",description:"San Francisco, CA",icon:e(We,{className:"text-green"})}),e(n.Account,{name:"Slack",description:"San Francisco, CA"})]}),t("div",{className:"space-y-2",children:[e(n.Separator,{className:"mx-0 my-0 mt-4"}),e(n.Button,{icon:Pe,label:"Privacy Policy"}),e(n.Button,{icon:Ke,label:"Help Center"}),e(n.Separator,{className:"mx-0"}),e(n.Button,{icon:Ve,label:"Logout"})]})]}),children:e(n.Account,{name:"Xola Custom Seller"})})})]}),s=()=>{window.location.reload()},g=()=>e("div",{className:"h-screen",children:t(n,{footer:e(a,{}),onLogoClick:s,children:[e(n.Link,{isActive:!0,icon:D,children:"Sellers"}),e(n.Link,{icon:M,children:"Favorites"}),e(n.Menu,{content:t("div",{className:"space-y-5 py-6",children:[e(n.Heading,{icon:m,label:"Marketing"}),t("div",{children:[e(n.Link,{isActive:!0,isSubMenuItem:!0,children:"Abandoned Booking Recovery"}),e(n.Link,{isSubMenuItem:!0,children:"Conversion Tracking"}),e(n.Link,{isSubMenuItem:!0,children:"Coupons"}),e(n.Link,{isSubMenuItem:!0,children:"Partners"}),e(n.Link,{isSubMenuItem:!0,children:"XolaBot"}),e(n.Separator,{}),e(n.Link,{isSubMenuItem:!0,children:"Global Settings"})]})]}),children:e(n.Link,{icon:m,children:"Marketing"})})]})}),b=()=>t("div",{className:"h-screen",children:['Pass in any component for the "logo" property',t(n,{logo:e(()=>e("img",{src:"https://c02.xola.com/images/xola-logo-header.png",className:"bg-green"}),{}),footer:e(a,{}),onLogoClick:s,children:[e(n.Link,{isActive:!0,icon:D,children:"Sellers"}),e(n.Link,{icon:M,children:"Favorites"}),e(n.Link,{icon:m,children:"Marketing"})]})]}),S=()=>{const[i,r]=c.useState(!1),[d,p]=c.useState(!1),u={announcements:{count:1,content:e("div",{children:"Some content"}),title:"Announcements",onClose:()=>console.log("Announcements closed")},notices:{count:32,content:e("div",{children:"Some content"}),title:"Notifications & Pending items",onClose:()=>console.log("Notifications closed")}};return e("div",{className:"h-screen",children:t(n,{footer:e(a,{}),notifications:u,isLeftDrawerOpen:i,isRightDrawerOpen:d,handleDrawerStateChange:O=>{O==="left"?(d?(p(!1),u.notices.onClose()):i&&u.announcements.onClose(),r(!i)):O==="right"&&(i?(r(!1),u.announcements.onClose()):d&&u.notices.onClose(),p(!d))},onLogoClick:s,children:[e(n.Link,{isActive:!0,icon:D,children:"Sellers"}),e(n.Link,{icon:M,children:"Favorites"}),e(n.Menu,{content:t("div",{className:"space-y-5 py-6",children:[e(n.Heading,{icon:m,label:"Marketing"}),t("div",{children:[e(n.Link,{isActive:!0,isSubMenuItem:!0,children:"Abandoned Booking Recovery"}),e(n.Link,{isSubMenuItem:!0,children:"Conversion Tracking"}),e(n.Link,{isSubMenuItem:!0,children:"Coupons"}),e(n.Link,{isSubMenuItem:!0,children:"Partners"}),e(n.Link,{isSubMenuItem:!0,children:"XolaBot"})]})]}),children:e(n.Link,{icon:m,children:"Marketing"})})]})})},o=({title:i,children:r})=>t("div",{className:"mb-4 max-w-3xl rounded border border-gray-light bg-white p-3",children:[e("p",{className:"mb-1 text-sm font-bold text-gray-darker",children:i}),e("p",{className:"text-sm text-gray-dark",children:r})]});o.propTypes={title:F.string.isRequired,children:F.node.isRequired};const h=()=>t(Fe,{children:[e(n.Link,{isActive:!0,icon:D,children:"Sellers"}),e(n.Link,{icon:M,children:"Favorites"}),e(n.Link,{icon:m,info:e("span",{className:"ml-auto text-xs text-gray",children:"12"}),children:"Marketing"})]}),l=({width:i,...r})=>e("div",{className:"h-screen",children:e(n,{isFixed:!1,storageKey:null,minWidth:i,maxWidth:i,footer:e(a,{}),onLogoClick:s,...r,children:e(h,{})})});l.propTypes={width:F.number.isRequired};const v=()=>t("div",{children:[e(o,{title:"Baseline: icons variant at 64px",children:"Below 140px every item shows its icon only. The `12` badge on Marketing is consumer-supplied `info` content and stays visible here, unlike the default chevron it replaces."}),e(l,{width:64})]}),y=()=>t("div",{children:[e(o,{title:"Baseline: text variant at 150px",children:"Between 140px and 173px every item shows its label only, no icons. The `12` badge stays visible."}),e(l,{width:150})]}),k=()=>t("div",{children:[e(o,{title:"Baseline: icons and text variant at 200px",children:"At 174px and above every item shows icon, label and trailing node together. The `12` badge stays visible."}),e(l,{width:200})]}),f=()=>t("div",{children:[e(o,{title:"Comparison: two sidebars, one pixel apart",children:"139px on the left, 140px on the right, straddling the icons/text boundary. Each sidebar must be internally consistent: icons only on the left, labels only on the right. One sidebar showing a mix of both is the bug this change fixes."}),t("div",{className:"flex",children:[e(l,{width:139}),e(l,{width:140})]})]}),w=()=>t("div",{children:[e(o,{title:"Comparison: two sidebars, one pixel apart",children:"173px on the left, 174px on the right, straddling the text/iconsAndText boundary. The left shows labels only, the right shows icons and labels. Neither may show a mix."}),t("div",{className:"flex",children:[e(l,{width:173}),e(l,{width:174})]})]}),C=()=>t("div",{className:"h-screen",children:[e(o,{title:"Interactive: drag the sidebar's right edge outward",children:'`variant="text"` lowers the ceiling to 173px even though maxWidth allows 200. Dragging right must move the sidebar but stop at 173, never reaching 200. Dragging left still narrows it to 64.'}),e(n,{isFixed:!1,storageKey:null,variant:"text",footer:e(a,{}),onLogoClick:s,children:e(h,{})})]}),x=()=>t("div",{className:"h-screen",children:[e(o,{title:"Check: no drag range in the icons variant",children:'`variant="icons"` pins the ceiling to 64, which is also the minimum, so the sidebar is a fixed rail. Dragging the right edge does nothing in either direction, deliberately.'}),e(n,{isFixed:!1,storageKey:null,variant:"icons",footer:e(a,{}),onLogoClick:s,children:e(h,{})})]}),L=()=>{const[i,r]=c.useState(!1),[d,p]=c.useState("");return t("div",{className:"h-screen",children:[e(o,{title:"Interactive: click the button below",children:"The sidebar has no collapse button of its own, so the `isCollapsed` prop is the only way to collapse it programmatically. Expect a reported width of 64 collapsed and 200 expanded."}),t("div",{className:"mb-4 flex items-center gap-3",children:[t(_,{onClick:()=>r(!i),children:[i?"Expand":"Collapse"," sidebar"]}),t("span",{className:"text-sm text-gray-dark",children:["Reported width: ",d||"none yet"]})]}),e(n,{storageKey:null,isCollapsed:i,footer:e(a,{}),onLogoClick:s,onSidebarResize:p,children:e(h,{})})]})},N=()=>{const[i,r]=c.useState(!0),[d,p]=c.useState("");return t("div",{className:"h-screen",children:[e(o,{title:"Interactive: click the button below the sidebar",children:"Mounts already collapsed. Expanding must reach 200 and never stick at 64."}),e(n,{storageKey:null,isCollapsed:i,footer:e(a,{}),onLogoClick:s,onSidebarResize:p,children:e(h,{})}),t("div",{className:"mt-4 flex items-center gap-3",children:[t(_,{onClick:()=>r(!i),children:[i?"Expand":"Collapse"," sidebar"]}),t("span",{className:"text-sm text-gray-dark",children:["Reported width: ",d||"none yet"]})]})]})},I=()=>{const[i,r]=c.useState(!1),[d,p]=c.useState("");return t("div",{className:"h-screen",children:[e(o,{title:"Interactive: drag first, then use the button",children:"Drag the sidebar's right edge to about 150px, then collapse and expand with the button. The width must come back to 150, not jump to 200."}),t("div",{className:"mb-4 flex items-center gap-3",children:[t(_,{onClick:()=>r(!i),children:[i?"Expand":"Collapse"," sidebar"]}),t("span",{className:"text-sm text-gray-dark",children:["Reported width: ",d||"none yet"]})]}),e(n,{storageKey:null,isCollapsed:i,footer:e(a,{}),onLogoClick:s,onSidebarResize:p,children:e(h,{})})]})},A=()=>t("div",{className:"h-screen",children:[e(o,{title:"Interactive: resize the Storybook canvas",children:"Drag the preview pane across 1024px wide. Going narrower collapses the sidebar, going wider restores the width it had before."}),e(n,{storageKey:null,autoCollapseBelow:1024,footer:e(a,{}),onLogoClick:s,children:e(h,{})})]}),Ee=()=>{const[i]=c.useState(()=>window.localStorage.getItem("x2-14336-demo"));return t("p",{children:["Read during first render: ",String(i)]})},R=()=>t("div",{className:"h-screen",children:[e(o,{title:"Setup required, then reload",children:'Set localStorage["x2-14336-demo"] to "200", remove "x2-14336-demo:intent", shrink the canvas below 1024px, then reload. The line below reads the key during its own first render, the way a consumer app does, and must print 64 rather than 200.'}),e(n,{storageKey:"x2-14336-demo",autoCollapseBelow:1024,footer:e(a,{}),onLogoClick:s,children:e(h,{})}),e(Ee,{})]}),ze=()=>{const{showText:i}=_e();return e("div",{className:"p-4 text-white",children:i?"Third-party label":"3P"})},T=()=>t("div",{className:"h-screen",children:[e(o,{title:"Interactive: drag the sidebar's right edge",children:"The third-party node below the kitchen sink reads `useSidebar()` and must switch between its long and short label in step with ui-kit's own children."}),t(n,{storageKey:null,footer:e(a,{}),onLogoClick:s,children:[e(h,{}),e(ze,{})]})]}),B=()=>t("div",{children:[e(o,{title:"Comparison: two sidebars sharing one CSS variable target",children:"Both write `--ui-sidebar-width` to the same element, so each overwrites the other. Open the console: the collision warning must appear exactly once, from the second mount."}),t("div",{className:"flex",children:[e(l,{width:64,cssVariableTarget:document.body}),e(l,{width:200,cssVariableTarget:document.body})]})]});g.__docgenInfo={description:"",methods:[],displayName:"Default"};b.__docgenInfo={description:"",methods:[],displayName:"CustomLogo"};S.__docgenInfo={description:"",methods:[],displayName:"SidebarWithNotifications"};v.__docgenInfo={description:"",methods:[],displayName:"VariantIcons"};y.__docgenInfo={description:"",methods:[],displayName:"VariantText"};k.__docgenInfo={description:"",methods:[],displayName:"VariantIconsAndText"};f.__docgenInfo={description:"",methods:[],displayName:"BandBoundaryIcons"};w.__docgenInfo={description:"",methods:[],displayName:"BandBoundaryText"};C.__docgenInfo={description:"",methods:[],displayName:"VariantPropAsCeiling"};x.__docgenInfo={description:"",methods:[],displayName:"VariantIconsIsFixedWidth"};L.__docgenInfo={description:"",methods:[],displayName:"ControlledCollapse"};N.__docgenInfo={description:"",methods:[],displayName:"ControlledCollapseStartsCollapsed"};I.__docgenInfo={description:"",methods:[],displayName:"CollapseRoundTrip"};A.__docgenInfo={description:"",methods:[],displayName:"AutoCollapseOnResize"};R.__docgenInfo={description:"",methods:[],displayName:"FirstPaintPersistence"};T.__docgenInfo={description:"",methods:[],displayName:"ThirdPartyChild"};B.__docgenInfo={description:"",methods:[],displayName:"TwoSidebars"};var P,K,V;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
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
}`,...(V=(K=g.parameters)==null?void 0:K.docs)==null?void 0:V.source}}};var W,E,z;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`() => {
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
}`,...(z=(E=b.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var j,H,U;S.parameters={...S.parameters,docs:{...(j=S.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
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
}`,...(U=(H=S.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var q,X,G;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div>
        <StoryNote title="Baseline: icons variant at 64px">
            Below 140px every item shows its icon only. The \`12\` badge on Marketing is consumer-supplied \`info\` content
            and stays visible here, unlike the default chevron it replaces.
        </StoryNote>
        <AtWidth width={64} />
    </div>`,...(G=(X=v.parameters)==null?void 0:X.docs)==null?void 0:G.source}}};var Q,Y,J;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <div>
        <StoryNote title="Baseline: text variant at 150px">
            Between 140px and 173px every item shows its label only, no icons. The \`12\` badge stays visible.
        </StoryNote>
        <AtWidth width={150} />
    </div>`,...(J=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var Z,$,ee;k.parameters={...k.parameters,docs:{...(Z=k.parameters)==null?void 0:Z.docs,source:{originalSource:`() => <div>
        <StoryNote title="Baseline: icons and text variant at 200px">
            At 174px and above every item shows icon, label and trailing node together. The \`12\` badge stays visible.
        </StoryNote>
        <AtWidth width={200} />
    </div>`,...(ee=($=k.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ne,te,ie;f.parameters={...f.parameters,docs:{...(ne=f.parameters)==null?void 0:ne.docs,source:{originalSource:`() => <div>
        <StoryNote title="Comparison: two sidebars, one pixel apart">
            139px on the left, 140px on the right, straddling the icons/text boundary. Each sidebar must be internally
            consistent: icons only on the left, labels only on the right. One sidebar showing a mix of both is the bug
            this change fixes.
        </StoryNote>
        <div className="flex">
            <AtWidth width={139} />
            <AtWidth width={140} />
        </div>
    </div>`,...(ie=(te=f.parameters)==null?void 0:te.docs)==null?void 0:ie.source}}};var oe,re,ae;w.parameters={...w.parameters,docs:{...(oe=w.parameters)==null?void 0:oe.docs,source:{originalSource:`() => <div>
        <StoryNote title="Comparison: two sidebars, one pixel apart">
            173px on the left, 174px on the right, straddling the text/iconsAndText boundary. The left shows labels
            only, the right shows icons and labels. Neither may show a mix.
        </StoryNote>
        <div className="flex">
            <AtWidth width={173} />
            <AtWidth width={174} />
        </div>
    </div>`,...(ae=(re=w.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,de,le;C.parameters={...C.parameters,docs:{...(se=C.parameters)==null?void 0:se.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Interactive: drag the sidebar's right edge outward">
            \`variant="text"\` lowers the ceiling to 173px even though maxWidth allows 200. Dragging right must move the
            sidebar but stop at 173, never reaching 200. Dragging left still narrows it to 64.
        </StoryNote>
        <Sidebar isFixed={false} storageKey={null} variant="text" footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>`,...(le=(de=C.parameters)==null?void 0:de.docs)==null?void 0:le.source}}};var ce,he,pe;x.parameters={...x.parameters,docs:{...(ce=x.parameters)==null?void 0:ce.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Check: no drag range in the icons variant">
            \`variant="icons"\` pins the ceiling to 64, which is also the minimum, so the sidebar is a fixed rail.
            Dragging the right edge does nothing in either direction, deliberately.
        </StoryNote>
        <Sidebar isFixed={false} storageKey={null} variant="icons" footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>`,...(pe=(he=x.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};var me,ue,ge;L.parameters={...L.parameters,docs:{...(me=L.parameters)==null?void 0:me.docs,source:{originalSource:`() => {
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
}`,...(ge=(ue=L.parameters)==null?void 0:ue.docs)==null?void 0:ge.source}}};var be,Se,ve;N.parameters={...N.parameters,docs:{...(be=N.parameters)==null?void 0:be.docs,source:{originalSource:`() => {
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
}`,...(ve=(Se=N.parameters)==null?void 0:Se.docs)==null?void 0:ve.source}}};var ye,ke,fe;I.parameters={...I.parameters,docs:{...(ye=I.parameters)==null?void 0:ye.docs,source:{originalSource:`() => {
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
}`,...(fe=(ke=I.parameters)==null?void 0:ke.docs)==null?void 0:fe.source}}};var we,Ce,xe;A.parameters={...A.parameters,docs:{...(we=A.parameters)==null?void 0:we.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Interactive: resize the Storybook canvas">
            Drag the preview pane across 1024px wide. Going narrower collapses the sidebar, going wider restores the
            width it had before.
        </StoryNote>
        <Sidebar storageKey={null} autoCollapseBelow={1024} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>`,...(xe=(Ce=A.parameters)==null?void 0:Ce.docs)==null?void 0:xe.source}}};var Le,Ne,Ie;R.parameters={...R.parameters,docs:{...(Le=R.parameters)==null?void 0:Le.docs,source:{originalSource:`() => <div className="h-screen">
        <StoryNote title="Setup required, then reload">
            Set localStorage["x2-14336-demo"] to "200", remove "x2-14336-demo:intent", shrink the canvas below 1024px,
            then reload. The line below reads the key during its own first render, the way a consumer app does, and must
            print 64 rather than 200.
        </StoryNote>
        <Sidebar storageKey="x2-14336-demo" autoCollapseBelow={1024} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
        <FirstPaintReader />
    </div>`,...(Ie=(Ne=R.parameters)==null?void 0:Ne.docs)==null?void 0:Ie.source}}};var Ae,Re,Te;T.parameters={...T.parameters,docs:{...(Ae=T.parameters)==null?void 0:Ae.docs,source:{originalSource:`() => {
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
}`,...(Te=(Re=T.parameters)==null?void 0:Re.docs)==null?void 0:Te.source}}};var Be,Me,De;B.parameters={...B.parameters,docs:{...(Be=B.parameters)==null?void 0:Be.docs,source:{originalSource:`() => <div>
        <StoryNote title="Comparison: two sidebars sharing one CSS variable target">
            Both write \`--ui-sidebar-width\` to the same element, so each overwrites the other. Open the console: the
            collision warning must appear exactly once, from the second mount.
        </StoryNote>
        <div className="flex">
            <AtWidth width={64} cssVariableTarget={document.body} />
            <AtWidth width={200} cssVariableTarget={document.body} />
        </div>
    </div>`,...(De=(Me=B.parameters)==null?void 0:Me.docs)==null?void 0:De.source}}};const rn=["Default","CustomLogo","SidebarWithNotifications","VariantIcons","VariantText","VariantIconsAndText","BandBoundaryIcons","BandBoundaryText","VariantPropAsCeiling","VariantIconsIsFixedWidth","ControlledCollapse","ControlledCollapseStartsCollapsed","CollapseRoundTrip","AutoCollapseOnResize","FirstPaintPersistence","ThirdPartyChild","TwoSidebars"];export{A as AutoCollapseOnResize,f as BandBoundaryIcons,w as BandBoundaryText,I as CollapseRoundTrip,L as ControlledCollapse,N as ControlledCollapseStartsCollapsed,b as CustomLogo,g as Default,R as FirstPaintPersistence,S as SidebarWithNotifications,T as ThirdPartyChild,B as TwoSidebars,v as VariantIcons,k as VariantIconsAndText,x as VariantIconsIsFixedWidth,C as VariantPropAsCeiling,y as VariantText,rn as __namedExportsOrder,on as default};

import{j as e,a as i}from"./jsx-runtime-5e7b5774.js";import{r as L}from"./index-e6e5af86.js";import{y as n}from"./PieOptions-9a77d11f.js";import{S as l,P as D,H as y,L as N}from"./StarIcon-1dcb42ac.js";import{A as c,a as O}from"./lodash-ab783b60.js";import{U as u}from"./UserIcon-60ec8c67.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const z={title:"Navigation/Sidebar",component:n,parameters:{design:{name:"Figma",type:"figma",url:"https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2725%3A91116&viewport=2302%2C256%2C0.11"}}},S=()=>e(n.Footer,{children:e(n.Menu,{content:i("div",{className:"space-y-3",children:[i("div",{className:"space-y-2",children:[e(n.Account,{name:"Twitter",description:"San Francisco, CA",icon:e(O,{className:"text-green"})}),e(n.Account,{name:"Slack",description:"San Francisco, CA"})]}),i("div",{className:"space-y-2",children:[e(n.Separator,{className:"my-0 mx-0 mt-4"}),e(n.Button,{icon:D,label:"Privacy Policy"}),e(n.Button,{icon:y,label:"Help Center"}),e(n.Separator,{className:"mx-0"}),e(n.Button,{icon:N,label:"Logout"})]})]}),children:e(n.Account,{isResponsive:!0,name:"Old South Carriage Company"})})}),m=()=>{window.location.reload()},t=()=>e("div",{className:"h-screen",children:i(n,{footer:e(S,{}),onLogoClick:m,children:[e(n.Link,{isActive:!0,icon:u,children:"Sellers"}),e(n.Link,{icon:l,children:"Favorites"}),e(n.Menu,{content:i("div",{className:"space-y-5 py-6",children:[e(n.Heading,{icon:c,label:"Marketing"}),i("div",{children:[e(n.Link,{isActive:!0,isSubMenuItem:!0,children:"Abandoned Booking Recovery"}),e(n.Link,{isSubMenuItem:!0,children:"Conversion Tracking"}),e(n.Link,{isSubMenuItem:!0,children:"Coupons"}),e(n.Link,{isSubMenuItem:!0,children:"Partners"}),e(n.Link,{isSubMenuItem:!0,children:"XolaBot"}),e(n.Separator,{}),e(n.Link,{isSubMenuItem:!0,children:"Global Settings"})]})]}),children:e(n.Link,{icon:c,children:"Marketing"})})]})}),a=()=>i("div",{className:"h-screen",children:['Pass in any component for the "logo" property',i(n,{logo:e(()=>e("img",{src:"https://c02.xola.com/images/xola-logo-header.png",className:"bg-green"}),{}),footer:e(S,{}),onLogoClick:m,children:[e(n.Link,{isActive:!0,icon:u,children:"Sellers"}),e(n.Link,{icon:l,children:"Favorites"}),e(n.Link,{icon:c,children:"Marketing"})]})]}),s=()=>{const[o,b]=L.useState(!1),[d,g]=L.useState(!1),r={announcements:{count:1,content:e("div",{children:"Some content"}),title:"Announcements",onClose:()=>console.log("Announcements closed")},notices:{count:32,content:e("div",{children:"Some content"}),title:"Notifications & Pending items",onClose:()=>console.log("Notifications closed")}};return e("div",{className:"h-screen",children:i(n,{footer:e(S,{}),notifications:r,isLeftDrawerOpen:o,isRightDrawerOpen:d,handleDrawerStateChange:p=>{p==="left"?(d?(g(!1),r.notices.onClose()):o&&r.announcements.onClose(),b(!o)):p==="right"&&(o?(b(!1),r.announcements.onClose()):d&&r.notices.onClose(),g(!d))},onLogoClick:m,children:[e(n.Link,{isActive:!0,icon:u,children:"Sellers"}),e(n.Link,{icon:l,children:"Favorites"}),e(n.Menu,{content:i("div",{className:"space-y-5 py-6",children:[e(n.Heading,{icon:c,label:"Marketing"}),i("div",{children:[e(n.Link,{isActive:!0,isSubMenuItem:!0,children:"Abandoned Booking Recovery"}),e(n.Link,{isSubMenuItem:!0,children:"Conversion Tracking"}),e(n.Link,{isSubMenuItem:!0,children:"Coupons"}),e(n.Link,{isSubMenuItem:!0,children:"Partners"}),e(n.Link,{isSubMenuItem:!0,children:"XolaBot"})]})]}),children:e(n.Link,{icon:c,children:"Marketing"})})]})})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"CustomLogo"};s.__docgenInfo={description:"",methods:[],displayName:"SidebarWithNotifications"};var k,h,f;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
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
}`,...(f=(h=t.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,I,C;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
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
}`,...(C=(I=a.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};var M,w,A;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
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
}`,...(A=(w=s.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};const V=["Default","CustomLogo","SidebarWithNotifications"];export{a as CustomLogo,t as Default,s as SidebarWithNotifications,V as __namedExportsOrder,z as default};

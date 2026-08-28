import{j as e,a}from"./jsx-runtime-5e7b5774.js";import"./index-e6e5af86.js";import{P as v}from"./PieOptions-9a77d11f.js";import"./clsx-0839fdbe.js";import"./index-5a7afc56.js";import"./lodash-ab783b60.js";import"./index-1ae9f0af.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./debounce-84b605d4.js";import"./isSymbol-939a2475.js";import"./theme-869fe131.js";const _={title:"Data Display/Phone",component:v,parameters:{docs:{description:{component:"Phone number formatting according to international standards"}}},args:{number:"5402322157",countryCode:"US"},argTypes:{number:{description:"A phone number",type:{required:!0},control:{type:"text"},table:{type:{summary:null}}},countryCode:{description:"The country of the code seller to display the number in the seller country's format. This is available in `seller.countryCode`",type:{required:!1},control:{type:"text"},table:{type:{summary:null},defaultValue:{summary:"US"}}}}},o=n=>e(m,{...n}),s=()=>e("div",{className:"space-y-4",children:["5551239830 extension 9","Just email me","1234567890","540232222"].map(r=>e(m,{countryCode:"US",number:r},r))}),i=()=>e(m,{countryCode:"GB",number:"7576060661"}),t=()=>e("span",{className:"space-y-4",children:["+919538057572","9538057572","612745471","+16475368727"].map(n=>e(m,{countryCode:"US",number:n},n))}),c=()=>{const n={"AU Australia":"0421 843 881","PG Papua New Guinea":"1111906369","PF French Polynesia":"8082581546","VN Vietnam":"6503686583","MX Mexico":"+5217449939088","GB United Kingdom":"7901126172","NL Netherlands":"1616306674","IN India":"9999897512","CN China":"+861484543445","AW Aruba":"297-720-6083","DE Germany":"+41755630117","PE Peru":"(51) 534622531","ZA South Africa":"1-532-831-4516","JP Japan":"090024313","AR Argentina":"6504581","GR Greece":"+16475368727","ES Spain":"+34612745471","RO Romania":"0741.682.177","HK Hong Kong":"+852 8947 6726","NZ New Zealand":"64 27 562 3282 ","PA Panama":"+507 5559-1245","PL Poland":"48 522-123-133","BM Bermuda":"441-286-2575","CR Costa Rica":"2643 - 7103","DO Dominican Republic":"809-240-7250","HN Honduras":"+5045423411","ET Ethiopia":"4132847160","FR France":"+33628070787","IT Italy":"+390416218328","PT Portugal":"00.352.10.246.73.57","IE Ireland":"+353 22 664 2203","VI U.S. Virgin Islands":"(340) 757-3898","AE United Arab Emirates":"+971 81-8459281","CZ Czechia":"+420483670542","EE Estonia":"+994411385422","TZ Tanzania":"+4913786234246","DK Denmark":"+4524555026","BZ Belize":"+5012522475","KH Cambodia":"+85572261424"};return a("div",{className:"",children:[e("p",{className:"mb-4",children:"These are obfuscated numbers of various non-US/CA sellers. This is how their numbers will look in their own regions"}),e("div",{className:"grid grid-cols-3 gap-6",children:Object.keys(n).map(r=>e(m,{countryCode:r,number:n[r]},n[r]))})]})},m=({countryCode:n,number:r})=>a("div",{className:"space-y-2",children:[a("div",{children:[e("span",{className:"mr-2 inline-block w-20 text-right",children:"Country:"}),e("span",{className:"font-mono",children:n})]}),a("div",{children:[e("span",{className:"mr-2 inline-block w-20 text-right",children:"Original:"}),e("span",{className:"font-mono",children:r})]}),a("div",{children:[e("span",{className:"mr-2 inline-block w-20 text-right",children:"Formatted:"}),e(v,{className:"font-mono",countryCode:n.slice(0,2),children:r})]})]});o.__docgenInfo={description:"",methods:[],displayName:"Default"};s.__docgenInfo={description:"",methods:[],displayName:"InvalidNumbers"};i.__docgenInfo={description:"",methods:[],displayName:"WithCountryCode"};t.__docgenInfo={description:"",methods:[],displayName:"USCountryAndIntlNumber"};c.__docgenInfo={description:"",methods:[],displayName:"SellerPhoneNumbers"};var l,d,u;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`props => {
  return <PhoneDisplay {...props} />;
}`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var p,h,y;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const invalidNumbers = ["5551239830 extension 9", "Just email me", "1234567890", "540232222"];
  return <div className="space-y-4">
            {invalidNumbers.map(number => {
      return <PhoneDisplay key={number} countryCode="US" number={number} />;
    })}
        </div>;
}`,...(y=(h=s.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var N,b,P;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  return <PhoneDisplay countryCode="GB" number="7576060661" />;
}`,...(P=(b=i.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var g,C,A;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  return <span className="space-y-4">
            {["+919538057572", "9538057572", "612745471", "+16475368727"].map(number => {
      return <PhoneDisplay key={number} countryCode="US" number={number} />;
    })}
        </span>;
}`,...(A=(C=t.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var S,I,f;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const list = {
    "AU Australia": "0421 843 881",
    "PG Papua New Guinea": "1111906369",
    "PF French Polynesia": "8082581546",
    "VN Vietnam": "6503686583",
    "MX Mexico": "+5217449939088",
    "GB United Kingdom": "7901126172",
    "NL Netherlands": "1616306674",
    "IN India": "9999897512",
    "CN China": "+861484543445",
    "AW Aruba": "297-720-6083",
    "DE Germany": "+41755630117",
    "PE Peru": "(51) 534622531",
    "ZA South Africa": "1-532-831-4516",
    "JP Japan": "090024313",
    "AR Argentina": "6504581",
    "GR Greece": "+16475368727",
    "ES Spain": "+34612745471",
    "RO Romania": "0741.682.177",
    "HK Hong Kong": "+852 8947 6726",
    "NZ New Zealand": "64 27 562 3282 ",
    "PA Panama": "+507 5559-1245",
    "PL Poland": "48 522-123-133",
    "BM Bermuda": "441-286-2575",
    "CR Costa Rica": "2643 - 7103",
    "DO Dominican Republic": "809-240-7250",
    "HN Honduras": "+5045423411",
    "ET Ethiopia": "4132847160",
    "FR France": "+33628070787",
    "IT Italy": "+390416218328",
    "PT Portugal": "00.352.10.246.73.57",
    "IE Ireland": "+353 22 664 2203",
    "VI U.S. Virgin Islands": "(340) 757-3898",
    "AE United Arab Emirates": "+971 81-8459281",
    "CZ Czechia": "+420483670542",
    "EE Estonia": "+994411385422",
    "TZ Tanzania": "+4913786234246",
    "DK Denmark": "+4524555026",
    "BZ Belize": "+5012522475",
    "KH Cambodia": "+85572261424"
  };
  return <div className="">
            <p className="mb-4">
                These are obfuscated numbers of various non-US/CA sellers. This is how their numbers will look in their
                own regions
            </p>

            <div className="grid grid-cols-3 gap-6">
                {Object.keys(list).map(countryCode => {
        return <PhoneDisplay key={list[countryCode]} countryCode={countryCode} number={list[countryCode]} />;
      })}
            </div>
        </div>;
}`,...(f=(I=c.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};const H=["Default","InvalidNumbers","WithCountryCode","USCountryAndIntlNumber","SellerPhoneNumbers"];export{o as Default,s as InvalidNumbers,c as SellerPhoneNumbers,t as USCountryAndIntlNumber,i as WithCountryCode,H as __namedExportsOrder,_ as default};

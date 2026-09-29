// EDIT HINT: SERVER ONLY. Credentials belong in .env, never in dist/.
export function validateContact(value){
  if(!value||typeof value!=='object'||Array.isArray(value)||value.website||value.consent!==true)return null;
  const result={};
  for(const [key,max,required] of [['firstName',80,true],['lastName',80,false],['email',200,true],['message',1000,true]]){
    if(typeof value[key]!=='string'||(key!=='message'&&/[\r\n]/.test(value[key])))return null;
    const text=value[key].trim();
    if(text.length>max||(required&&!text)||/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(text)||(key!=='message'&&/[\r\n]/.test(text)))return null;
    result[key]=text;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)?result:null;
}
export async function sendWhatsApp(input,env=process.env,fetcher=fetch){
  const sid=env.TWILIO_ACCOUNT_SID,token=env.TWILIO_AUTH_TOKEN,from=env.TWILIO_WHATSAPP_FROM,to=env.WHATSAPP_RECIPIENT;
  const phone=/^whatsapp:\+[1-9]\d{7,14}$/;
  if(!/^AC[a-fA-F0-9]{32}$/.test(sid||'')||!token||!phone.test(from||'')||!phone.test(to||''))return {status:503,body:{error:'WhatsApp contact is not available yet. Please use the email link below.'}};
  const fields=new URLSearchParams({From:from,To:to});
  const name=[input.firstName,input.lastName].filter(Boolean).join(' ');
  // Sandbox free-form messages require an active 24-hour window. Production needs an approved template.
  if(env.TWILIO_CONTENT_SID){
    if(!/^HX[a-fA-F0-9]{32}$/.test(env.TWILIO_CONTENT_SID))return {status:503,body:{error:'WhatsApp is temporarily unavailable. Please email instead.'}};
    fields.set('ContentSid',env.TWILIO_CONTENT_SID);
    fields.set('ContentVariables',JSON.stringify({'1':name,'2':input.email,'3':input.message.replace(/\s+/g,' ')}));
  }else fields.set('Body',`New portfolio enquiry\n\nName: ${name}\nEmail: ${input.email}\n\n${input.message}`);
  try{
    const response=await fetcher(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,{method:'POST',headers:{Authorization:'Basic '+Buffer.from(sid+':'+token).toString('base64'),'Content-Type':'application/x-www-form-urlencoded'},body:fields,signal:AbortSignal.timeout(12000)});
    const result=await response.json();
    if(!response.ok||!/^SM[a-fA-F0-9]{32}$/.test(result.sid||'')||['failed','undelivered','canceled'].includes(result.status))return {status:502,body:{error:'WhatsApp could not accept the message. Please use email instead.'}};
    return {status:202,body:{message:'Your message was accepted for WhatsApp delivery. Thank you for getting in touch.'}};
  }catch{return {status:502,body:{error:'Delivery was not confirmed. Please email instead of resubmitting.'}};}
}

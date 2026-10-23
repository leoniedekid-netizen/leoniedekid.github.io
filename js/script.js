// Lightweight cart counter for product cards. Orders are sent through the contact form.
let cartCount = 0;
const cartCountEls = document.querySelectorAll('.cart-count');
function updateCartCount(){cartCountEls.forEach(el=>el.textContent=cartCount)}
document.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>{cartCount++;updateCartCount();const name=button.dataset.add;button.textContent='✓';button.setAttribute('aria-label',name+' added');setTimeout(()=>{button.textContent='+';button.setAttribute('aria-label','Add '+name+' to order')},900)}));
const newsletterForm=document.getElementById('newsletterForm');
if(newsletterForm){newsletterForm.addEventListener('submit',event=>{event.preventDefault();document.getElementById('newsletterMessage').textContent='Thanks for your interest! Newsletter signup needs a connected email service to save subscriptions.';newsletterForm.reset()})}
const contactForm=document.getElementById('contactForm');
if(contactForm){contactForm.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(contactForm);const subject=encodeURIComponent('Leo Candle Co. — '+data.get('reason'));const body=encodeURIComponent('Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\nReason: '+data.get('reason')+'\nCandle / quantity: '+(data.get('product')||'Not specified')+'\n\nMessage:\n'+data.get('message'));document.getElementById('contactMessage').textContent='Opening your email application with your message...';window.location.href='mailto:hello@leocandleco.com?subject='+subject+'&body='+body})}

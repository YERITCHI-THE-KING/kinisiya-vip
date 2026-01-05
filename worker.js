addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "POST") {
    const body = await request.json()
    const code = body.code

    // الأكواد الثابتة
    const codes = {
      "KINISIYA-ADMIN-999": { type: "admin", servers: ["vless://ADMIN-SERVER-1"] },
      "KINISIYA-FREE-123": { type: "free", expire: Date.now() + 7*24*60*60*1000, servers: ["vless://FREE-SERVER-1"] },
      "KINISIYA-PAID-WEEK": { type: "paid", expire: Date.now() + 7*24*60*60*1000, servers: ["vless://PAID-WEEK-SERVER"] },
      "KINISIYA-PAID-MONTH": { type: "paid", expire: Date.now() + 30*24*60*60*1000, servers: ["vless://PAID-MONTH-SERVER"] },
      "KINISIYA-PAID-YEAR": { type: "paid", expire: Date.now() + 365*24*60*60*1000, servers: ["vless://PAID-YEAR-SERVER"] },
      "KINISIYA-PAID-LIFE": { type: "paid", expire: Date.now() + 9999*24*60*60*1000, servers: ["vless://PAID-LIFE-SERVER"] }
    }

    if (codes[code]) {
      return new Response(JSON.stringify({ success: true, ...codes[code] }), { headers: { 'Content-Type': 'application/json' } })
    } else {
      return new Response(JSON.stringify({ success: false, message: "كود غير صحيح" }), { headers: { 'Content-Type': 'application/json' } })
    }
  }

  return new Response(JSON.stringify({ success: false, message: "يرجى استخدام POST" }), { headers: { 'Content-Type': 'application/json' } })
}

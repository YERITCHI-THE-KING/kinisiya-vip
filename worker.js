const ADMIN_CODE = "KINISIYA-ADMIN-999";
const FREE_CODE = "KINISIYA-FREE-123";

// مثال أكواد مدفوعة تلقائي (تقدر تولد أكواد جديدة)
const PAID_CODES = {
  "KINISIYA-PAID-WEEK": ["vless://PAID-WEEK-SERVER"],
  "KINISIYA-PAID-MONTH": ["vless://PAID-MONTH-SERVER"],
  "KINISIYA-PAID-YEAR": ["vless://PAID-YEAR-SERVER"],
  "KINISIYA-PAID-LIFE": ["vless://PAID-LIFE-SERVER"]
};

export default {
  async fetch(req) {
    if (new URL(req.url).pathname === "/login" && req.method === "POST") {
      const { code } = await req.json();

      if (code === ADMIN_CODE) {
        return Response.json({
          success: true,
          type: "admin",
          servers: ["vless://ADMIN-SERVER-1","vless://ADMIN-SERVER-2"]
        });
      }

      if (code === FREE_CODE) {
        const expire = Date.now() + 7*24*60*60*1000; // أسبوع
        return Response.json({
          success: true,
          type: "free",
          expire,
          servers: ["vless://FREE-SERVER-1"]
        });
      }

      for (let paidCode in PAID_CODES) {
        if (code === paidCode) {
          return Response.json({
            success: true,
            type: "paid",
            servers: PAID_CODES[paidCode]
          });
        }
      }

      return Response.json({ success: false });
    }

    return new Response("Kinisiya API");
  }
              }

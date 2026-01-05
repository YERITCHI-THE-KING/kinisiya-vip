// أكواد جاهزة
const codes = {
  "KINISIYA-ADMIN-999": { type: "admin", servers: ["vless://ADMIN-SERVER-1"] },
  "KINISIYA-FREE-123": { type: "free", expire: Date.now() + 7*24*60*60*1000, servers: ["vless://FREE-SERVER-1"] },
  "KINISIYA-PAID-WEEK": { type: "paid", expire: Date.now() + 7*24*60*60*1000, servers: ["vless://PAID-WEEK-SERVER"] },
  "KINISIYA-PAID-MONTH": { type: "paid", expire: Date.now() + 30*24*60*60*1000, servers: ["vless://PAID-MONTH-SERVER"] },
  "KINISIYA-PAID-YEAR": { type: "paid", expire: Date.now() + 365*24*60*60*1000, servers: ["vless://PAID-YEAR-SERVER"] },
  "KINISIYA-PAID-LIFE": { type: "paid", expire: Date.now() + 9999*24*60*60*1000, servers: ["vless://PAID-LIFE-SERVER"] }
};

function login() {
  const code = document.getElementById("code").value;
  const msg = document.getElementById("msg");

  if (codes[code]) {
    localStorage.setItem("user", JSON.stringify(codes[code]));
    window.location.href = "dashboard.html";
  } else {
    msg.innerText = "❌ كود غير صحيح";
  }
}

function loadDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) location.href = "index.html";

  const div = document.getElementById("servers");

  if (user.type === "admin") {
    div.innerHTML = `<h2>👑 سيرفرك الخاص</h2><pre>${user.servers.join("\n")}</pre>`;
  } else if (user.type === "free") {
    div.innerHTML = `<h2>🆓 سيرفر مجاني</h2><pre>${user.servers.join("\n")}</pre>
                     <p>⏱️ تنتهي في: ${new Date(user.expire).toLocaleString()}</p>`;
  } else if (user.type === "paid") {
    div.innerHTML = `<h2>💎 سيرفر مدفوع</h2><pre>${user.servers.join("\n")}</pre>
                     <p>🎟️ ينتهي في: ${new Date(user.expire).toLocaleString()}</p>`;
  }
}

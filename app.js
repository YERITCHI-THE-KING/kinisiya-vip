const API_URL = "https://kinisiya-api.workers.dev";

async function login() {
  const code = document.getElementById("code").value;
  const msg = document.getElementById("msg");

  const res = await fetch(API_URL + "/login", {
    method: "POST",
    body: JSON.stringify({ code })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("user", JSON.stringify(data));
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
    div.innerHTML = `
      <h2>👑 سيرفرك الخاص</h2>
      <pre>${user.servers.join("\n")}</pre>
    `;
  }

  if (user.type === "free") {
    div.innerHTML = `
      <h2>🆓 سيرفرات مجانية (7 أيام)</h2>
      <pre>${user.servers.join("\n")}</pre>
      <p>⏱️ تنتهي في: ${new Date(user.expire).toLocaleString()}</p>
    `;
  }

  if (user.type === "paid") {
    div.innerHTML = `
      <h2>💎 سيرفر مدفوع</h2>
      <pre>${user.servers.join("\n")}</pre>
      <p>🎟️ تم التفعيل بعد الدفع</p>
    `;
  }

  if (user.type === "expired") {
    div.innerHTML = `
      <h2>❌ انتهت الفترة التجريبية</h2>
      <p>للتفعيل المدفوع تواصل معنا:</p>
      <a href="https://t.me/yekay6">@yekay6</a>
    `;
  }
}

const botToken = "7701585433:AAFKP5UDdVsxRL2zrbmlaIK2jzd30rPW-F0";
const chatId = "8141222239";
const baseChars = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateUsernames(length = 5, count = 50) {
  let usernames = [];
  for (let i = 0; i < count; i++) {
    let user = "";
    for (let j = 0; j < length; j++) {
      user += baseChars[Math.floor(Math.random() * baseChars.length)];
    }
    usernames.push(user);
  }
  return usernames;
}

async function checkUsername(username) {
  try {
    const res = await fetch(`https://t.me/${username}`);
    if (res.status === 404) {
      document.getElementById("results").innerHTML += `<div class='username'>✅ متاح: @${username}</div>`;
      sendToBot(username);
    } else {
      document.getElementById("results").innerHTML += `<div class='username'>❌ غير متاح: @${username}</div>`;
    }
  } catch (e) {
    console.error(e);
  }
}

async function sendToBot(username) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `🎯 يوزر متاح:\n@${username}`
    })
  });
}

async function startCheck() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("status").innerText = "🔍 جاري التخمين...";
  document.getElementById("clickSound").play();

  const usernames = generateUsernames(5, 50); // توليد 50 يوزر من 5 حروف
  for (let username of usernames) {
    await checkUsername(username);
    await new Promise(r => setTimeout(r, 300)); // سرعة الفحص
  }

  document.getElementById("status").innerText = "✅ تم الانتهاء من التخمين.";
}
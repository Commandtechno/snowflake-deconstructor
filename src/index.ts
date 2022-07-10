const input = document.getElementById("input") as HTMLInputElement;
const result = document.getElementById("result") as HTMLSpanElement;

function update() {
  if (!input.value) {
    history.replaceState(null, "", "/snowflake");
    result.innerText = "";
    return;
  }

  let snowflake: bigint | undefined;
  try {
    snowflake = BigInt(input.value);
  } catch {}
  if (!snowflake || snowflake < 4194304n || snowflake > 9223372036854775807n) {
    history.replaceState(null, "", "/snowflake");
    result.style.color = "#ED4245";
    result.innerText = "Invalid Snowflake";
    return;
  }

  result.style.color = "#57F287";
  result.innerText = new Date(Number(snowflake / 4194304n + 1420070400000n)).toLocaleString();

  history.replaceState(null, "", `/snowflake/${snowflake}`);
}

input.addEventListener("input", update);
input.addEventListener("paste", () => input.focus());

const q = location.pathname.split("/").pop();
if (q) {
  input.value = q;
  input.focus();
  update();
}
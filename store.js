let betting = {
  name: "pick",
  amount: 10,
  whichSide: 0,
  choices: ["first","second","third"]
}

chrome.runtime.onInstaled.addListener(() => {
  chrome.storage.sync.set(betting);
  console.log("stored")
})
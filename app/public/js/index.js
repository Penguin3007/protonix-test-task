const addToFavorite = (event) => {
  let symbolId;

  if (event.target.tagName === "TD") {
    symbolId = event.target.closest("tr").id;
  }
  if (event.target.tagName === "TR") {
    symbolId = event.target.id;
  }

  fetch("/symbol/add-to-favorite", {
    method: "POST",
    body: JSON.stringify({
      symbolId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(async (res) => {
    const response = await res.json();
    alert(response.message);
    location.reload();
  }).catch((err) => {
    console.log(err);
  });
};

document.getElementById("symbols-table").addEventListener("click", addToFavorite);

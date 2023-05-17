const toggleCheckNames = {
	"Show only Videos": "/shorts/",
	"Show only Shorts": "/watch",
	"Show All": null,
};

setInterval(() => {
	const element = document.getElementById("yt-shorts-toggle");
	console.log('extension')
	if (window.location.href.includes("https://www.youtube.com/feed/subscriptions")) {
		if (element) {
			element.style.display = "block";
			toggleViews(element.value);
			console.log('here')
		} else {
			createToggleButton();
			toggleViews("Show only Videos");
			console.log('there')
		}
	} else {
		if(element) element.remove()
	}
}, 200);

function onContentLoad() {
	const content = document.getElementById("contents");
	content.addEventListener("load", function () {
		const toggleElement = document.getElementById("yt-shorts-toggle");
		toggleViews(toggleElement.value);
	});
}

function createToggleButton() {
	const select = document.createElement("select");
	select.name = "yt-shorts-toggle";
	select.id = "yt-shorts-toggle";

	Object.keys(toggleCheckNames).forEach((title) => {
		const option = document.createElement("option");
		option.value = title;
		option.innerHTML = title;
		select.appendChild(option);
	});
	toggleEventListener(select);

	const ytElement = document.getElementById("center");
	if(ytElement) ytElement.appendChild(select);
}
function toggleEventListener(element) {
	element.addEventListener("change", function () {
		toggleViews(element.value);
	});
}

function toggleViews(condition) {
	const videoTiles = document.getElementsByClassName(
		"style-scope ytd-grid-renderer"
	);
	for (let tile of videoTiles) {
		tile.style.display = "flex";
	}

	if (!toggleCheckNames[condition]) return;

	for (let tile of videoTiles) {
		if (
			tile?.children?.[0]?.children?.[1]?.children?.[1]?.children?.[0]?.children[0]?.children?.[1]?.href?.includes(
				toggleCheckNames[condition]
			)
		) {
			tile.style.display = "none";
		}
	}
}
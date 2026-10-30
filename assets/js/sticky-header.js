(function () {
	const header = document.querySelector(".site-header");
	if (!header) {
		return;
	}

	const sentinel = document.createElement("div");
	sentinel.className = "site-header-sentinel";
	sentinel.setAttribute("aria-hidden", "true");
	header.parentNode.insertBefore(sentinel, header.nextSibling);

	function stick() {
		if (document.body.classList.contains("has-compact-header")) {
			return;
		}

		document.body.classList.add("has-compact-header");

		if (typeof window.aandracCloseToggles === "function") {
			window.aandracCloseToggles();
		}
	}

	function unstick() {
		document.body.classList.remove("has-compact-header");
	}

	function sync() {
		if (window.scrollY > 1) {
			stick();
		} else {
			unstick();
		}
	}

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			function (entries) {
				const entry = entries[0];
				if (entry.boundingClientRect.top < 0) {
					stick();
				} else {
					unstick();
				}
			},
			{
				threshold: 0,
			}
		);

		observer.observe(sentinel);
		return;
	}

	window.addEventListener("scroll", sync, { passive: true });
	sync();
})();

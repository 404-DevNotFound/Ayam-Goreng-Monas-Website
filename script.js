// Simple menu slider for the `.menu-container` / `.menu-card` structure in index.html
// Features: auto-play, prev/next buttons, pause on hover, keyboard arrows
document.addEventListener('DOMContentLoaded', function () {
	const container = document.querySelector('.menu-container');
	if (!container) return; // nothing to do if menu container not found

	const cards = Array.from(container.querySelectorAll('.menu-card'));
	if (cards.length <= 1) return; // no need to enable slider for one or zero items

	// Ensure parent can position the buttons absolutely
	const parent = container.parentElement;
	if (parent && getComputedStyle(parent).position === 'static') {
		parent.style.position = 'relative';
	}

	// Create control buttons
	function createBtn(className, label) {
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = className;
		btn.innerText = label;
		Object.assign(btn.style, {
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			zIndex: '12',
			background: 'rgba(0,0,0,0.45)',
			color: '#fff',
			border: 'none',
			padding: '8px 10px',
			cursor: 'pointer',
			borderRadius: '4px',
			fontSize: '16px',
		});
		return btn;
	}

	const prevBtn = createBtn('menu-prev', '\u2039'); // ‹
	const nextBtn = createBtn('menu-next', '\u203A'); // ›
	prevBtn.style.left = '8px';
	nextBtn.style.right = '8px';
	parent.appendChild(prevBtn);
	parent.appendChild(nextBtn);

	// Ensure container scrolls horizontally and cards line up
	container.style.overflowX = 'auto';
	container.style.scrollBehavior = 'smooth';
	container.style.whiteSpace = 'nowrap';
	container.style.paddingBottom = '8px';

	cards.forEach(function (card) {
		// make each card render inline so horizontal scrolling works
		card.style.display = 'inline-block';
		card.style.verticalAlign = 'top';
		// optionally clamp width to make each card similar in size (if you want)
		// card.style.width = card.style.width || '240px';
		card.style.marginRight = card.style.marginRight || '12px';
	});

	// Get width of one card including margin
	function getCardWidth() {
		const c = cards[0];
		const rect = c.getBoundingClientRect();
		const style = getComputedStyle(c);
		const mr = parseFloat(style.marginRight) || 0;
		return rect.width + mr;
	}

	// Slider controls
	function scrollNext() {
		const step = getCardWidth();
		if (Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 1) {
			container.scrollTo({ left: 0, behavior: 'smooth' });
		} else {
			container.scrollBy({ left: step, behavior: 'smooth' });
		}
	}
	function scrollPrev() {
		const step = getCardWidth();
		if (container.scrollLeft <= 0) {
			container.scrollTo({ left: container.scrollWidth - container.clientWidth, behavior: 'smooth' });
		} else {
			container.scrollBy({ left: -step, behavior: 'smooth' });
		}
	}

	prevBtn.addEventListener('click', function () {
		scrollPrev();
		resetAutoPlay();
	});
	nextBtn.addEventListener('click', function () {
		scrollNext();
		resetAutoPlay();
	});

	// keyboard support
	document.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowRight') { scrollNext(); resetAutoPlay(); }
		if (e.key === 'ArrowLeft') { scrollPrev(); resetAutoPlay(); }
	});

	// Auto-play with pause on hover/focus
	var autoPlayInterval = 3000; // ms
	var autoPlayTimer = null;
	var isPaused = false;

	function startAutoPlay() {
		if (autoPlayTimer) return;
		autoPlayTimer = setInterval(function () {
			if (!isPaused) scrollNext();
		}, autoPlayInterval);
	}
	function stopAutoPlay() {
		if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; }
	}
	function resetAutoPlay() {
		stopAutoPlay();
		startAutoPlay();
	}

	[container, prevBtn, nextBtn].forEach(function (el) {
		el.addEventListener('mouseenter', function () { isPaused = true; stopAutoPlay(); });
		el.addEventListener('mouseleave', function () { isPaused = false; startAutoPlay(); });
		el.addEventListener('focusin', function () { isPaused = true; stopAutoPlay(); });
		el.addEventListener('focusout', function () { isPaused = false; startAutoPlay(); });
	});

	startAutoPlay();
});

	// --- clickable enhancements: click card to focus + dot indicators ---
	document.addEventListener('DOMContentLoaded', function () {
		const container = document.querySelector('.menu-container');
		if (!container) return;
		const cards = Array.from(container.querySelectorAll('.menu-card'));
		if (cards.length <= 1) return;

		// create dots wrapper
		const parent = container.parentElement;
		let dotsWrap = parent.querySelector('.menu-dots');
		if (!dotsWrap) {
			dotsWrap = document.createElement('div');
			dotsWrap.className = 'menu-dots';
			Object.assign(dotsWrap.style, {
				textAlign: 'center',
				marginTop: '10px',
				position: 'relative',
				zIndex: '10'
			});
			parent.appendChild(dotsWrap);
		}

		// const dots = [];
		// cards.forEach(function (_, i) {
		// 	const d = document.createElement('button');
		// 	d.type = 'button';
		// 	d.className = 'menu-dot';
		// 	d.setAttribute('data-index', String(i));
		// 	Object.assign(d.style, {
		// 		display: 'inline-block',
		// 		width: '10px',
		// 		height: '10px',
		// 		margin: '0 6px',
		// 		borderRadius: '50%',
		// 		border: 'none',
		// 		background: 'rgba(0,0,0,0.25)',
		// 		cursor: 'pointer',
		// 		padding: '0'
		// 	});
		// 	dotsWrap.appendChild(d);
		// 	dots.push(d);
		// 	d.addEventListener('click', function () {
		// 		const idx = parseInt(this.getAttribute('data-index'));
		// 		const card = cards[idx];
		// 		if (card) {
		// 			container.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
		// 		}
		// 	});
		// });

		function updateActive() {
			const center = container.scrollLeft + container.clientWidth / 2;
			let closest = 0;
			let minDiff = Infinity;
			cards.forEach(function (c, i) {
				const rect = c.getBoundingClientRect();
				const cLeft = c.offsetLeft;
				const cCenter = cLeft + rect.width / 2;
				const diff = Math.abs(cCenter - center);
				if (diff < minDiff) { minDiff = diff; closest = i; }
			});

			// set active class on cards and dots
			cards.forEach(function (c, i) {
				if (i === closest) c.classList.add('active-slide'); else c.classList.remove('active-slide');
			});
			dots.forEach(function (d, i) {
				d.style.background = (i === closest) ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.25)';
			});
		}

		// update on scroll and on load
		container.addEventListener('scroll', function () { updateActive(); });
		window.addEventListener('resize', function () { updateActive(); });
		updateActive();

		// clicking a card scrolls it into view
		cards.forEach(function (c, i) {
			c.style.cursor = 'pointer';
			c.addEventListener('click', function () {
				container.scrollTo({ left: c.offsetLeft, behavior: 'smooth' });
			});
		});
	});

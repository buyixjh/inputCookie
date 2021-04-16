function getCookie(cname) {
	let name = cname + '=', decodedCookie = decodeURIComponent(document.cookie), ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return null;
}

function setCookie(cname, cvalue, exdays) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = 'expires=' + d.toGMTString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

//input存入cookie
$('input[type="text"],input[type="number"],input[type="date"]').bind('input propertychange', function () {
	let id = $(this).attr('id');
	let val = $('#' + id).val();
	setCookie(id, val, 365);
});
$('select').change(function () {
	let id = $(this).attr('id');
	let val = $(this).children('option:selected').text();
	setCookie(id, val, 365);
});
$('input[type="checkbox"]').change(function () {
	let id = $(this).attr('id');
	let val = $(this)[0].checked;
	setCookie(id, val, 365);
});
$('input[type="radio"]').click(function () {
	let id = $(this).attr('name');
	let val = $(this).val();
	setCookie(id, val, 365);
});

//input读取cookie
function getInputCookie() {
	$('input[type="text"],input[type="number"],input[type="date"]').each(function (i) {
		let id = $(this).attr('id');
		let val = getCookie(id);
		if (null != val && '' != val) $('#' + id).val(val);

	});
	$('select').each(function (i) {
		let id = $(this).attr('id');
		let val = getCookie(id);
		if (null != val && '' != val) {
			let find = $(this).children('option:contains(' + val + ')').attr('selected', true);
		}
	});
	$('input[type="checkbox"]').each(function (i) {
		let id = $(this).attr('id');
		let val = getCookie(id);
		if (null != val && '' != val) {
			if (val == 'true') $(this).click();
			// let find = $(this)[0].checked = val;
		}
	});
	$('input[type="radio"]').each(function (i) {
		let id = $(this).attr('name');
		let val = getCookie(id);
		if (null != val && '' != val) {
			if ($(this).val() == val) {
				$(this).click();
				// let find = $(this)[0].checked = val;
			}
		}
	});
}
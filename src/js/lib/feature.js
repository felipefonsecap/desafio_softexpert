export function isEnabled(name) {
	console.log(name);
	console.log(window.location.hash.split('#'));
	console.log(window.location.hash.split('#').includes(name));
    return window.location.hash.split('#').includes(name);
}
